import { branchDataType } from '@/app/[lang]/_components/commits/commit.types';

export type branchesAndPaginationData =
  | {
      headers?: {
        link: string;
      };
      config?: {
        url: string;
      };
      data: branchDataType[];
    }
  | undefined;

export type getBranchesApiProps = {
  owner: string;
  name: string;
  page?: number;
};
