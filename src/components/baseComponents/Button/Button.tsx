import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

// ----------------------------------------------------------------------
export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'contained' | 'outlined' | 'text' | 'icon';
  size?: 'medium' | 'small';
};

const Button = ({
  className,
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  children,
  ...other
}: Props) => {
  return (
    <button
      className={classNames(
        'rounded-5 button2 disabled:bg-button-disabled cursor-pointer',
        {
          ['bg-button-primary hover:bg-button-primary-hover text-white']:
            color === 'primary' && variant === 'contained',
          ['bg-button-success hover:bg-button-success-hover text-[#6DA172] hover:text-white']:
            color === 'success' && variant === 'contained',
          ['bg-button-warning hover:bg-button-warning-hover text-secondary hover:text-white']:
            color === 'warning' && variant === 'contained',
          ['bg-button-danger hover:bg-button-danger-hover text-[#B32F43] hover:text-white']:
            color === 'danger' && variant === 'contained',
          ['border-1 border-primary text-primary']:
            color === 'primary' && variant === 'outlined',
          ['disabled:bg-transparent disabled:text-secondary']:
            color === 'primary' && variant === 'text',
          ['px-4']: variant !== 'icon',
          ['px-1']: variant === 'icon',
          ['h-10']: size === 'medium',
          ['h-5']: size === 'small',
        },
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
