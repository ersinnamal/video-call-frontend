import classes from "./Button.module.css";

const Button = ({
  children,
  color,
  onClick,
}: {
  children: JSX.Element;
  color: string;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button onClick={onClick} className={classes.button} style={{ backgroundColor: color }}>
      {children}
    </button>
  );
};

export default Button;
