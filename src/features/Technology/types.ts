import { APIResponseData } from "~/types/strapi";

export type TechnologyCardProps = {
  data: APIResponseData<"api::technology.technology">;
};
