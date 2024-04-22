import { submitTodo } from "app/actions";
import Button from "#components/Button";
import Input from "#components/Input";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

const cx = classNames(styles, "todo-form");

function TodoForm() {
    return (
        <form className={cx()} action={submitTodo}>
            <Typography variant="h1" component="h1" fontWeight={700}>
                What&apos;s on your mind?
            </Typography>
            <Input name="title" placeholder="Add title" label="Todo *" />
            <Input
                name="description"
                placeholder="Add description"
                label="Description"
            />
            <Input name="endDate" type="date" label="Due" />
            <Input type="hidden" name="_id" />
            <Button type="submit">Add</Button>
        </form>
    );
}

export default TodoForm;
