import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import TechIcon from "./TechIcon";

// The theme sizes, fills, and colours a chip, so nothing here restates that.
// The icon slot is the exception: MUI's small chip pins an 18 pixel box and a
// secondary text colour on `.MuiChip-icon`, and a mark reads better at the same
// size and colour as the label beside it. The margins close the gap the theme's
// 12 pixel label padding would otherwise double up on.
const CHIP_SX = {
  "& .MuiChip-icon": {
    color: "inherit",
    width: 16,
    height: 16,
    marginLeft: "10px",
    marginRight: "-4px",
  },
};

// Every project screenshot the build is allowed to emit is named here, once.
// The map is the whole point of this module: a dynamic `require` over
// `../images/${path}` compiles to a webpack context module across the entire
// folder, so the bundle absorbs every file sitting in `src/images` whether or
// not a component asks for it. Naming each asset with a static `import` keeps
// the emitted media limited to what is listed below.
//
// The map is empty because all three shipped projects carry `image: ''`. To add
// a project screenshot:
//   1. drop the file into `src/images`, for example `src/images/vcloud.png`
//   2. add its import above this block:
//        import vcloudScreenshot from "../images/vcloud.png";
//   3. add one entry here, keyed by whatever the store will name:
//        "vcloud.png": vcloudScreenshot,
//   4. set `image: 'vcloud.png'` on that project in `src/data.js`
// Anything not listed here resolves to an empty source, and the card renders
// without its media block.
const PROJECT_IMAGES = {};

// The entry names its own image as a key under `src/images`, which is what the
// store documents. An unknown or empty key returns an empty source instead of
// breaking the render.
export const resolveProjectImage = (path) => {
  if (!path) return "";

  // A key that is not an own entry of the map, including an inherited name such
  // as `constructor`, has to come back as an empty source, so the resolved value
  // is only returned when it is the asset URL string a static import produces.
  const asset = PROJECT_IMAGES[path];
  return typeof asset === "string" ? asset : "";
};

export default function ProjectCard({ project }) {
  const resolved = resolveProjectImage(project.image);

  // An image that resolves at build time can still fail to load in the
  // browser. The error handler drops the media block rather than leaving a
  // broken frame above the copy.
  const [imageFailed, setImageFailed] = React.useState(false);
  const showMedia = Boolean(resolved) && !imageFailed;

  return (
    <Card className="card">
      {showMedia && (
        <CardMedia
          component="img"
          height="140"
          image={resolved}
          alt={`${project.title} preview`}
          onError={() => setImageFailed(true)}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="h4">
          {project.title}
        </Typography>

        {(project.client || project.timeline) && (
          <Typography
            component="p"
            variant="body2"
            sx={{ color: "var(--text-secondary)", marginBottom: 1 }}
          >
            {[project.client, project.timeline].filter(Boolean).join(" | ")}
          </Typography>
        )}

        {project.summary && (
          <Typography component="p" variant="body2">
            {project.summary}
          </Typography>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <ul className="xp">
            {project.highlights.map((line) => (
              <li key={line}>
                <Typography component="span" variant="body2">
                  {line}
                </Typography>
              </li>
            ))}
          </ul>
        )}

        {/* The technology list stays array driven, so an added entry renders an
            added chip with its own mark. `TechIcon` normalises the store label
            itself, so `React 18` and `CSS and SASS` need no lookup table here,
            and a name with no brand mark gets the neutral fallback rather than
            a gap. The marks stay on `currentColor`: this is the densest icon
            row on the page, brand hex would ignore the colour mode, and the
            chips wrap onto several lines at 320 pixels. */}
        {project.tech && project.tech.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ marginTop: 2 }}
          >
            {project.tech.map((item) => (
              <Chip
                key={item}
                label={item}
                icon={<TechIcon name={item} size={16} />}
                size="small"
                variant="outlined"
                sx={CHIP_SX}
              />
            ))}
          </Stack>
        )}
      </CardContent>

      {(project.link || project.repo || project.note) && (
        <CardActions>
          {/* Client work carries no public URL, so both controls stay tied to
              their field being non empty. */}
          {project.link && (
            <IconButton
              aria-label={`View ${project.title} live`}
              color="primary"
              component="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <VisibilityIcon />
            </IconButton>
          )}

          {project.repo && (
            <IconButton
              aria-label={`View the ${project.title} repository`}
              color="primary"
              component="a"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          )}

          {project.note && (
            <Tooltip
              title={project.note}
              leaveTouchDelay={3000}
              enterTouchDelay={0}
            >
              <IconButton aria-label={`About ${project.title}`} color="primary">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      )}
    </Card>
  );
}
