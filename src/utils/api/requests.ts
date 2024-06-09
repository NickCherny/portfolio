import { APIResponse, APIResponseCollection } from "~/types/strapi";

const apiHost = "http://localhost:1337";

const commonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

export async function getDescription(): Promise<
  APIResponse<"api::description.description">
> {
  const targetUrl = new URL("/api/description", apiHost);

  const res = await fetch(targetUrl, {
    headers: commonHeaders,
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch description");
  }

  return res.json();
}

export async function getPastProjects(): Promise<
  APIResponseCollection<"api::past-project.past-project">
> {
  const qParams = new URLSearchParams({
    populate: "technology",
  });
  const targetUrl = new URL(
    `/api/past-projects/?${qParams.toString()}`,
    apiHost
  );
  const res = await fetch(targetUrl, {
    headers: commonHeaders,
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch past projects");
  }

  return res.json();
}

export async function getTechnologies(): Promise<
  APIResponseCollection<"api::technology.technology">
> {
  const qParams = new URLSearchParams();
  qParams.append("populate[0]", "logo");
  qParams.append("populate[1]", "logo.image");
  qParams.append("populate", "code");

  const res = await fetch(
    new URL(`/api/technologies/?${qParams.toString()}`, apiHost).toString(),
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch technologies");
  }

  return res.json();
}

export async function getEducations(): Promise<
  APIResponseCollection<"api::education.education">
> {
  const qParams = new URLSearchParams();
  qParams.append("populate", "subject");

  const res = await fetch(
    new URL(`/api/educations?${qParams.toString()}`, apiHost).toString(),
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch educations");
  }

  return await res.json();
}

export async function getContactInfo(): Promise<
  APIResponse<"api::contact.contact">
> {
  const qParams = new URLSearchParams();
  qParams.append("populate", "social");

  const res = await fetch(
    new URL(`/api/contact?${qParams.toString()}`, apiHost).toString(),
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contact info");
  }

  return await res.json();
}
