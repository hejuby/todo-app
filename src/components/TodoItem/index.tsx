"use client";

import { formatDate } from "date-fns";
import { removeTodo } from "app/actions";
import { TodoDocument } from "#models/Todo";
import Button from "#components/Button";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";
import Link from "next/link";

export interface TodoItemProps {
    data: TodoDocument;
}

const cx = classNames(styles, "todo-item");

function TodoItem({ data }: TodoItemProps) {
    const endDate = data.endDate ? new Date(data.endDate) : null;

    return (
        <li className={cx()}>
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
                        className={cx("__due")}
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
                    onClick={() => {
                        removeTodo(data._id);
                    }}
                >
                    <Typography variant="c2">Delete</Typography>
                </Button>
            </div>
        </li>
    );
}

export default TodoItem;
