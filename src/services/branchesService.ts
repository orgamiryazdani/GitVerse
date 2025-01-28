import { readData } from '@/core/http-service';
import { branchesAndPaginationData, getBranchesApiProps } from '@/types/branches.type';

export const getBranchesApi = ({ owner, name, page = 1 }: getBranchesApiProps) => {
  return readData<branchesAndPaginationData>(`/repos/${owner}/${name}/branches?page=${page}`).then((data) => data);
};
