export default function getTime(time: number) {
  // console.log(new Date(time * 1000));
  const diff = Date.now() - time * 1000;
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  if (days > 1) {
    return days === 1 ? `${days} day` : `${days} days`;
  } else if (hours < 24 && hours > 0) {
    return hours === 1 ? `${hours} hour` : `${hours} hours`;
  } else {
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  }
}
