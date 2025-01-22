import { readData } from '@/core/http-service';

export const getRepositoriesApi = (userName: string) => {
  return readData(`/users/${userName}/repos`);
};
