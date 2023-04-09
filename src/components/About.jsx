import { Grid, Typography } from "@mui/material";

import { data } from "../data";
import SectionHeader from "./SectionHeader";
import FadeIn from "../animation/FadeIn";
const About = () => {
    return ( 
        <>
            <div id="About" className="home about">
                <div className="content-wrapper">
                    <SectionHeader name="About"/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <FadeIn>
                                <Typography variant="h7" component="span" dangerouslySetInnerHTML={{__html: data.aboutMe }} ></Typography>
                            </FadeIn>
                        </Grid>
                    </Grid>
                </div>
            </div> 
        </>
    )
}
 
export default About;