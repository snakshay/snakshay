import { Button, Box, Grid } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ReactGA from 'react-ga';

import FadeIn from '../animation/FadeIn';
import {data} from '../data'
import resume from '../documents/Akshay Nair.pdf'
import profile from '../images/self2.jpg'

const Home = () => {

    const openPdf =() => {
        ReactGA.event({
            category: 'Button',
            action: 'Click',
            label: 'Resume',
          });
        window.open(resume);
    }
    return ( 
            <FadeIn>
                <div className="home">
                    <div className="content-wrapper">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <div className="profile-container">
                                    <img className="profile" src={profile} alt="Akshay Nair Software Engineer" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <span>Hello, I'm </span><br/>
                                <h1>{data.name}</h1>
                                <h2>{data.subHeader}</h2><br/>
                                <span>{data.intro} <a href={data.companyLink}> {data.companyName}</a></span>
                                <Box sx={{margin:"30px 0"}}>
                                    <Button  variant="contained" endIcon={<PictureAsPdfOutlinedIcon/>} color="secondary" onClick={()=>openPdf()}>Resume</Button>
                                </Box>
                            </Grid>
                            
                        </Grid>
                    </div> 
                </div>
            </FadeIn>
      
    );
}
 
export default Home;
