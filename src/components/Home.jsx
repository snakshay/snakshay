import About from "./About";
import Projects from "./Projects";
import {data} from '../data'
import { Button, Box, Grid } from "@mui/material";

const Home = () => {
    return ( 
        <>   
            <div className="home">
                <div className="content-wrapper">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            image here
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <span>Hello, I'm </span><br/>
                            <h1>{data.name}</h1>
                            <h2>{data.subHeader}</h2><br/>
                            <span>{data.intro} <a href={data.companyLink}> {data.companyName}</a></span>
                            <Box sx={{margin:"30px 0"}}>
                                <Button  variant="outlined" color="success">Contact Me</Button>
                            </Box>
                        </Grid>
                        
                    </Grid>
                </div> 
            </div>
        </>
    );
}
 
export default Home;