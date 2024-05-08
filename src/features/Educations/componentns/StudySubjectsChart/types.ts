import { APIResponseCollection } from "~/types/strapi";

export type InstitutionPalette = {
  backgroundColor: string;
};

export type StudySubjectsChartProps = {
  items: APIResponseCollection<"api::education.education">;
};
