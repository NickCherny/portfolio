import { Summary } from "~/features/summary";
import { TechnologyChart } from "~/features/Technology";
import { Projects } from "~/features/Projects";
import { PastProject, StrapiData, Technology, WithImage } from "~/types/schema";
import { getDescription, getTechnologies, getPastProjects } from "~/utils/api";

export default async function Home() {
  const description = await getDescription();
  const technologies = await getTechnologies();
  const pastProjects = await getPastProjects();

  const projects = pastProjects.data.map(
    ({ attributes }: StrapiData<PastProject>) => {
      return {
        ...attributes,
        technology: attributes.technology.map(({ name }) => {
          return {
            id: name,
            name,
            logo: technologies.data.find(
              ({ attributes }: StrapiData<Technology>) =>
                attributes.code.name === name
            )?.attributes.logo,
          };
        }),
      };
    }
  );

  return (
    <main className="container flex min-h-screen flex-col items-center justify-between">
      <Summary
        title={description.data.attributes.title}
        content={description.data.attributes.description}
      />
      <TechnologyChart
        items={technologies}
        pastProjects={pastProjects.data.map(
          ({ attributes }: StrapiData<PastProject>) => ({
            startDate: attributes.start_date,
            endDate: attributes.end_date,
            technologies: attributes.technology.map(({ name }) => name),
          })
        )}
      />
      <Projects items={projects} />
    </main>
  );
}
