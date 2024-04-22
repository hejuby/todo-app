import Todo, { TodoDocument } from "#models/Todo";
import connectDB from "./connect";

interface TodoFilter {
    page?: number;
    limit?: number;
}

export async function getTodoList({ page = 1, limit = 100 }: TodoFilter = {}) {
    try {
        await connectDB();

        const skip = (page - 1) * limit;

        const todos = await Todo.find<TodoDocument>({}).skip(skip).limit(limit);
        const results = todos.length;

        return {
            todos,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createTodo(
    data: Omit<TodoDocument, "createdAt" | "updatedAt" | "_id"> & {
        _id?: string;
    }
) {
    try {
        console.log(data);
        await connectDB();

        const todo = await Todo.create(data);

        return { todo };
    } catch (error) {
        console.error(error);
        return { error: JSON.stringify(error) };
    }
}

export async function getTodo(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Todo not found" };
        }

        const todo = await Todo.findById<TodoDocument>(id);
        if (todo) {
            return {
                todo,
            };
        } else {
            return { error: "Todo not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateTodo({
    _id: id,
    ...data
}: Omit<TodoDocument, "createdAt" | "updatedAt" | "_id"> & {
    _id?: string;
}) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Todo not found" };
        }

        const todo = await Todo.findByIdAndUpdate(id, data, { new: true })
            .lean()
            .exec();

        if (todo) {
            return {
                todo,
            };
        } else {
            return { error: "Todo not found" };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteTodo(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Todo not found" };
        }

        const todo = await Todo.findByIdAndDelete(id).exec();

        if (todo) {
            return {};
        } else {
            return { error: "Todo not found" };
        }
    } catch (error) {
        return { error };
    }
}
