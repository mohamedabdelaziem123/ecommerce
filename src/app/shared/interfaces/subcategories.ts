
export interface Subcategories {
  results: number;
  metadata: Metadata;
  data: subData[];
}

export interface subData {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}