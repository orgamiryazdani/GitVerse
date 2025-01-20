export function formatDate(isoDate: string, text: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffInMs: number = now.getTime() - date.getTime();
  const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) return `${text} ${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks: number = Math.floor(diffInDays / 7);
    return `${text} ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };

  return `${text} on ${date.toLocaleDateString('en-US', options)}`;
}
