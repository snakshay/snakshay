import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// The local file wins over `imageUrl`, and `imageUrl` is the fallback for an
// entry that has no committed photo. The LinkedIn photo URLs carry an `e`
// parameter that is an expiry, and `e=1788998400` is 10 September 2026, after
// which LinkedIn answers those URLs with an error. Trying the remote URL first
// would send every visitor after that date to a dead image and then on to the
// fallback, so the committed local file, which never expires, goes first.
// The local path resolves under `public`, which needs no bundler reference, so
// a new photo plus a JSON entry renders with no code change.
export function resolveImageSources(entry) {
  const remote = entry.imageUrl?.trim() ? entry.imageUrl.trim() : null;
  const local = entry.image?.trim()
    ? `${process.env.PUBLIC_URL}/images/testimonials/${entry.image.trim()}`
    : null;
  return [local, remote].filter(Boolean); // first entry is tried first
}

// Two initials at most, taken from the first two words of the name, so a long
// name does not turn into a wall of letters inside the avatar.
export function initialsOf(author) {
  return author
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TestimonialCard({ entry }) {
  const sources = resolveImageSources(entry);
  const profileUrl = entry.profileUrl?.trim() ? entry.profileUrl.trim() : "";

  // The index walks the source list. Every `error` event moves it on, and once
  // it passes the end of the list there is no source left to try, so the
  // avatar falls back to the author initials.
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const currentSource = sources[sourceIndex] || "";

  const content = (
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* `onError` rides on `imgProps` so the handler lands on the `img`
            element itself. An error advances the index, the next source
            renders, and the initials show once the list is exhausted.

            The colours come from the theme's avatar default, an `--accent-soft`
            fill with `--accent` initials and a token border, rather than the
            solid `--accent` disc this used to pin. This slot holds a photo; the
            initials are the fallback, so it should read as an empty photo frame
            matching the card outline, not as a filled badge shouting louder
            than the author name beside it. The theme pair is also the measured
            one, `--accent` on `--accent-soft` at 6.07 to 1 light and 6.13 to 1
            dark, where the old pin put `--surface` on `--accent`, a pairing the
            token table never checked and which `--accent-contrast` exists for.
            The 700 weight also comes from the theme now. */}
        <Avatar
          src={currentSource || undefined}
          alt={entry.author}
          imgProps={{
            onError: () => setSourceIndex((index) => index + 1),
          }}
          sx={{ width: 56, height: 56, flexShrink: 0 }}
        >
          {initialsOf(entry.author)}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h4"
            variant="h6"
            className="testimonial-author"
            sx={{ fontWeight: 700 }}
          >
            {entry.author}
          </Typography>

          {entry.title && (
            <Typography
              component="p"
              variant="body2"
              sx={{ color: "var(--text-secondary)" }}
            >
              {entry.title}
            </Typography>
          )}

          {(entry.relationship || entry.date) && (
            <Typography
              component="p"
              variant="body2"
              sx={{ color: "var(--accent)", marginTop: 0.5 }}
            >
              {[entry.relationship, entry.date].filter(Boolean).join(" | ")}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* The recommendation is a JSX child, never markup, so a stray tag
          inside a quote appears as characters. `pre-line` keeps the newlines
          the authors wrote as visible paragraph breaks without splitting the
          string into elements. */}
      {entry.text && (
        <Typography
          component="p"
          variant="body2"
          sx={{
            marginTop: 2,
            paddingTop: 2,
            borderTop: "1px solid var(--border)",
            color: "var(--text-secondary)",
            whiteSpace: "pre-line",
          }}
        >
          {entry.text}
        </Typography>
      )}
    </CardContent>
  );

  // Surface, outline, radius, and elevation come from the theme's card
  // defaults. What stays is layout: equal height across a row and a wrapping
  // rule for a long name or title.
  return (
    <Card sx={{ height: "100%", overflowWrap: "anywhere" }}>
      {/* One link per card, and it is a real anchor, so Tab reaches it, Enter
          activates it, and the global :focus-visible ring shows on it. The
          author name is inside the same link rather than being a second link
          of its own, so the card holds no nested interactive element. An entry
          with no `profileUrl` renders the same content with no anchor around
          it, so a missing URL cannot become a dead link. The accessible name
          names the person and says the link leaves for a new tab, so the
          recommendation text is not read as the name of the link. */}
      {profileUrl ? (
        <CardActionArea
          component="a"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${entry.author} on LinkedIn, opens in a new tab`}
          sx={{
            height: "100%",
            borderRadius: "inherit",
            // MUI's ButtonBase resets `outline` on itself, and its rule and the
            // global `:focus-visible` rule carry the same specificity, so the
            // ring depends on which stylesheet lands last. Restating the ring
            // here with the same `--focus-ring` token settles it, and the value
            // still follows the theme.
            "&.Mui-focusVisible": {
              outline: "2px solid var(--focus-ring)",
              outlineOffset: "2px",
            },
            // Restrained affordance: hover and focus mark the author name and
            // leave the rest of the card alone.
            "&:hover .testimonial-author, &.Mui-focusVisible .testimonial-author":
              {
                color: "var(--accent)",
                textDecoration: "underline",
              },
          }}
        >
          {content}
        </CardActionArea>
      ) : (
        content
      )}
    </Card>
  );
}
