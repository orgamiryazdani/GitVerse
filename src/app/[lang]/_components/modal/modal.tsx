import useOutsideClick from '@/hooks/useOutsideClick';
import { ModalProps } from './modal.types';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const Modal: React.FC<ModalProps> = ({ children, title, open, onClose }) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  return (
    open && (
      <div
        dir="ltr"
        className="fixed backdrop-blur-sm z-20 w-full h-full dark:bg-dark-100/70 bg-light-300/70 top-0 left-0 flex items-center justify-center"
      >
        <div
          ref={ref}
          className="w-[95%] max-h-[95%] relative border-4 dark:border-dark-400 border-light-400 overflow-auto dark:bg-dark-400 bg-light-400 rounded-md"
        >
          <div className="w-full sticky top-0 z-20 dark:bg-dark-400 bg-light-400 border-b min-h-9 h-[6%] flex items-center justify-between px-3 text-xs text-white">
            <p>{title}</p>
            <IoCloseCircleOutline className="text-xl cursor-pointer" onClick={onClose} />
          </div>
          <div className="w-full h-[94%]">{children}</div>
        </div>
      </div>
    )
  );
};
