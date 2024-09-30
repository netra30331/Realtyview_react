import classNames from 'classnames';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------
type Props = {
  className?: string;
  children: ReactNode;
};

const Container = ({ className, children }: Props) => {
  return (
    <div className={classNames('w-full px-4 lg:px-7', className)}>
      {children}
    </div>
  );
};

export default Container;
