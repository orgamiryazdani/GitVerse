import { readData } from '@/core/http-service';

export const getBranchesApi = (owner: string, name: string) => {
  return readData(`/repos/${owner}/${name}/branches`);
};
