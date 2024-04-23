"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createTodo, deleteTodo, updateTodo } from "#db/todo";
import to from "#utils/awaitTo";
import { TODO_API_TAG } from "#constants";

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    _id: z.string().optional(),
    endDate: z.date().optional(),
    priority: z.number(),
});

export async function submitTodo(formData: z.infer<typeof todoSchema>) {
    const validatedFields = todoSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.log("FAILED", validatedFields.error.flatten().fieldErrors);
        return {
            message: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { _id: id, ...data } = validatedFields.data;

    if (id) {
        await updateTodo({ _id: id, ...data });
        revalidateTag(TODO_API_TAG);
        return { message: "Todo updated" };
    }

    await createTodo(data);
    revalidateTag(TODO_API_TAG);
    return { message: "Todo created" };
}

export async function removeTodo(id: string) {
    const [error, result] = await to(deleteTodo(id));

    if (error || result?.error) {
        return { message: error?.message || result?.error };
    }

    revalidateTag(TODO_API_TAG);
    return { message: "Todo deleted" };
}

export async function modifyCompleteStateFromTodo(
    id: string,
    completed: boolean
) {
    const [error, result] = await to(updateTodo({ _id: id, completed }));

    if (error || result?.error) {
        return { message: error?.message || result?.error };
    }

    return { message: "Todo updated" };
}
