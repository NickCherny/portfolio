type StrapiData<T> = {
  id: number;
  attributes: T;
};

type StrapiArrayData<T> = { id: number; attributes: T }[];

export type StrapiResponse<T> = {
  data: T extends Array ? StrapiArrayData<T[0]> : StrapiData<T>;
};

type ImageEntity = {
  name: string;
  alternativeText: string | null;
  url: string;
};

export type DescriptionResponse = {
  title: string;
  description: string;
};

export type PastProject = {
  company: string;
  description: string;
  start_date: string;
  end_date: string | null;
  title: string;
  content: string;
  company_url: string | null;
  technology: {
    id: number;
    name: string;
  }[];
};

export type PastProjectsResponse = StrapiResponse<PastProject[]>;

export type Technology = {
  copy: string;
  info: string;
  level: number;
  start_date: string | null;
  end_date: string | null;
  code: {
    name: string;
  };
  logo: {
    alt: string;
    image: StrapiResponse<ImageEntity>;
  };
};

export type GetListOfTechnologiesResponse = StrapiResponse<Technology[]>;

export type WithImage<T> = T & {
  id: number;
  alt: string;
  image: StrapiData<{
    url: string;
    name: string;
    height: number;
    width: number;
  }>;
};
