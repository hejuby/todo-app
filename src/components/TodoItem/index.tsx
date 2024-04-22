import { TodoDocument } from "#models/Todo";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

export interface TodoItemProps {
    data: TodoDocument;
}

const cx = classNames(styles, "todo-item");

function TodoItem({ data }: TodoItemProps) {
    return <li className={cx()}>{data.title}</li>;
}

export default TodoItem;
