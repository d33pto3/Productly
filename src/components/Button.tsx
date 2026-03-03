type ButtonProps = {
  title: string;
  handleClick: (item: string) => void;
  isDisabled?: boolean;
  className: string;
};

const Button = ({ title, handleClick, isDisabled, className }: ButtonProps) => {
  return (
    <button
      onClick={() => handleClick(title)}
      disabled={isDisabled || false}
      className={className}
    >
      {title}
    </button>
  );
};

export default Button;
