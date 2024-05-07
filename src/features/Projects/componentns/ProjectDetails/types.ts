import { PastProject, Technology, WithImage } from "~/types/schema";

export type ProjectDetailsProps = {
  data: PastProject;
};

export type ListOfTechnologyProps = {
  items: WithImage<Technology>[];
};
