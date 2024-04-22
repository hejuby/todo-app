import { getTodoList } from "#db/todo";
import TodoForm from "#templates/TodoForm";
import TodoList from "#templates/TodoList";
import classNames from "#utils/classNames";
import styles from "./page.module.scss";

const cx = classNames(styles);

export default async function Home() {
    const data = await getTodoList();

    return (
        <main className={cx("main")}>
            <TodoForm />
            <TodoList todos={data?.todos} />
        </main>
    );
}
