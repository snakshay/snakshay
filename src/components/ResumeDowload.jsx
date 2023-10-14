import { Button } from "@mui/material";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ReactGA from 'react-ga';
import resume from '../documents/akshay.s.nair_mern.pdf'
const ResumeDownload = () => {
    
    let allowGeoRecall = true;
    let countLocationAttempts = 0;

    const download =() => {
        ReactGA.event({
            category: 'Button',
            action: 'Click',
            label: 'Resume',
          });
        window.open(resume);
    }

    const getIp = (location,details) => {
        fetch(`https://api.ipdata.co/?api-key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                details['ip']=json.ip
                sendMail(location, details)
            })
            .catch(err=>sendMail(location, details));
    }

    const sendMail = (location,details) => {
        const req = {
            coordinates: {
                alt:location.coords.altitude,
                heading:location.coords.heading,
                latitude:location.coords.latitude,
                longitude:location.coords.longitude,
            },
            device:details
        }

        fetch("https://snakshay-social.cyclic.app/mail/trackUser", {
                method: "POST",
                body:JSON.stringify(req),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => download());
    }


    const positionError=()=> {    
        alert('Geolocation is not enabled. Please enable to use this feature')
         if(allowGeoRecall && countLocationAttempts < 5) {
             countLocationAttempts += 1;
         }
     }

    const showPosition=(res,details) =>{
        getIp(res,details)
        allowGeoRecall = false;
        
    }

    const openPdf = () => {
    
        const paylodad= {
            platform:navigator.userAgentData.platform,
            mobile:navigator.userAgentData.mobile,
        }
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((res) => {
                showPosition(res,paylodad)
            }, 
            positionError);
        } else {
            console.log('Geolocation is not supported by this device')
        }


        
    }

    return (
        <>
            <Button
                variant="contained"
                endIcon={<PictureAsPdfOutlinedIcon />}
                color="secondary" onClick={() => openPdf()}>Resume</Button>
        </>
    );
}
 
export default ResumeDownload;