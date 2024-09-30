import { ReactNode } from 'react';
import Icon from '../IconWrapper';
import Button, { Props as ButtonProps } from './Button';
import classNames from 'classnames';

// ----------------------------------------------------------------------
type Props = ButtonProps & {
  children?: ReactNode;
  label?: string | number;
};

const Notification = ({ label, className, ...other }: Props) => {
  return (
    <Button
      color="inherit"
      variant="icon"
      className={classNames('relative w-auto h-auto', className)}
      {...other}
    >
      <Icon name="alert" />
      {label ? (
        <div className="font-kanit absolute inline-flex items-center justify-center font-medium text-white bg-[#C84156] rounded-full w-4 h-4 text-10 -top-0.5 -right-1">
          {label}
        </div>
      ) : null}
    </Button>
  );
};

export default Notification;
