export type branchesProps = {
  selectedRepo: {
    owner: string;
    name: string;
  };
  filterHandler: (sha: string) => void;
};
