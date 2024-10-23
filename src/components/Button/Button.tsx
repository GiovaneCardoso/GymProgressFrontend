interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <button {...props} className="p-4 bg-primary text-light">
      {children}
    </button>
  );
};

export default Button;
