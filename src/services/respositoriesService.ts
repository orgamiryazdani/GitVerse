import { readData } from '@/core/http-service';
import { getRepoApiProps, repoAndPaginationData } from '@/types/repo.types';

export const getRepositoriesApi = ({ userName, page = 1 }: getRepoApiProps) => {
  return readData<repoAndPaginationData>(`/users/${userName}/repos?page=${page}`).then((data) => data);
};
