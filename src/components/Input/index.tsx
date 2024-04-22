import { InputHTMLAttributes, forwardRef } from "react";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const cx = classNames(styles, "input");

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => {
        return (
            <label className={cx("", props.hidden && "--hidden")}>
                {label && <span className={cx("__label")}>{label}</span>}
                <input className={cx("__input")} {...props} ref={ref} />
            </label>
        );
    }
);

Input.displayName = "Input";

export default Input;
