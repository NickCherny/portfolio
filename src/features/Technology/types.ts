import { PastProject, GetListOfTechnologiesResponse } from "~/types/schema";

type PastProjectsTechnology = {
  startDate: string;
  endDate: string;
  technologies: string[];
};

export type TechnologyProps = {
  items: GetListOfTechnologiesResponse;
  pastProjects: PastProjectsTechnology[];
};
