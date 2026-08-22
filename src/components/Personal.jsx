import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { data } from "../data";
import SectionHeader from "./SectionHeader";
import { iconForInterest } from "./TechIcon";

const { personal } = data;

const Personal = () => {
  const paragraphs = personal.paragraphs || [];
  const interests = personal.interests || [];

  // An empty paragraph array takes the whole section out, heading included,
  // and leaves every other section rendering as it was.
  if (paragraphs.length === 0) return null;

  return (
    <div className="home personal">
      <div className="content-wrapper">
        <SectionHeader name="Personal" />

        {/* One paragraph element per store entry, rendered as JSX children so a
            stray character in the copy stays a character. The paragraphs share
            one wrapper so the section reveals in three tiers, heading then copy
            then cards, rather than one tier per paragraph. */}
        <Box>
          {paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              component="p"
              sx={{ marginBottom: 2, color: "var(--text-secondary)" }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>

        {/* Three interests today, and a fourth store entry gets a fourth card
            with no change here. */}
        {interests.length > 0 && (
          <Grid container spacing={3} sx={{ marginTop: 1 }}>
            {interests.map((interest) => {
              // A component, not an element, so the card decides the size. An
              // unknown id still gets the generic mark, which is what keeps a
              // new store entry from rendering a hole.
              const InterestIcon = iconForInterest(interest.id);

              return (
                <Grid item xs={12} sm={6} md={4} key={interest.id}>
                  <Card
                    sx={{
                      height: "100%",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <CardContent>
                      {/* The tinted backing and the accent glyph both come from
                          the theme's avatar default. The mark is decorative,
                          the title names the interest. */}
                      <Avatar
                        variant="rounded"
                        sx={{ width: 56, height: 56, marginBottom: 2 }}
                      >
                        <InterestIcon sx={{ fontSize: 32 }} />
                      </Avatar>

                      <Typography component="h4" variant="h6">
                        {interest.title}
                      </Typography>

                      {interest.about && (
                        <Typography
                          component="p"
                          variant="body2"
                          sx={{
                            marginTop: 1,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {interest.about}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Personal;
