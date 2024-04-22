import Typography from "#components/Typography";
import { TodoDocument } from "#models/Todo";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

export interface TodoListProps {
    todos?: TodoDocument[];
}

const cx = classNames(styles, "todo-list");

function TodoList({ todos = [] }: TodoListProps) {
    return (
        <div className={cx()}>
            <Typography
                variant="h2"
                component="h2"
                fontWeight={500}
                marginBottom={16}
            >
                Your Todo
            </Typography>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
