export type paginationProps = {
  linkHeader: string;
  currentPage: number;
  paginationHandler: (direction: 'increment' | 'decrement') => void;
};
