import { getTodoList } from "#db/todo";
import { request } from "#api/instance";
import TodoForm from "#templates/TodoForm";
import TodoList from "#templates/TodoList";
import classNames from "#utils/classNames";
import { TODO_API_TAG } from "#constants";
import styles from "./page.module.scss";

const cx = classNames(styles);

export default async function Home() {
    const data = await request<Awaited<ReturnType<typeof getTodoList>>>(
        "/todo",
        { next: { tags: [TODO_API_TAG] } }
    );

    console.log(data?.todos);

    return (
        <main className={cx("main")}>
            <TodoForm />
            <TodoList todos={data?.todos} />
        </main>
    );
}
