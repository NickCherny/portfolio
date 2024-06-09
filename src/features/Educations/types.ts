import { APIResponseCollection } from "~/types/strapi";

export type EducationsProps = {
  items: APIResponseCollection<"api::education.education">;
};
