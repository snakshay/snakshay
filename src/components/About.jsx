import { Grid, Typography } from "@mui/material";
import { data } from "../data";
import SectionHeader from "./SectionHeader";

const About = () => {
    return ( 
        <>
            <div id="About" className="section about">
                <SectionHeader name=" About "/>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                    <Typography variant="h7" component="span" dangerouslySetInnerHTML={{__html: data.aboutMe }} ></Typography>
                    </Grid>
                </Grid>
            </div> 
        </>
    )
}
 
export default About;