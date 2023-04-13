import * as React from "react";
import { Link } from "react-scroll";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

const pages = ["About","Experience", "Projects", "Contact"];

export const uiPages = {About:'Bio',Experience: 'Proficiency',Projects: 'My Work',Contact: 'Say Hi!'}

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
      <Container maxWidth="100%">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            justifyContent: "end"
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "flex" }
            }}
          >
            {pages.map((page) => (
                <Link  to={page} 
                  key={page}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  activeClass="selected"
                  duration={500}
                  className={`animated-link`}
                >
                  {uiPages[page]}
                </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
