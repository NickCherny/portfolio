import { GetValues } from "~/types/strapi";
import { TechnologyWithLogo } from "~/types/schema";

export type ProjectsProps = {
  items: (Omit<GetValues<"api::past-project.past-project">, "technology"> &
    Record<"technology", TechnologyWithLogo[]>)[];
};
