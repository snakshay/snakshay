import { Grid } from "@mui/material";

import FadeIn from "../animation/FadeIn";
import { data } from "../data";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

const Projects = () => {
    return ( 
        <div id="Projects" className="home projects">
            <div className="content-wrapper">
                <SectionHeader name="Projects"/>
                <Grid container spacing={2}>
                    {data.projects.map(e => (
                        <Grid item xs={12}  lg={4} xl={3} key={e.id} className="project-card">
                                <FadeIn>
                                    <ProjectCard project={e} />
                                </FadeIn> 
                        </Grid>
                    ))}

                </Grid>
            </div>
        </div> 
    );
}
 
export default Projects;