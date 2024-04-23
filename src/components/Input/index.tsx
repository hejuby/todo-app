import { InputHTMLAttributes, forwardRef } from "react";
import Typography from "#components/Typography";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const cx = classNames(styles, "input");

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        console.log(props.name, props);
        return (
            <label
                className={cx(
                    "",
                    props.hidden && "--hidden",
                    error && "--error"
                )}
            >
                {label && <span className={cx("__label")}>{label}</span>}
                <input className={cx("__input")} {...props} ref={ref} />
                <Typography variant="c2" className={cx("__error")}>
                    {error}
                </Typography>
            </label>
        );
    }
);

Input.displayName = "Input";

export default Input;
