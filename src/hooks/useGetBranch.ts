import { getBranchesApi } from '@/services/branchesService';
import { branchesAndPaginationData, getBranchesApiProps } from '@/types/branches.type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetBranch = ({ owner, name, page }: getBranchesApiProps) => {
  const queryResult: UseQueryResult<branchesAndPaginationData> = useQuery({
    queryKey: ['branches', owner, name],
    queryFn: () => getBranchesApi({ owner, name, page }),
    enabled: !!owner && !!name,
  });

  const { data, isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
