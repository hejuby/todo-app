import Todo, { TodoDocument } from "#models/Todo";
import connectDB from "./connect";

interface TodoFilter {
    page?: number;
    limit?: number;
}

export async function getTodoList(filter: TodoFilter = {}) {
    try {
        await connectDB();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const todos = await Todo.find<TodoDocument>().skip(skip).limit(limit);
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
    title: string,
    description = "",
    priority = 0
) {
    try {
        await connectDB();

        const todo = await Todo.create({ title, description, priority });

        return {
            todo,
        };
    } catch (error) {
        return { error };
    }
}

export async function getTodo(id: string) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Todo not found" };
        }

        const todo = await Todo.findById(id).lean().exec();
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

export async function updateTodo(
    id: string,
    { title, completed }: { title?: string; completed?: boolean }
) {
    try {
        await connectDB();

        if (!id) {
            return { error: "Todo not found" };
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { new: true }
        )
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
