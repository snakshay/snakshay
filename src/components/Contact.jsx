import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { data } from '../data';
import FadeIn from '../animation/FadeIn';


const Contact = () => {
    return (
            <FadeIn>
                <div className='home contact ' id="Contact">
                    <div className="contact-margin contact-info-container">
                        <span className="contact-info"><LocationOnOutlinedIcon/>{data.contact.location}</span><br/>
                        <span  className="contact-info"><LocalPhoneOutlinedIcon/>{data.contact.phone}</span><br/>
                        <span  className="contact-info"><MailOutlineRoundedIcon/>{data.contact.email}</span><br/>
                    </div>
                    <div className="contact-margin">
                        Also reach me out at: <br/>
                        <div className="contact-links">
                            <a href={data.contact.instagram}>
                                <InstagramIcon/>
                            </a>
                            <a href={data.contact.linkedin}>
                                <LinkedInIcon/>
                            </a>
                            <a href={data.contact.gitHub}>
                                <GitHubIcon/>
                            </a>
                        </div>
                    </div>
                </div>
            </FadeIn>
     );
}
 
export default Contact;