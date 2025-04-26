import "./button.styles.css";

type ButtonProps = {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  label,
  className,
  style,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={["button", className, type === "submit" ? "accent" : null]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {label ?? null}
    </button>
  );
};
