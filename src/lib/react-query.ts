import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { Problem } from '../types/http-errors.interface';
import toast from 'react-hot-toast';

function isProblem(error: unknown): error is Problem {
  return (error as Problem).detail !== undefined;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isProblem(error)) {
        toast.error(error?.detail as string);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      toast.error(error as Problem);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
