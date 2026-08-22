import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

import { data } from "../data";
import SectionHeader from "./SectionHeader";

const { contact } = data;

// The store holds `icon` as a plain string so `data.js` stays free of JSX. The
// mapping lives here, and an icon name with no entry falls back to a generic
// link glyph rather than rendering nothing or throwing.
const ICONS = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailOutlineRoundedIcon,
  location: LocationOnOutlinedIcon,
};

export const iconForName = (name) =>
  ICONS[String(name || "").toLowerCase()] || LanguageOutlinedIcon;

const Contact = () => {
  const links = contact.links || [];

  return (
    <div className="home">
      <div className="content-wrapper">
        <SectionHeader name="Contact" />

        {/* The availability line is a single store string. An empty string
            drops the line and leaves the rest of the section intact, which is
            how the owner retires it after an offer. */}
        {contact.availability && (
          <Typography
            component="p"
            sx={{ marginBottom: 3, color: "var(--text-secondary)" }}
          >
            {contact.availability}
          </Typography>
        )}

        <Stack spacing={2} alignItems="flex-start">
          {contact.location && (
            <Typography
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "var(--text-primary)",
                overflowWrap: "anywhere",
              }}
            >
              <LocationOnOutlinedIcon aria-hidden="true" fontSize="small" />
              {contact.location}
            </Typography>
          )}

          {/* One address, from one field, rendered once as the only mailto on
              the page. `mailto:` stays in the same browsing context, so it
              takes no target and no rel. */}
          {contact.email && (
            <Button
              component="a"
              href={`mailto:${contact.email}`}
              startIcon={<MailOutlineRoundedIcon />}
              sx={{
                paddingLeft: 0,
                color: "var(--accent)",
                textTransform: "none",
                overflowWrap: "anywhere",
              }}
            >
              {contact.email}
            </Button>
          )}
        </Stack>

        {/* One control per `links` entry, so a third channel in the store
            renders a third control with no change here. */}
        {links.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={{ marginTop: 3 }}
          >
            {links.map((link) => {
              const Icon = iconForName(link.icon);

              return (
                <Button
                  key={link.id}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<Icon />}
                  sx={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    textTransform: "none",
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Contact;
