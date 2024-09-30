import classNames from 'classnames';
import Icon from '../IconWrapper';

// ----------------------------------------------------------------------
type Props = {
  className?: string;
  src?: string;
};

const Avatar = ({ className, src }: Props) => {
  if (src) {
    return (
      <img
        className={classNames('w-10 h-10 p-0 rounded-full', className)}
        src={src}
        alt="User avatar"
      />
    );
  }

  return (
    <Icon
      name="user"
      width={40}
      height={40}
    />
  );
};

export default Avatar;
