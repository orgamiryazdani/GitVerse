import { Size } from '../types/size.type';
import { ButtonProps, ButtonShape } from './button.types';
import classNames from 'classnames';

const sizeClasses: Record<Size, string> = {
  tiny: 'btn-xs',
  small: 'btn-sm',
  normal: '',
  large: 'btn-lg',
};

const shapeClasses: Record<ButtonShape, string> = {
  wide: 'btn-wide',
  full: 'btn-block',
  square: 'btn-square',
  default: '',
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'normal',
  isDisabled = false,
  isOutline = false,
  shape = 'default',
  isLoading = false,
  loadingText = 'در حال ارسال درخواست',
  type = 'button',
  isLink = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    'btn',
    className,
    { 'btn-outline': isOutline },
    { 'btn-link': isLink },
    { 'pointer-events-none opacity-80': isLoading },
    { [`btn-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size },
    { [`${shapeClasses[shape]}`]: shape }
  );

  return (
    <button type={type} disabled={isDisabled} {...rest} className={classes}>
      {isLoading && 'loading...'}
      {isLoading ? loadingText : children}
    </button>
  );
};
