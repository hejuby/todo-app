import Todo, { TodoDocument } from "#models/Todo";
import to from "#utils/awaitTo";
import connectDB from "./connect";

interface TodoFilter {
    page?: number;
    limit?: number;
}

export async function getTodoList({ page = 1, limit = 100 }: TodoFilter = {}) {
    const [dbConnectionError] = await to(connectDB());

    if (dbConnectionError) {
        return { error: dbConnectionError };
    }

    const skip = (page - 1) * limit;
    const [error, todos] = await to(
        Todo.find<TodoDocument>({}).skip(skip).limit(limit)
    );

    if (error) {
        console.error(error);
        return { error };
    }

    return {
        todos,
        page,
        limit,
        results: todos.length,
    };
}

export async function createTodo(
    data: Omit<TodoDocument, "createdAt" | "updatedAt" | "_id"> & {
        _id?: string;
    }
) {
    const [dbConnectionError] = await to(connectDB());

    if (dbConnectionError) {
        return { error: dbConnectionError };
    }

    const [error, todo] = await to(Todo.create(data));

    if (error) {
        console.error(error);
        return { error };
    }

    return { todo };
}

export async function getTodo(id: string) {
    const [dbConnectionError] = await to(connectDB());

    if (dbConnectionError) {
        return { error: dbConnectionError };
    }

    const [error, todo] = await to(Todo.findById<TodoDocument>(id));

    if (error) {
        console.error(error);
        return { error };
    }

    if (todo) {
        return { todo };
    }

    return { error: "Todo not found" };
}

export async function updateTodo({
    _id: id,
    ...data
}: Partial<
    Omit<TodoDocument, "createdAt" | "updatedAt" | "_id"> & {
        _id?: string;
    }
>) {
    const [dbConnectionError] = await to(connectDB());

    if (dbConnectionError) {
        return { error: dbConnectionError };
    }

    if (!id) {
        return { error: "Todo not found" };
    }

    const [error, todo] = await to(
        Todo.findByIdAndUpdate(id, data, { new: true })
    );

    if (error) {
        console.error(error);
        return { error };
    }

    if (todo) {
        return { todo };
    }

    return { error: "Todo not found" };
}

export async function deleteTodo(id: string) {
    const [dbConnectionError] = await to(connectDB());

    if (dbConnectionError) {
        return { error: dbConnectionError };
    }

    if (!id) {
        return { error: "Todo not found" };
    }

    const [error, todo] = await to(Todo.findByIdAndDelete(id).exec());

    if (error) {
        console.error(error);
        return { error };
    }

    if (todo) {
        return { todo };
    }

    return { error: "Todo not found" };
}
