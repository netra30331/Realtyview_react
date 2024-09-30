import classNames from 'classnames';
// types
import { IconList, IconType } from './Icons';

// ----------------------------------------------------------------------
type Props = {
  name: IconType;
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
  iconClassName?: string;
};

const IconWrapper = ({ name, className, width = 24, height = 24, stroke, iconClassName }: Props) => {
  const IconTag = IconList[name];

  return (
    <div className={classNames('flex items-center justify-center', className)}>
      <IconTag width={width} height={height} stroke={stroke} className={className + (iconClassName ? ' ' + iconClassName : '')} />
    </div>
  );
};

export default IconWrapper;
