import { commitActivityData } from '@/app/[lang]/_components/commits/commit.types';
import { readData } from '@/core/http-service';
import { activitiesProps, commitAndPaginationData, getCommitsApiProps } from '@/types/commits.types';

export const getCommitsApi = ({ owner, name, sha = '', page = 1 }: getCommitsApiProps) => {
  return readData<commitAndPaginationData>(`/repos/${owner}/${name}/commits?page=${page}${sha && `&sha=${sha}`}`).then(
    (data) => data
  );
};

export const getCommitActivities = ({ repoName, commitSha, owner }: activitiesProps) => {
  return readData<commitActivityData>(`/repos/${owner}/${repoName}/commits/${commitSha}`);
};
