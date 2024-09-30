import { ReactNode, createElement } from 'react';
import classNames from 'classnames';

// ----------------------------------------------------------------------
type Props = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'body'
    | 'caption'
    | 'left-menu'
    | 'page-menu'
    | 'table-headers'
    | 'table-row-content'
    | 'button1'
    | 'button2'
    | 'medium-text'
    | 'small-text';
  color?: 'primary' | 'secondary' | 'black' | 'white' | '';
  className?: string;
  children: ReactNode;
  onClick?: Function
};

const Typography = ({
  variant = 'body',
  color = '',
  className,
  children,
  ...other
}: Props) => {
  let tagName = 'p';

  switch (variant) {
    case 'h1':
      tagName = 'h1';
      break;
    case 'h2':
      tagName = 'h2';
      break;
    case 'h3':
      tagName = 'h3';
      break;
    case 'h4':
      tagName = 'h4';
      break;
    case 'body':
      tagName = 'p';
      break;
    case 'caption':
      tagName = 'span';
      break;
    case 'left-menu':
      tagName = 'p';
      break;
    case 'page-menu':
      tagName = 'p';
      break;
    case 'table-headers':
      tagName = 'p';
      break;
    case 'table-row-content':
      tagName = 'p';
      break;
    case 'button1':
      tagName = 'span';
      break;
    case 'button2':
      tagName = 'span';
      break;
    case 'small-text':
      tagName = 'p';
      break;
    default:
      break;
  }

  const TextTag = ({ ...props }: { className?: string; children: ReactNode }) =>
    createElement(tagName, props, children);

  return (
    <TextTag
      className={classNames(className, {
        // variant
        ['heading1']: variant === 'h1',
        ['heading2']: variant === 'h2',
        ['heading3']: variant === 'h3',
        ['heading4']: variant === 'h4',
        ['body']: variant === 'body',
        ['caption']: variant === 'caption',
        ['button1']: variant === 'button1',
        ['button2']: variant === 'button2',
        ['left-menu']: variant === 'left-menu',
        ['page-menu']: variant === 'page-menu',
        ['table-headers']: variant === 'table-headers',
        ['table-row-content']: variant === 'table-row-content',
        ['medium-text']: variant === 'medium-text',
        ['small-text']: variant === 'small-text',
        // color
        ['text-primary']: color === 'primary',
        ['text-secondary']: color === 'secondary',
        ['text-black']: color === 'black',
        ['text-white']: color === 'white',
      })}
      {...other}
    >
      {children}
    </TextTag>
  );
};

export default Typography;
