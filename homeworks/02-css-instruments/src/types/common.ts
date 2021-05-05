export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { small: string; };
  // eslint-disable-next-line camelcase
  alt_description: string;
};
