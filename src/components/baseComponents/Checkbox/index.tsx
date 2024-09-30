import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

// ----------------------------------------------------------------------
type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'inherit' | 'primary';
  inputSize?: 'medium' | 'small';
};

const Checkbox = ({
  className,
  variant = 'primary',
  inputSize = 'medium',
  ...other
}: Props) => {
  return (
    <input
      type="checkbox"
      className={classNames('rounded-3', className, {
        ['text-blur border-primary-dark']: variant === 'primary',
        ['text-netural-light border-secondary-dark checked:bg-checkbox-inherit']:
          variant === 'inherit',
        ['w-4 h-4']: inputSize === 'medium',
        ['w-3 h-3']: inputSize === 'small',
      })}
      {...other}
    />
  );
};

export default Checkbox;
