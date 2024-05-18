import { ApiTechnologyTechnology } from "~/types/contentTypes";
import { MetaImage } from "~/types/components";
import { APIResponse, APIResponseCollection, GetValues } from "~/types/strapi";
import { TechnologyWithLogo } from "~/types/schema";
import { Summary } from "~/features/summary";
import { Technology } from "~/features/Technology";
import { Projects } from "~/features/Projects";
import { Eductaions } from "~/features/Educations";
import { ContactInfo } from "~/features/Contact";
import {
  getDescription,
  getTechnologies,
  getPastProjects,
  getEducations,
  getContactInfo,
} from "~/utils/api";

// type HomeProps = {
//   pastProjects: APIResponseCollection<"api::past-project.past-project">;
//   technologies: APIResponseCollection<"api::technology.technology">;
//   description: APIResponse<"api::description.description">;
//   eductions: APIResponseCollection<"api::education.education">;
//   contactData: APIResponse<"api::contact.contact">;
// };

export default async function Home() {
  const description = await getDescription();
  const technologies = await getTechnologies();
  const pastProjects = await getPastProjects();
  const eductions = await getEducations();
  const contactData = await getContactInfo();
  const projects = pastProjects.data.map<
    Omit<GetValues<"api::past-project.past-project">, "technology"> &
      Record<"technology", TechnologyWithLogo[]>
  >(({ attributes }) => {
    return {
      ...attributes,
      technology:
        attributes?.technology?.map<TechnologyWithLogo>(({ name }) => {
          return {
            name,
            logo: technologies.data.find(
              ({ attributes }) => attributes?.code?.name === name
            )?.attributes?.logo,
          } as TechnologyWithLogo;
        }) ?? [],
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Summary
        title={description.data.attributes.title}
        content={description.data.attributes.description}
      />
      <Technology
        items={technologies}
        pastProjects={pastProjects.data.map(({ attributes }) => ({
          startDate: attributes.start_date as string,
          endDate: attributes.end_date as string,
          technologies: attributes?.technology?.map(
            ({ name }) => name
          ) as string[],
        }))}
      />
      <Projects items={projects} />
      <Eductaions items={eductions} />
      <ContactInfo data={contactData} />
    </main>
  );
}

// export async function getStaticProps() {
//   const description = await getDescription();
//   const technologies = await getTechnologies();
//   const pastProjects = await getPastProjects();
//   const eductions = await getEducations();
//   const contactData = await getContactInfo();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       description,
//       technologies,
//       pastProjects,
//       eductions,
//       contactData,
//     },
//   };
// }
