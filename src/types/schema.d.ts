import { MetaImage } from "./components";
import { ApiTechnologyTechnology } from "./contentTypes";
import { GetValue } from "./strapi";

export type TechnologyWithLogo = {
  name: string;
  logo: GetValue<ApiTechnologyTechnology["attributes"]>["logo"];
};
