
export interface BrandsRes {
  results: number;
  metadata: Metadata;
  data: brands[];
}

export interface brands {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
/////////////////////////////////////////////

export interface specificBrand {
  data: Data;
}

export interface Data {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}