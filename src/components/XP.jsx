import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

import { data } from "../data";
import SectionHeader from "./SectionHeader";

const { roles, education, certifications, awards } = data.experience;

// The store decides which entries start open, so the initial disclosure state
// is derived from the data rather than written here. A role with no `expanded`
// field starts closed.
const initialExpanded = roles.map((role) => Boolean(role.expanded));

// Award years are an array so an existing award can pick up another year with
// no component change. An empty array renders the issuer on its own.
const issuerLine = (issuer, years) =>
  years && years.length > 0 ? `${issuer}, ${years.join(" and ")}` : issuer;

// The three closing blocks sit side by side in one grid row, so a mark on each
// heading gives the eye somewhere to land when scanning across them. The marks
// are decorative: the heading text next to them already names the block, and
// MUI's SvgIcon is `aria-hidden` by default, so a screen reader hears the
// heading once. No technology string lives in this section, so these come from
// the icon set already installed rather than from `TechIcon`.
const BlockHeading = ({ icon: Icon, children }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    sx={{ marginBottom: 1 }}
  >
    <Icon fontSize="small" sx={{ color: "var(--accent)" }} />
    <Typography component="h4" sx={{ fontWeight: 700 }}>
      {children}
    </Typography>
  </Stack>
);

const XP = () => {
  const [expanded, setExpanded] = useState(initialExpanded);

  // Each entry toggles independently, so opening one role leaves the others
  // where the visitor left them.
  const toggle = (index) =>
    setExpanded((current) =>
      current.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );

  return (
    <div className="home xp">
      <div className="content-wrapper">
        <SectionHeader name="Experience" />

        {roles.length > 0 && (
          <Timeline
            sx={{
              padding: 0,
              [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.3 },
            }}
          >
            {roles.map((role, index) => (
              <TimelineItem key={role.id}>
                <TimelineOppositeContent
                  sx={{ color: "var(--text-secondary)", paddingTop: 2.5 }}
                >
                  {role.timeline}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  {/* The current role reads as a filled dot, which keeps the
                      distinction visual instead of adding a label with no
                      store field behind it. */}
                  <TimelineDot
                    variant={role.current ? "filled" : "outlined"}
                    sx={{
                      borderColor: "var(--accent)",
                      backgroundColor: role.current
                        ? "var(--accent)"
                        : "transparent",
                    }}
                  />
                  <TimelineConnector
                    sx={{ backgroundColor: "var(--border)" }}
                  />
                </TimelineSeparator>

                <TimelineContent sx={{ paddingBottom: 4 }}>
                  {/* MUI's Accordion summary is a native button, so the entry
                      is reachable by Tab and activated by Enter or Space, and
                      the global :focus-visible ring shows on it. Surface,
                      outline, radius, the expanded border, the summary hover,
                      and the `::before` hairline reset all come from the
                      theme's accordion defaults. */}
                  <Accordion
                    expanded={expanded[index]}
                    onChange={() => toggle(index)}
                    disableGutters
                    square={false}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon sx={{ color: "var(--accent)" }} />
                      }
                      id={`${role.id}-header`}
                      aria-controls={`${role.id}-content`}
                    >
                      <Box>
                        <Typography component="h4" sx={{ fontWeight: 700 }}>
                          {role.title}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ color: "var(--text-secondary)" }}
                        >
                          {role.at}
                        </Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                      {/* Levels sit above the highlights, and the block is
                          skipped entirely for the roles that have none. */}
                      {role.levels?.length > 0 && (
                        <Box component="ul" sx={{ marginTop: 0, paddingLeft: 3 }}>
                          {role.levels.map((level) => (
                            <Box component="li" key={level.label}>
                              <Typography component="span" sx={{ fontWeight: 700 }}>
                                {level.label}
                              </Typography>
                              <Typography
                                component="span"
                                sx={{ color: "var(--text-secondary)" }}
                              >
                                {` ${level.timeline}`}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}

                      {role.highlights?.length > 0 && (
                        <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
                          {role.highlights.map((highlight) => (
                            <Box component="li" key={highlight}>
                              <Typography component="span">
                                {highlight}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {/* Education, certifications, and awards close the section, below the
            timeline. Each block is skipped when the store has nothing for it. */}
        <Grid container spacing={4} sx={{ marginTop: 1 }}>
          {education && (
            <Grid item xs={12} md={4}>
              <BlockHeading icon={SchoolRounded}>Education</BlockHeading>
              <Typography component="p">{education.degree}</Typography>
              <Typography component="p" sx={{ color: "var(--text-secondary)" }}>
                {education.institution}
              </Typography>
              <Typography component="p" sx={{ color: "var(--text-secondary)" }}>
                {education.timeline}
              </Typography>
              <Typography component="p">{education.score}</Typography>
            </Grid>
          )}

          {certifications.length > 0 && (
            <Grid item xs={12} md={4}>
              <BlockHeading icon={WorkspacePremiumRounded}>
                Certifications
              </BlockHeading>
              <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
                {certifications.map((certification) => (
                  <Box component="li" key={certification.id}>
                    <Typography component="span">
                      {certification.name}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {` ${certification.issuer}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          {awards.length > 0 && (
            <Grid item xs={12} md={4}>
              <BlockHeading icon={EmojiEventsRounded}>Awards</BlockHeading>
              <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
                {awards.map((award) => (
                  <Box component="li" key={award.id}>
                    <Typography component="span">{award.name}</Typography>
                    <Typography
                      component="span"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {` ${issuerLine(award.issuer, award.years)}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default XP;
