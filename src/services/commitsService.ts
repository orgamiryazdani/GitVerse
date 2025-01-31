import { readData } from '@/core/http-service';
import { commitAndPaginationData, getCommitsApiProps } from '@/types/commits.types';

export const getCommitsApi = ({ owner, name, sha = '', page = 1 }: getCommitsApiProps) => {
  return readData<commitAndPaginationData>(`/repos/${owner}/${name}/commits?page=${page}${sha && `&sha=${sha}`}`).then(
    (data) => data
  );
};
