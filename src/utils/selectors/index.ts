import { StrapiResponse } from "~/types/schema";

export const getEntity = <TEntity>(entity: StrapiResponse<TEntity>) =>
  entity.data.attributes;
