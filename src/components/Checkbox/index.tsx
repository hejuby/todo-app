import { InputHTMLAttributes } from "react";
import classNames from "#utils/classNames";
import styles from "./index.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const cx = classNames(styles, "checkbox");

function Checkbox({
    className,
    name,
    checked,
    onChange,
    label,
    children,
}: CheckboxProps) {
    return (
        <label className={cx(className, "checkbox")}>
            <input
                type="checkbox"
                className={cx("__input")}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <div className={cx("__icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M18.9 35.7 7.7 24.5 9.85 22.35 18.9 31.4 38.1 12.2 40.25 14.35Z" />
                </svg>
            </div>
            {children || <span>{label}</span>}
        </label>
    );
}

export default Checkbox;
