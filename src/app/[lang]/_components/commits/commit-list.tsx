import { CommitCard } from './commit-card';
import { commitListProps } from './commit.types';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

export const CommitList: React.FC<commitListProps> = ({ commits, branches }) => {
  return (
    <div
      dir="ltr"
      className="w-3/5 h-96 rounded-xl bg-dark-300 border-[5px] border-dark-300 overflow-y-auto flex flex-wrap gap-3 p-2 pt-0"
    >
      <div className="w-full h-14 sticky bg-dark-300 top-0 flex items-center gap-x-4">
        <input
          type="search"
          className="w-2/3 h-10 rounded-lg px-2 placeholder:text-sm text-white bg-dark-400 placeholder:text-white"
          placeholder="search..."
        />
        <select className="w-1/3 h-10 px-1 rounded-lg text-sm bg-dark-400 text-white">
          {branches.map(({ name, commit }) => (
            <option key={name + commit.sha} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-y-4 w-full min-h-56">
        {commits.length > 0 ? (
          commits.map(({ commit, sha, committer }) => (
            <CommitCard key={commit.message + sha} commit={commit} committer={committer} />
          ))
        ) : (
          <div className="w-full text-center text-white h-48 text-xl flex items-center justify-center">
            هیچ فعالیتی مربوط به این ریپازیتوری پیدا نشد
          </div>
        )}
      </div>
      {commits.length > 0 && (
        <div className="w-44 h-14 sticky left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center gap-x-3 bg-dark-300 border border-dark-400 rounded-xl">
          <span className="w-11 cursor-pointer text-3xl text-white h-10 flex items-center justify-center rounded-lg bg-dark-400">
            <MdArrowLeft />
          </span>
          <span className="w-12 bg-dark-400 rounded-lg h-10 flex items-center justify-center text-white text-xl">
            1
          </span>
          <span className="w-11 cursor-pointer text-3xl text-white h-10 flex items-center justify-center rounded-lg bg-dark-400">
            <MdArrowRight />
          </span>
        </div>
      )}
    </div>
  );
};
