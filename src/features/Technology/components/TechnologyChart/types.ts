import { APIResponseCollection, APIResponseData } from "~/types/strapi";

type PastProjectsTechnology = {
  startDate: string;
  endDate: string;
  technologies: string[];
};

export type TechnologyChartProps = {
  items: APIResponseCollection<"api::technology.technology">;
  pastProjects: PastProjectsTechnology[];
};

export type ItemData = APIResponseData<"api::technology.technology">;
