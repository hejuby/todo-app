"use server";

import { createTodo, updateTodo } from "#db/todo";
import { z } from "zod";

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    _id: z.string().optional(),
    priority: z.number(),
});

export async function submitTodo(formData: FormData) {
    const validatedFields = todoSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        _id: formData.get("_id"),
        priority: 0,
    });

    console.log(formData);

    if (!validatedFields.success) {
        console.log("FAILED", validatedFields.error.flatten().fieldErrors);
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { _id: id, ...data } = validatedFields.data;

    if (id) {
        await updateTodo(data);
        return;
    }

    await createTodo(data);
}
