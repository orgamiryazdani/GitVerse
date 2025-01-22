import { commitDataType } from '@/app/[lang]/_components/commits/commit.types';
import { getCommitsApi } from '@/services/commitsService';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetCommits = (owner: string, name: string) => {
  const queryResult: UseQueryResult<commitDataType[]> = useQuery({
    queryKey: ['commits', owner, name],
    queryFn: () => getCommitsApi(owner, name),
    enabled: !!owner && !!name,
  });

  const { data = [], isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
