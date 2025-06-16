import "./toggle.styles.css";

export const Toggle = ({
  value,
  onChange,
  className = "",
}: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}) => {
  return (
    <label className={`toggle ${className}`}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  );
};
