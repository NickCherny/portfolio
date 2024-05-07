import { FC } from "react";
import { ProjectsProps } from "./types";

import { ProjectDetails } from "./componentns/ProjectDetails";

export const Projects: FC<ProjectsProps> = ({ items }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-medium mb-6">Past projects</h2>
      {items.map((project) => {
        return <ProjectDetails key={`${project.title}`} data={project} />;
      })}
    </div>
  );
};
