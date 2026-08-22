import Grid from "@mui/material/Grid";

import FadeIn from "../animation/FadeIn";
import { data } from "../data";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

const Projects = () => {
  const projects = data.projects || [];

  // An empty array takes the whole section with it, heading included, rather
  // than leaving a titled gap on the page.
  if (projects.length === 0) return null;

  return (
    <div className="home projects">
      <div className="content-wrapper">
        <SectionHeader name="Projects" />
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={project.id}
              className="project-card"
            >
              <FadeIn>
                <ProjectCard project={project} />
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Projects;
