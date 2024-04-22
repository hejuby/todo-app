"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { createTodo, updateTodo } from "#db/todo";
import { TODO_API_TAG } from "#constants";

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    _id: z.string().optional(),
    endDate: z.date().optional(),
    priority: z.number(),
});

export async function submitTodo(formData: FormData) {
    const validatedFields = todoSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        endDate: formData.get("endDate")
            ? new Date(formData.get("endDate")!.toString())
            : undefined,
        _id: formData.get("_id"),
        priority: Number(formData.get("priority") || 0),
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
        revalidateTag(TODO_API_TAG);
        return;
    }

    await createTodo(data);
    revalidateTag(TODO_API_TAG);
}
