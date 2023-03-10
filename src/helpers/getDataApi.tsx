export default async function getDataApi(id: number) {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  const data = await response.json();
  return data;
}
