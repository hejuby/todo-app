"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import { submitTodo } from "app/actions";
import Button from "#components/Button";
import Input from "#components/Input";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

export interface TodoFormProps {
    initialData?: z.infer<typeof todoSchema>;
}

const cx = classNames(styles, "todo-form");

const todoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    _id: z.string().optional(),
    endDate: z.date().optional(),
    priority: z.number(),
});

function TodoForm({ initialData }: TodoFormProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const initialState: z.infer<typeof todoSchema> = useMemo(
        () =>
            initialData || {
                title: "",
                priority: 0,
                description: "",
                endDate: undefined,
                _id: "",
            },
        [initialData]
    );
    const [data, setData] = useState<z.infer<typeof todoSchema>>({
        ...initialState,
    });

    return (
        <form
            className={cx()}
            action={async () => {
                await submitTodo(data);

                if (initialData) {
                    router.back();
                } else {
                    setData({ ...initialState });
                }
            }}
            ref={formRef}
        >
            <Typography variant="h1" component="h1" fontWeight={700}>
                What&apos;s on your mind?
            </Typography>
            <Input
                name="title"
                placeholder="Add title"
                label="Todo *"
                required
                value={data.title}
                onChange={({ currentTarget }) => {
                    setData((prev) => ({
                        ...prev,
                        title: currentTarget.value,
                    }));
                }}
            />
            <Input
                name="description"
                placeholder="Add description"
                label="Description"
                value={data.description}
                onChange={({ currentTarget }) => {
                    setData((prev) => ({
                        ...prev,
                        description: currentTarget.value,
                    }));
                }}
            />
            <Input
                name="endDate"
                type="date"
                label="Due"
                value={data.endDate?.toISOString().split("T")[0] || ""}
                onChange={({ currentTarget }) => {
                    setData((prev) => ({
                        ...prev,
                        endDate: new Date(currentTarget.value),
                    }));
                }}
            />
            <Input
                label="Priority"
                type="number"
                name="priority"
                min="0"
                max="5"
                step="1"
                value={data.priority}
                onChange={({ currentTarget }) => {
                    setData((prev) => ({
                        ...prev,
                        priority: parseInt(currentTarget.value, 10),
                    }));
                }}
            />
            <Input type="hidden" name="_id" hidden />
            <Button type="submit">Add</Button>
        </form>
    );
}

export default TodoForm;
