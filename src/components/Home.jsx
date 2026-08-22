import { scroller } from "react-scroll";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { data } from "../data";
import profile from "../images/Akshay.jpg";
import ResumeDownload from "./ResumeDownload";
import TechIcon from "./TechIcon";

const { hero, meta } = data;

// Same chip icon slot rule the project and agent cards settled on. MUI pins a
// box size and a secondary text colour on `.MuiChip-icon`, and a mark reads
// better at the size and colour of the label beside it. These chips are full
// size rather than small, so the box is 18 rather than 16 and the left margin
// matches the theme's 12 pixel label padding. Sizing and inheritance only, so
// the theme still owns the fill, the outline, and the radius.
const CHIP_SX = {
  "& .MuiChip-icon": {
    color: "inherit",
    width: 18,
    height: 18,
    marginLeft: "12px",
    marginRight: "-4px",
  },
};

// The target section id comes from the store, and react-scroll resolves it
// against the rendered section, so the hero never hardcodes where Contact sits.
const scrollToContact = () =>
  scroller.scrollTo(hero.contactTarget, {
    smooth: true,
    offset: -100,
    duration: 500,
  });

const Home = () => (
  <div className="home">
    <div className="content-wrapper">
      <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
        {/* The photo caps at 310 pixels in the stylesheet, so a five column
            share of the 1120 pixel measure left it floating in slack while the
            headline and summary wrapped early beside it. Four and eight puts
            the width where the reading is. */}
        <Grid item xs={12} md={4}>
          <div className="profile-container">
            <img
              className="profile"
              src={profile}
              alt={`${meta.name}, ${meta.role} at ${meta.company.name}`}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* The greeting is an eyebrow line, so it takes the theme's overline
              treatment rather than a hand set weight. */}
          <Typography
            variant="overline"
            component="p"
            sx={{ color: "var(--text-secondary)" }}
          >
            {hero.greeting}
          </Typography>

          <Typography variant="h1" component="h1">
            {meta.name}
          </Typography>

          {/* The headline is a full sentence, so it reads at h3 size under the
              name. At h2 size it competed with the name and wrapped to four
              lines on a phone. The element stays an `h2` for the outline. */}
          <Typography variant="h3" component="h2" sx={{ marginTop: 1.5 }}>
            {hero.headline}
          </Typography>

          {/* The headline names the same three technologies in prose. The chips
              repeat them on purpose: they are the scannable version for a
              reader who skims, and they keep `hero.focus` array driven, so a
              fourth entry renders a fourth chip with no component change. The
              mark is decorative and the label carries the name. */}
          {hero.focus.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ marginTop: 2.5 }}
            >
              {hero.focus.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  icon={<TechIcon name={item} size={18} />}
                  sx={CHIP_SX}
                />
              ))}
            </Stack>
          )}

          {/* A measure cap keeps the summary near 60 characters a line on a
              wide screen, which is where a full width paragraph stops being
              readable. */}
          <Typography
            component="p"
            sx={{
              marginTop: 2.5,
              maxWidth: "62ch",
              color: "var(--text-secondary)",
            }}
          >
            {hero.summary}
          </Typography>

          {/* react-scroll drives the smooth scroll and the offset clears the
              fixed bar. The control stays a native button, so Enter and Space
              reach it the same way a pointer does. */}
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={{ marginTop: 4 }}
          >
            <ResumeDownload label={hero.resumeLabel} />

            <Button onClick={scrollToContact} variant="outlined">
              {hero.contactLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default Home;
