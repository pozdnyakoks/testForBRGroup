export default function decode(str: string) {
  let txt = new DOMParser().parseFromString(str, 'text/html');
  return txt.documentElement.textContent;
}
