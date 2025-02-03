import useOutsideClick from '@/hooks/useOutsideClick';
import { ModalProps } from './modal.types';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const Modal: React.FC<ModalProps> = ({ children, title, open, onClose }) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  return (
    open && (
      <div
        dir="ltr"
        className="fixed backdrop-blur-sm z-20 w-full h-full bg-light-100/10 top-0 left-0 flex items-center justify-center"
      >
        <div ref={ref} className="w-[95%] h-[95%] bg-dark-400 rounded-md">
          <div className="w-full border-b min-h-9 h-[6%] flex items-center justify-between px-3 text-xs text-white">
            <p>{title}</p>
            <IoCloseCircleOutline className="text-xl cursor-pointer" onClick={onClose} />
          </div>
          <div className="w-full h-[94%]">{children}</div>
        </div>
      </div>
    )
  );
};
