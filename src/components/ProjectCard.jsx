import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';


import social from '../images/social.png';
import chat from '../images/chat1.png';
import shop from '../images/shop.png';
import theme from '../images/theme.png';
import todo from '../images/todo.png';

const imgMap = {
  0:social,
  1:chat,
  2:shop,
  3:theme,
  4:todo
}
export default function ProjectCard({project}) {

  const navigate = (link) => {
    window.location.href = link
  }
  return (
 
      <Card sx={{ maxWidth: 345 }}  className="card" >
          {imgMap[project.id] && 
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={imgMap[project.id]}
            />
          }
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" >
                {project.about}
              </Typography>
          </CardContent>
          <CardActions>
          {project.gitHub && 
            <IconButton aria-label="code" color="primary" onClick={() => navigate(project.gitHub)}>
              <GitHubIcon />
            </IconButton>
          }
          {
            project.link &&
            <IconButton aria-label="live" color="primary" onClick={() => navigate(project.link)}>
              <VisibilityIcon />
            </IconButton>
          }
          {
            project.code && 
            <Tooltip title={project.code} leaveTouchDelay={3000} enterTouchDelay={0}>
                <IconButton  color="primary">
                  <CodeOutlinedIcon/>
                </IconButton>
              </Tooltip>
          }
          {project.info && 
            <Tooltip title={project.info} leaveTouchDelay={3000} enterTouchDelay={0}>
              <IconButton  color="primary" >
                <InfoOutlinedIcon/>
              </IconButton>
            </Tooltip>
          }
          </CardActions>
      </Card>

  );
}