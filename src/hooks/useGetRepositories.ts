import { getRepositoriesApi } from '@/services/respositoriesService';
import { getRepoApiProps, repoAndPaginationData } from '@/types/repo.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetRepositories = ({ userName, page }: getRepoApiProps) => {
  const queryResult: UseQueryResult<repoAndPaginationData> = useQuery({
    queryKey: ['repositories', userName, page],
    queryFn: () => getRepositoriesApi({ userName, page }),
    enabled: !!userName,
  });

  const { data, isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
