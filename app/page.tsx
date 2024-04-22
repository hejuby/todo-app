import { getTodoList } from "#db/todo";
import TodoForm from "#templates/TodoForm";
import classNames from "#utils/classNames";
import styles from "./page.module.scss";

const cx = classNames(styles);

export default async function Home() {
    const data = await getTodoList();

    return (
        <main className={cx("main")}>
            <TodoForm />
            <ul>
                {data.todos?.map((todo) => (
                    <div key={todo._id}>{todo.title}</div>
                ))}
            </ul>
        </main>
    );
}
