type ButtonProps = {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
  className: string;
};

const Button = ({ title, onClick, isDisabled, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || false}
      className={className}
    >
      {title}
    </button>
  );
};

export default Button;
