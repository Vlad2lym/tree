import styles from './customButton.module.scss';

interface IProps {
  children: any;
  className?: string;
  primary?: boolean;
  danger?: boolean;
  onClick: () => void;
}

export const CustomButton = ({ children, className, primary, danger, onClick }: IProps) => {
  let buttonStyle = styles.customButton;

  if (primary) {
    buttonStyle += ` ${styles.primary}`;
  } else if (danger) {
    buttonStyle += ` ${styles.danger}`
  }

  return (
    <button className={className ? `${buttonStyle} ${className}` : buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};
