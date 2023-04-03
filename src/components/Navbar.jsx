import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink  } from "react-router-dom";
import { Link } from "react-scroll";

const pages = ["About","Experience", "Projects", "Contact"];

const NavBar = () => {
  const [isSelected, setIsSelected] = React.useState({});

  const selection = (selection) => {
    let selections ={
      About: false,
      Projects: false,
      Contact: false,
      Experience:false,
    }
    selections[selection] = true;
    setIsSelected(selections)
  }

  

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {/* LOGO */}
          <Button
            noWrap
            component="div"
           
            sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
          >
            snakshay
          </Button>

          <Box
            sx={{
              display: { xs: "flex", md: "flex" }
            }}
          >
            {pages.map((page) => (
                <Link  to={page} 
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                className={`animated-link ${isSelected[page] ? "selected" : ""}`}
                onClick ={() => selection(page)}
                >
                  {page}
                </Link>
              
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
