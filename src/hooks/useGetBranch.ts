import { branchDataType } from '@/app/[lang]/_components/commits/commit.types';
import { getBranchesApi } from '@/services/branchesService';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetBranch = (owner: string, name: string) => {
  const queryResult: UseQueryResult<branchDataType[]> = useQuery({
    queryKey: ['branches', owner, name],
    queryFn: () => getBranchesApi(owner, name),
    enabled: !!owner && !!name,
  });

  const { data = [], isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
