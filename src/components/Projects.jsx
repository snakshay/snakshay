import { Grid } from "@mui/material";
import { data } from "../data";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";



const Projects = () => {
    return ( 
        <div id="Projects" className="section projects">
             <SectionHeader name=" Projects "/>
             <Grid container spacing={2}>
                {data.projects.map(e => (
                    <Grid item xs={12} md={4} lg={4} xl={3} key={e.id}>
                        <ProjectCard project={e}/>
                    </Grid>
                ))}

             </Grid>

            
        </div> 
    );
}
 
export default Projects;