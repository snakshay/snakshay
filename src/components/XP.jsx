import { useState } from "react";
import { data } from "../data";
import SectionHeader from "./SectionHeader";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Timeline from '@mui/lab/Timeline';

const defaultAccordions = data.xp.map(e=>e.expanded)

const XP = () => {

    const [expanded, setExpanded] = useState(defaultAccordions);

    const accordionHandler = (index) =>{
        let data = [...expanded];
        data[index]=!data[index];
        setExpanded(data)
    }
    return (
        <div id="Experience" className="section xp">
            <SectionHeader name=" Experience " />
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                    },
                }}
                >
                {data.xp.map((e,index) => (

                    <TimelineItem key ={e.id}>
                        <TimelineOppositeContent>
                        {e.timeline}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                        <TimelineDot  variant="outlined" color="secondary" />
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Accordion sx={{ backgroundColor: 'transparent', color: 'white' }}  expanded={expanded[index]} key={e.id}>
                                <AccordionSummary
                                    onClick={()=>accordionHandler(index)}
                                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header" 
                                >
                                    <Typography><b>{e.title} @ {e.at}</b></Typography>
                                    
                                </AccordionSummary>
                                <AccordionDetails>
                                    {e.about?.map((abt,i) => (
                                        <Typography key={i} className="about-xp" >
                                            <PlayArrowRoundedIcon  fontSize="small"/>
                                            {abt}
                                        </Typography>
                                    ))}
                        
                                
                                </AccordionDetails>
                            </Accordion>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
}

export default XP;