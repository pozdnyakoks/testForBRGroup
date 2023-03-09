import { Item } from './interfaces';

// export async function getData(arr, set) {
//   try {
//     const response = await fetch(
//       'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/'
//     );
//     const news = await response.json();

//     const promises = await Promise.all(
//       news.slice(0, 100).map(async (arr: Item) => {
//         const response = await fetch(
//           `https://hacker-news.firebaseio.com/v0/item/${newsItem}.json?print=pretty`
//         );
//         const data = await response.json();
//         return data;
//       })
//     );
//     set(promises);
//   } catch (error) {
//     console.error(error);
//   }
// }
