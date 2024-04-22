"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "date-fns";
import { modifyCompleteStateFromTodo, removeTodo } from "app/actions";
import { TodoDocument } from "#models/Todo";
import Button from "#components/Button";
import Checkbox from "#components/Checkbox";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import toast from "#utils/toast";
import styles from "./index.module.scss";

export interface TodoItemProps {
    data: TodoDocument;
}

const cx = classNames(styles, "todo-item");

function TodoItem({ data }: TodoItemProps) {
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const [done, setDone] = useState(!!data.completed);

    return (
        <li className={cx()}>
            <Checkbox
                checked={done}
                onChange={async () => {
                    const nextState = !done;
                    setDone(nextState);

                    try {
                        await modifyCompleteStateFromTodo(data._id, !done);
                    } catch {
                        toast("상태 변경에 실패했습니다");
                        setDone(!nextState);
                    }
                }}
            />
            <Typography component="p" fontWeight={500}>
                {data.title}
            </Typography>
            {data.description && (
                <Typography
                    component="p"
                    variant="c1"
                    className={cx("__description")}
                >
                    {data.description}
                </Typography>
            )}
            <div className={cx("__extra")}>
                {endDate && (
                    <Typography
                        component="time"
                        variant="c2"
                        className={cx(
                            "__due",
                            endDate < new Date() && "__due--overdue"
                        )}
                        dateTime={endDate.toISOString()}
                    >
                        {formatDate(endDate, "MM/dd")}
                    </Typography>
                )}
                <Button
                    className={cx("__button", "--edit")}
                    variant="text"
                    size="small"
                    component={Link}
                    href={`/${data._id}/edit`}
                >
                    <Typography variant="c2">Edit</Typography>
                </Button>
                <Button
                    className={cx("__button", "--delete")}
                    variant="text"
                    size="small"
                    onClick={async () => {
                        try {
                            await removeTodo(data._id);
                        } catch {
                            toast("삭제에 실패했습니다");
                        }
                    }}
                >
                    <Typography variant="c2">Delete</Typography>
                </Button>
            </div>
        </li>
    );
}

export default TodoItem;
