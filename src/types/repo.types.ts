import { repoDataType } from '@/app/[lang]/_components/repositories/repo.types';

export type repoAndPaginationData =
  | {
      headers?: {
        link: string;
      };
      config?: {
        url: string;
      };
      data: repoDataType[];
    }
  | undefined;

export type getRepoApiProps = {
  userName: string;
  page?: number;
};
