export type IImage = {
  id: string;
  url: string;
  description: string;

  width: number;
  height: number;
  blurHash: string;
};

export type IImagesResponse = {
  images?: IImage[];
};

export type ITagsResponse = {
  tags?: string[];
};
