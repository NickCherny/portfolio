import { GetValues } from "~/types/strapi";
import { TechnologyWithLogo } from "~/types/schema";

export type ProjectDetailsProps = {
  data: Omit<GetValues<"api::past-project.past-project">, "technology"> &
    Record<"technology", TechnologyWithLogo[]>;
};

export type ListOfTechnologyProps = {
  items: TechnologyWithLogo[];
};
