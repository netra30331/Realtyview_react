import classNames from 'classnames';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------
type Props = {
  className?: string;
  variant?: 'contained' | 'outline';
  color?: 'success' | 'warnning' | 'danger';
  size?: 'small' | 'medium';
  title?: ReactNode;
};

const Label = ({
  className,
  variant = 'contained',
  color = 'success',
  size = 'medium',
  title,
}: Props) => {
  return (
    <span
      className={classNames(' font-kanit', className, {
        ['bg-success']: variant === 'contained' && color === 'success',
        ['bg-warning']: variant === 'contained' && color === 'warnning',
        ['bg-error']: variant === 'contained' && color === 'danger',
        ['text-success-dark']: color === 'success',
        ['text-warnning-dark']: color === 'warnning',
        ['text-error-dark']: color === 'danger',
        ['px-1.5 py-1 font-normal text-11 leading-16 rounded-3']:
          size === 'small',
        ['px-4 py-2 font-medium text-20 leading-30 rounded-8']:
          size === 'medium',
      })}
    >
      {title}
    </span>
  );
};

export default Label;
