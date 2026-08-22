import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { data } from "../data";
import SectionHeader from "./SectionHeader";
import TechIcon from "./TechIcon";

const { about } = data;

const About = () => {
  // An empty paragraph array takes the whole section out, heading included,
  // and leaves every other section alone.
  if (about.paragraphs.length === 0) {
    return null;
  }

  return (
    <div className="home about">
      <div className="content-wrapper">
        <SectionHeader name="About" />

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {/* One paragraph element per store entry, rendered as JSX children.
                Markup inside a store string appears as literal characters, so
                no raw HTML injection path exists here. */}
            {about.paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                component="p"
                sx={{ marginBottom: 2, color: "var(--text-secondary)" }}
              >
                {paragraph}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={5}>
            {/* Every group in the store renders, and a new group or a new item
                needs no change here. */}
            <Stack spacing={3}>
              {about.skills.map((group) => (
                <Box key={group.group}>
                  {/* The four group names are categories rather than products,
                      so they carry no mark. The theme's overline treatment is
                      what separates a category label from a skill. */}
                  <Typography
                    component="h4"
                    variant="overline"
                    sx={{ display: "block", color: "var(--text-secondary)" }}
                  >
                    {group.group}
                  </Typography>

                  {/* A real list for a screen reader, with the marker dropped
                      because the brand mark is the bullet. The row wraps, so
                      the group holds at 320 pixels. */}
                  <Box
                    component="ul"
                    // WebKit drops list semantics from a `ul` whose marker is
                    // removed, so the role is restated to keep the group a list
                    // for a screen reader while the mark does the bullet's job
                    // visually.
                    role="list"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      columnGap: 2.5,
                      rowGap: 1,
                      listStyle: "none",
                      margin: 0,
                      marginTop: 1,
                      padding: 0,
                    }}
                  >
                    {group.items.map((item) => (
                      <Box
                        component="li"
                        key={item}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          minWidth: 0,
                          // The mark inherits this, so the glyph reads as
                          // accent and the label stays primary text.
                          color: "var(--accent)",
                        }}
                      >
                        <TechIcon name={item} />

                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "var(--text-primary)" }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default About;
