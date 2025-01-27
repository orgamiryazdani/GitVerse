import { commitDataType } from '@/app/[lang]/_components/commits/commit.types';

export type commitAndPaginationData =
  | {
      headers?: {
        link: string;
      };
      config?: {
        url: string;
      };
      data: commitDataType[];
    }
  | undefined;

export type getCommitsApiProps = {
  owner: string;
  name: string;
  sha?: string;
  page?: number;
};
