export function formatDate(isoDate: string, text: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const week = Math.floor(day / 7);

  const format = (n: number, unit: string) => `${text} ${n} ${unit}${n !== 1 ? 's' : ''} ago`;

  if (sec < 60) return format(sec, 'second');
  if (min < 60) return format(min, 'minute');
  if (hr < 24) return format(hr, 'hour');
  if (day < 7) return format(day, 'day');
  if (week < 4) return format(week, 'week');

  return `${text} on ${new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })}`;
}
