import { commitAndPaginationData } from '@/app/[lang]/_components/commits/commit.types';
import { readData } from '@/core/http-service';

type getCommitsApiProps = {
  owner: string;
  name: string;
  sha?: string;
  page?: number;
};

export const getCommitsApi = ({ owner, name, sha = '', page = 1 }: getCommitsApiProps) => {
  return readData<commitAndPaginationData>(`/repos/${owner}/${name}/commits?page=${page}${sha && `&sha=${sha}`}`).then(
    (data) => data
  );
};
