import { repoDataType } from '@/app/[lang]/_components/repositories/repo.types';
import { getRepositoriesApi } from '@/services/respositoriesService';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetRepositories = (userName: string) => {
  const queryResult: UseQueryResult<repoDataType[]> = useQuery({
    queryKey: ['repositories', userName],
    queryFn: () => getRepositoriesApi(userName),
    enabled: !!userName,
  });

  const { data = [], isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};
