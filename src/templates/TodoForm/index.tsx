"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitTodo } from "app/actions";
import Button from "#components/Button";
import Input from "#components/Input";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import { TodoPriority } from "#constants";
import styles from "./index.module.scss";

export interface TodoFormProps {
    initialData?: z.infer<typeof todoSchema>;
}

const cx = classNames(styles, "todo-form");

const todoSchema = z.object({
    title: z.string().min(1, "제목을 입력해 주세요."),
    description: z.string().optional(),
    _id: z.string().optional(),
    endDate: z.date().optional(),
    priority: z.preprocess(
        (x) => x ?? TodoPriority.Minimum,
        z.coerce
            .number()
            .int()
            .min(TodoPriority.Minimum, "0보다 작은 값은 입력할 수 없어요.")
            .max(TodoPriority.Maximum, "5보다 큰 값은 입력할 수 없어요.")
    ),
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
    const { handleSubmit, register, reset, formState, watch, setValue } =
        useForm({
            resolver: zodResolver(todoSchema),
            defaultValues: initialState,
        });

    return (
        <form
            className={cx()}
            action={async () =>
                handleSubmit(async (data) => {
                    await submitTodo(data);

                    if (initialData) {
                        router.back();
                    } else {
                        reset();
                    }
                })()
            }
            ref={formRef}
        >
            <Typography variant="h1" component="h1" fontWeight={700}>
                What&apos;s on your mind?
            </Typography>
            <Input
                placeholder="Add title"
                label="Todo *"
                required
                {...register("title", { required: true })}
                error={formState.errors.title?.message}
                data-testid="add-title"
            />
            <Input
                placeholder="Add description"
                label="Description"
                {...register("description")}
                error={formState.errors.description?.message}
                data-testid="add-description"
            />
            <Input
                type="date"
                label="Due"
                value={watch("endDate")?.toISOString().split("T")[0]}
                onChange={({ currentTarget: { value } }) => {
                    setValue("endDate", value ? new Date(value) : undefined);
                }}
                data-testid="add-due"
            />
            <Input
                label="Priority"
                type="number"
                step="1"
                {...register("priority", {
                    min: TodoPriority.Minimum,
                    max: TodoPriority.Maximum,
                })}
                error={formState.errors.priority?.message}
                data-testid="add-priority"
            />
            <Input type="hidden" name="_id" hidden />
            <Button type="submit" data-testid="form-submit">
                Add
            </Button>
        </form>
    );
}

export default TodoForm;
