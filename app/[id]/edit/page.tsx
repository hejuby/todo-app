import { getTodo } from "#db/todo";
import TodoForm from "#templates/TodoForm";
import classNames from "#utils/classNames";
import styles from "./page.module.scss";

const cx = classNames(styles);

interface EditPageProps {
    params: {
        id: string;
    };
}

export default async function EditPage({ params: { id } }: EditPageProps) {
    const initialData = await getTodo(id);

    return (
        <main className={cx("main")}>
            <TodoForm initialData={initialData?.todo} />
        </main>
    );
}
