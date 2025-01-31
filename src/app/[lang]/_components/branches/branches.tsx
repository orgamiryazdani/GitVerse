import { useGetBranch } from '@/hooks/useGetBranch';
import truncateText from '@/utils/truncateText';
import { useEffect, useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { branchesProps } from './branches.type';
import { branchDataType } from '../commits/commit.types';
import { BranchesPlaceholder } from '../placeholders/branches';
import { useDictionary } from '@/providers/dictionary-provider';

export const Branches: React.FC<branchesProps> = ({ selectedRepo, filterHandler, selectedBrach }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetBranch({ owner: selectedRepo.owner, name: selectedRepo.name, page });
  const extractBranches = data?.data || [];
  const [branches, setBranches] = useState<branchDataType[] | []>([]);
  const [showBranches, setShowBranches] = useState(false);
  const url = data?.config?.url || '';
  const pageMatch = url?.match(/page=(\d+)/);
  const currentPage = pageMatch ? parseInt(pageMatch[1]) : 0;
  const linkHeader = data?.headers?.link || '';
  const dict = useDictionary();

  useEffect(() => {
    if (extractBranches.length > 0) {
      setBranches((prevBranches) => {
        const uniqueBranches = [...prevBranches, ...extractBranches].filter(
          (branch, index, self) =>
            index === self.findIndex((b) => b.name === branch.name && b.commit.sha === branch.commit.sha)
        );
        return uniqueBranches;
      });
    }
  }, [data]);

  const getMoreBranches = async (page: number) => {
    await setPage(page);
    refetch();
  };

  const branchHandler = async (sha: string, name: string) => {
    await filterHandler(sha, name);
    setShowBranches(false);
  };

  const searchHandler = (value: string) => {
    if (value == '') {
      setBranches(extractBranches);
    } else {
      const searchResult = extractBranches.filter((branch) => {
        return branch.name.toLowerCase().includes(value.toLowerCase());
      });
      setBranches(searchResult);
    }
  };

  return (
    <>
      {isLoading ? (
        <BranchesPlaceholder />
      ) : (
        <div className="relative xl:w-1/3 w-full">
          <div
            dir="ltr"
            onClick={() => setShowBranches(!showBranches)}
            className="w-full h-10 cursor-pointer flex items-center justify-between px-2 rounded-lg text-sm dark:bg-dark-400 bg-light-400 text-white"
          >
            <p>{truncateText(selectedBrach !== '' ? selectedBrach : extractBranches[0].name, 26)}</p>
            <MdOutlineArrowDropDown className="text-2xl" />
          </div>
          {showBranches && (
            <div className="w-full p-2 max-h-[310px] h-auto rounded-lg dark:bg-dark-400 bg-light-400 absolute top-12">
              <input
                onChange={(e) => searchHandler(e.target.value)}
                type="search"
                className="w-full h-8 rounded-lg p-3 text-xs"
                placeholder={dict.search}
              />
              <div
                dir="ltr"
                className="w-full max-h-56 mt-3 overflow-y-auto flex flex-col gap-y-2 text-sm dark:text-white"
              >
                {branches.length == 0 ? (
                  <p className="h-6 flex items-center justify-center">{dict.this_result_was_not_found}</p>
                ) : (
                  branches.map(({ name, commit }) => (
                    <div
                      onClick={() => branchHandler(commit.sha, name)}
                      className={`w-full ${branches.length > 1 ? 'border-b pb-2 mt-1' : ''} h-6 flex items-center border-light-300 cursor-pointer`}
                      key={name + commit.sha}
                    >
                      {truncateText(name, 28)}
                    </div>
                  ))
                )}
              </div>
              {linkHeader.includes('rel="next"') && (
                <div
                  onClick={() => getMoreBranches(currentPage + 1)}
                  dir="rtl"
                  className="w-full h-6 flex items-center justify-center"
                >
                  <span className="w-10 pb-[1px] text-sm dark:border-light-400 border-dark-300 text-light-100 flex   justify-center cursor-pointer border-b">
                    {dict.more}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
