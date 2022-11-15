export type IImage = {
  id: string;
  url: string;
  description: string;

  width: number;
  height: number;

  // tags: string[];
};

export type IImagesResponse = {
  images?: IImage[];
  total?: number;
};
