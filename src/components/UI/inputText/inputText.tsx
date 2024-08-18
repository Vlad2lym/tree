import styles from './inputText.module.scss';

interface IProps {
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}

export const InputText = ({ className, placeholder, onChange, value }: IProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className ? `${styles['text-field']} ${className}` : styles['text-field']}>
      <input
        className={styles['text-field__input']}
        type="text"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      ></input>
    </div>
  );
};
