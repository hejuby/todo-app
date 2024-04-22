"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createTodo, deleteTodo, updateTodo } from "#db/todo";
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
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { _id: id, ...data } = validatedFields.data;

    if (id) {
        await updateTodo({ _id: id, ...data });
        revalidateTag(TODO_API_TAG);
        return;
    }

    await createTodo(data);
    revalidateTag(TODO_API_TAG);
}

export async function removeTodo(id: string) {
    await deleteTodo(id);
    revalidateTag(TODO_API_TAG);
}

export async function modifyCompleteStateFromTodo(
    id: string,
    completed: boolean
) {
    await updateTodo({ _id: id, completed });
}
