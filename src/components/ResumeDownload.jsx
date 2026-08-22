import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import resume from '../documents/akshay.s.nair_fullstack_26.pdf';

// The file name the browser saves the download as.
export const RESUME_FILE_NAME = 'akshay.s.nair_fullstack_26.pdf';

// Downloading the resume is the only thing this control does. No permission
// prompt, no third party request, no analytics event.
const ResumeDownload = ({ label = 'Download resume', standalone = false }) => {
  const linkRef = useRef(null);
  const startedRef = useRef(false);

  // On the /resume route the file download starts without waiting for a click.
  // The guard keeps the double effect run under StrictMode to one download.
  useEffect(() => {
    if (!standalone || startedRef.current) return;
    startedRef.current = true;
    linkRef.current?.click();
  }, [standalone]);

  const control = (
    <Button
      ref={linkRef}
      component="a"
      href={resume}
      download={RESUME_FILE_NAME}
      variant="contained"
      endIcon={<PictureAsPdfOutlinedIcon />}
    >
      {label}
    </Button>
  );

  if (!standalone) return control;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h1">
        Resume
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        The download starts on its own. Use the button if nothing happens.
      </Typography>
      {control}
    </Box>
  );
};

export default ResumeDownload;
