import { APIResponse } from "~/types/strapi";

export type ContactProps = {
  data: APIResponse<"api::contact.contact">;
};
