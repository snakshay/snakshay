import Box from "@mui/material/Box";

import { NAV_ITEMS } from "../navigation";

// The heading label comes from the shared navigation config, so a section id
// and its heading can never drift apart. An id with no entry falls back to
// itself rather than rendering an empty heading.
export const labelForSection = (name) => {
  const item = NAV_ITEMS.find((entry) => entry.id === name);
  return item ? item.label : name;
};

const SectionHeader = ({ name }) => (
  <Box
    component="h3"
    className="section-header"
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      textAlign: "left",
      // The old rule was drawn with absolutely positioned pseudo elements that
      // reached past the container. The rule element below replaces them.
      "&&::before, &&::after": { content: "none", display: "none" },
    }}
  >
    <span>{labelForSection(name)}</span>
    <Box
      aria-hidden="true"
      className="section-header-rule"
      sx={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }}
    />
  </Box>
);

export default SectionHeader;
