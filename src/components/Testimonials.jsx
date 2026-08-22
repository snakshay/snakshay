import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import testimonials from "../testimonials.json";
import SectionHeader from "./SectionHeader";
import TestimonialCard from "./TestimonialCard";

// The provenance line lives here rather than in the store because it describes
// where the recommendations came from, not the content of any one of them, so
// no JSON entry owns it.
const RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/snakshay/details/recommendations/";

const Testimonials = () => {
  // An empty store takes the whole section with it, heading included, rather
  // than leaving a titled gap on the page.
  if (testimonials.length === 0) return null;

  return (
    <div className="home testimonials">
      <div className="content-wrapper">
        <SectionHeader name="Testimonials" />

        <Typography
          component="p"
          sx={{ marginBottom: 3, color: "var(--text-secondary)" }}
        >
          These recommendations come from Akshay's LinkedIn profile, and the{" "}
          {/* The accessible name says where the link goes and that it opens a
              new tab, so the surrounding sentence is not read as the name. */}
          <Link
            href={RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Recommendations on Akshay's LinkedIn profile, opens in a new tab"
            sx={{ color: "var(--accent)" }}
          >
            recommendations page
          </Link>{" "}
          holds the originals.
        </Typography>

        {/* File order is render order, and a fifth JSON entry renders a fifth
            card with no change here. */}
        <Grid container spacing={3}>
          {testimonials.map((entry) => (
            <Grid item xs={12} md={6} key={entry.id}>
              <TestimonialCard entry={entry} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Testimonials;
