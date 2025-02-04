import { commitActivityData } from '@/app/[lang]/_components/commits/commit.types';
import { getCommitActivities, getCommitsApi } from '@/services/commitsService';
import { activitiesProps, commitAndPaginationData, getCommitsApiProps } from '@/types/commits.types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetCommits = ({ owner, name, sha, page }: getCommitsApiProps) => {
  const queryResult: UseQueryResult<commitAndPaginationData> = useQuery({
    queryKey: ['commits', owner, name, sha, page],
    queryFn: () => getCommitsApi({ owner, name, sha, page }),
    enabled: !!owner && !!name,
  });

  const { data, isLoading, refetch } = queryResult;

  return { data, isLoading, refetch };
};

export const useGetCommitsActivities = ({ repoName, commitSha, owner }: activitiesProps) => {
  const queryResult: UseQueryResult<commitActivityData> = useQuery({
    queryKey: ['commits', repoName, commitSha],
    queryFn: () => getCommitActivities({ repoName, commitSha, owner }),
    enabled: !!repoName && !!commitSha,
  });

  const { data, isLoading } = queryResult;

  return { data, isLoading };
};
