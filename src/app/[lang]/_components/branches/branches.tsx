import { useGetBranch } from '@/hooks/useGetBranch';
import truncateText from '@/utils/truncateText';
import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { branchesProps } from './branches.type';
import { branchDataType } from '../commits/commit.types';

export const Branches: React.FC<branchesProps> = ({ selectedRepo, filterHandler }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetBranch({ owner: selectedRepo.owner, name: selectedRepo.name, page });
  const extractBranches = data?.data || [];
  const [branches, setBranches] = useState<branchDataType[] | []>([]);
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBrach, setSelectedBranch] = useState('');
  const url = data?.config?.url || '';
  const pageMatch = url?.match(/page=(\d+)/);
  const currentPage = pageMatch ? parseInt(pageMatch[1]) : 0;
  const linkHeader = data?.headers?.link || '';

  useEffect(() => {
    if (extractBranches.length > 0) {
      setBranches((prevBranches) => [...prevBranches, ...extractBranches]);
      setSelectedBranch(extractBranches[0].name);
    }
  }, [data]);

  useEffect(() => {
    if (selectedRepo.owner !== '' && selectedRepo.name !== '') {
      refetch();
    }
  }, []);

  const getMoreBranches = async (page: number) => {
    await setPage(page);
    refetch();
  };

  const branchHandler = (sha: string, name: string) => {
    filterHandler(sha);
    setShowBranches(false);
    setSelectedBranch(name);
  };

  if (isLoading) return <p>loading</p>;

  return (
    <>
      <div
        onClick={() => setShowBranches(!showBranches)}
        className="md:w-1/3 w-full h-10 cursor-pointer flex items-center justify-between px-2 rounded-lg text-sm dark:bg-dark-400 bg-light-400 text-white"
      >
        <p>{truncateText(selectedBrach, 28)}</p>
        <MdOutlineArrowDropDown className="text-2xl" />
      </div>
      {showBranches && (
        <div className="md:w-[32.7%] w-full p-2 max-h-[310px] h-auto rounded-lg dark:bg-dark-400 absolute right-0 top-14">
          {branches.length > 1 && (
            <input dir="rtl" type="search" className="w-full h-8 rounded-lg p-3 text-xs" placeholder="جستجو..." />
          )}
          <div
            className={`w-full max-h-56 ${branches.length > 1 ? 'mt-4 overflow-y-auto' : 'mt-0'} flex flex-col gap-y-2 text-sm dark:text-white`}
          >
            {branches.map(({ name, commit }) => (
              <div
                onClick={() => branchHandler(commit.sha, name)}
                className={`w-full ${branches.length > 1 ? 'border-b pb-2' : ''} border-light-300 cursor-pointer`}
                key={name + commit.sha}
              >
                {truncateText(name, 28)}
              </div>
            ))}
          </div>
          {linkHeader.includes('rel="next"') && (
            <div
              onClick={() => getMoreBranches(currentPage + 1)}
              dir="rtl"
              className="w-full h-6 flex items-center justify-center"
            >
              <span className="w-10 pb-[2px] text-sm border-light-400 text-light-100 flex items-center justify-center cursor-pointer border-b ">
                بیشتر
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
