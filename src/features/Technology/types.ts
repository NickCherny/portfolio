import { APIResponseCollection } from "~/types/strapi";

type PastProjectsTechnology = {
  startDate: string;
  endDate: string;
  technologies: string[];
};

export type TechnologyProps = {
  items: APIResponseCollection<"api::technology.technology">;
  pastProjects: PastProjectsTechnology[];
};
