import { useState } from "react";
import { Link } from "react-scroll";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { NAV_ITEMS } from "../navigation";
import ThemeToggle from "./ThemeToggle";

const DRAWER_ID = "nav-item-drawer";

// One renderer for both layouts, so an item behaves the same inline and inside
// the drawer: react-scroll handles the smooth scroll, `spy` drives the
// `selected` class that the `.animated-link` underline reads, and the offset
// clears the fixed bar.
const NavItemLink = ({ item, onNavigate }) => (
  <Link
    to={item.id}
    spy
    smooth
    offset={-100}
    activeClass="selected"
    duration={500}
    className="animated-link"
    onClick={onNavigate}
  >
    {item.label}
  </Link>
);

const NavBar = () => {
  const theme = useTheme();
  // The custom `nav` breakpoint sits at 750, so the threshold lives in the
  // theme rather than in this component.
  const collapse = useMediaQuery(theme.breakpoints.down("nav"));
  const [open, setOpen] = useState(false);

  const items = NAV_ITEMS.map((item) => (
    <NavItemLink
      key={item.id}
      item={item}
      onNavigate={collapse ? () => setOpen(false) : undefined}
    />
  ));

  const toggleLabel = open ? "Close navigation" : "Open navigation";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      // Colours come from the active mode tokens, so the bar tracks the theme
      // instead of staying black in light mode.
      sx={{
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
        backgroundImage: "none",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {collapse ? (
            <IconButton
              onClick={() => setOpen((previous) => !previous)}
              aria-label={toggleLabel}
              aria-expanded={open}
              aria-controls={DRAWER_ID}
              color="inherit"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              {items}
            </Box>
          )}

          {/* Outside the collapsing group, so the mode can be switched at any
              width without opening the drawer. */}
          <ThemeToggle />
        </Toolbar>
      </Container>

      {collapse && (
        <Drawer
          id={DRAWER_ID}
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          // Keeping the items mounted lets react-scroll keep spying on the
          // sections while the drawer is shut.
          ModalProps={{ keepMounted: true }}
          // Sitting under the bar keeps the toggle button reachable, so one
          // control both opens and closes the list.
          sx={{ zIndex: (t) => t.zIndex.appBar - 1 }}
          PaperProps={{
            sx: {
              backgroundColor: "var(--surface)",
              color: "var(--text-primary)",
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              paddingTop: 9,
              paddingRight: 4,
              paddingBottom: 3,
              paddingLeft: 3,
              minWidth: "12rem",
            },
          }}
        >
          {items}
        </Drawer>
      )}
    </AppBar>
  );
};

export default NavBar;
