export const asRelativeTime = (timestamp: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsElapsed = currentTimestamp - timestamp;

  if (secondsElapsed < 60) {
    return `${secondsElapsed} seconds ago`;
  } else if (secondsElapsed < 3600) {
    const minutes = Math.floor(secondsElapsed / 60);
    return `${minutes} minutes ago`;
  } else if (secondsElapsed < 86400) {
    const hours = Math.floor(secondsElapsed / 3600);
    return `${hours} hours ago`;
  } else if (secondsElapsed < 2592000) {
    const days = Math.floor(secondsElapsed / 86400);
    return `${days} days ago`;
  } else {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
};
export const asFutureTime = (timestamp: number) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsRemaining = timestamp - currentTimestamp;

  if (secondsRemaining < 86400) {
    return `${Math.round(secondsRemaining / 3600)} hours left`;
  } else {
    const daysRemaining = Math.ceil(secondsRemaining / 86400);
    return `${daysRemaining} days left`;
  }
};
