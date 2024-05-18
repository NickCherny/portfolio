import { ApiTechnologyTechnology } from "~/types/contentTypes";

type PastProjectTechnology = {
  name: string;
  logo: ApiTechnologyTechnology["attributes"]["logo"];
};

export type ProjectsProps = {
  items: PastProjectTechnology[] | undefined;
};
