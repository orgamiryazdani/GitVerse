import { readData } from '@/core/http-service';

export const getCommitsApi = (owner: string, name: string) => {
  return readData(`/repos/${owner}/${name}/commits?page=1`);
};
