import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import useColourMode from "../theme/useColourMode";

// The control that switches colour mode.
//
// The accessible name and the tooltip both state the mode the control switches
// to, not the mode currently applied, per requirement 10.8. Both are derived
// from `target`, so they change with the mode and a screen reader user hears the
// new target right after activating it. The icon shows the same target.
const ThemeToggle = (props) => {
  const { mode, toggle } = useColourMode();
  const target = mode === "dark" ? "light" : "dark";
  const label = `Switch to ${target} mode`;

  return (
    <Tooltip title={label}>
      <IconButton onClick={toggle} aria-label={label} color="inherit" {...props}>
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
