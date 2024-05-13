import { ApiTechnologyTechnology } from "~/types/contentTypes";
import { Summary } from "~/features/summary";
import { TechnologyChart } from "~/features/Technology";
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

export default async function Home() {
  const description = await getDescription();
  const technologies = await getTechnologies();
  const pastProjects = await getPastProjects();
  const eductions = await getEducations();
  const contactData = await getContactInfo();

  const projects = pastProjects.data.map(({ attributes }) => {
    return {
      ...attributes,
      technology: attributes?.technology?.map(({ name }) => {
        return {
          name: name as string,
          logo: technologies.data.find(
            ({ attributes }) => attributes?.code?.name === name
          )?.attributes?.logo as
            | ApiTechnologyTechnology["attributes"]["logo"]
            | undefined,
        };
      }),
    };
  });

  return (
    <main className="container flex min-h-screen flex-col items-center justify-between">
      <Summary
        title={description.data.attributes.title}
        content={description.data.attributes.description}
      />
      <TechnologyChart
        items={technologies}
        pastProjects={pastProjects.data.map(({ attributes }) => ({
          startDate: attributes.start_date as string,
          endDate: attributes.end_date as string,
          technologies: attributes?.technology?.map(
            ({ name }) => name
          ) as string[],
        }))}
      />
      <Projects items={projects as any} />
      <Eductaions items={eductions} />
      <ContactInfo data={contactData} />
    </main>
  );
}
