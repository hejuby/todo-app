import { TodoDocument } from "#models/Todo";
import TodoItem from "#components/TodoItem";
import Typography from "#components/Typography";
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
                    <TodoItem key={todo._id} data={todo} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
