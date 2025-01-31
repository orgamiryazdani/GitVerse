import { getCommitsApi } from '@/services/commitsService';
import { commitAndPaginationData, getCommitsApiProps } from '@/types/commits.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetCommits = ({ owner, name, sha, page }: getCommitsApiProps) => {
  const queryResult: UseQueryResult<commitAndPaginationData> = useQuery({
    queryKey: ['commits', owner, name, sha, page],
    queryFn: () => getCommitsApi({ owner, name, sha, page }),
    enabled: !!owner && !!name,
  });

  const { data, isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
