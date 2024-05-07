"use server";

import {
  StrapiResponse,
  DescriptionResponse,
  PastProjectsResponse,
} from "~/types/schema";

const apiHost = "http://localhost:1337";

const commonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

export async function getDescription() {
  const targetUrl = new URL("/api/description", apiHost);

  const res = await fetch(targetUrl, {
    headers: commonHeaders,
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch description");
  }

  return res.json() as Promise<StrapiResponse<DescriptionResponse>>;
}

export async function getPastProjects(): Promise<PastProjectsResponse> {
  const qParams = new URLSearchParams({
    populate: "technology",
  });
  const targetUrl = new URL(
    `/api/past-projects/?${qParams.toString()}`,
    apiHost
  );
  try {
    const res = await fetch(targetUrl, {
      headers: commonHeaders,
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch past projects");
    }

    return res.json() as Promise<PastProjectsResponse>;
  } catch (e) {
    console.log("Failed to fetch past projects");
    console.error(e);
    return { data: [] };
  }
}

export async function getTechnologies() {
  const qParams = new URLSearchParams();
  qParams.append("populate[0]", "logo");
  qParams.append("populate[1]", "logo.image");
  qParams.append("populate", "code");

  const technologies = await fetch(
    new URL(`/api/technologies/?${qParams.toString()}`, apiHost).toString(),
    {
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .catch(console.error);

  return technologies;
}
