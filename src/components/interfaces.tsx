export interface Item {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  text: string;
  title: string;
  type: string;
}

export interface Kid {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
