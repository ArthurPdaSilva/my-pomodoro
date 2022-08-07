export function FormattedTime(time: number): string {
  const min = zeroLeft((time / 60) % 60);
  const sec = zeroLeft((time % 60) % 60);
  return `${min}:${sec}`;
}

function zeroLeft(time: number): string {
  return Math.floor(time).toString().padStart(2, '0');
}
