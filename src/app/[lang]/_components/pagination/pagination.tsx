import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { paginationProps } from './pagination.types';
import { useLang } from '@/providers/language-provider';

export const Pagination: React.FC<paginationProps> = ({ linkHeader, currentPage, paginationHandler }) => {
  const lang = useLang();
  return (
    <>
      {linkHeader && (
        <div
          dir="ltr"
          className={`w-44 h-14 sticky ${lang === 'fa' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} bottom-0 flex items-center justify-center gap-x-3 dark:bg-dark-300 bg-light-400 border dark:border-dark-400 border-light-100 rounded-xl`}
        >
          <button
            disabled={currentPage < 2}
            onClick={() => paginationHandler('decrement')}
            className={`w-11 text-3xl h-10 flex items-center justify-center rounded-lg dark:bg-dark-400 bg-light-300 ${currentPage >= 2 ? 'cursor-pointer dark:text-white text-dark-100' : 'cursor-not-allowed dark:text-dark-200 text-light-400'}`}
          >
            <MdArrowLeft />
          </button>
          <span className="w-12 dark:bg-dark-400 bg-light-300 rounded-lg h-10 flex items-center justify-center dark:text-white text-dark-100 text-xl">
            {currentPage}
          </span>
          <button
            disabled={!linkHeader.includes('rel="next"')}
            onClick={() => paginationHandler('increment')}
            className={`w-11 text-3xl h-10 flex items-center justify-center rounded-lg dark:bg-dark-400 bg-light-300 ${linkHeader.includes('rel="next"') ? 'cursor-pointer dark:text-white text-dark-100' : 'cursor-not-allowed dark:text-dark-200 text-light-400'}`}
          >
            <MdArrowRight />
          </button>
        </div>
      )}
    </>
  );
};
