import { formatDate } from "date-fns";
import { TodoDocument } from "#models/Todo";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

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
        </li>
    );
}

export default TodoItem;
