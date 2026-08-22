import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TechIcon from "./TechIcon";

// The labels below are the only strings in this file. They name the parts of an
// agent, they carry no fact about any agent, and the store has no field for
// them, so they stay here while every claim comes from `data.agents`.
const LABELS = {
  input: "Input",
  steps: "What it does",
  integrations: "Integrations",
  subagents: "Subagents",
  replaces: "Replaces",
};

// Same chip icon slot rule as the project card: MUI's small chip pins an 18
// pixel box and a secondary text colour on `.MuiChip-icon`, and the mark reads
// better matching its label. Everything else about a chip comes from the theme.
const CHIP_SX = {
  "& .MuiChip-icon": {
    color: "inherit",
    width: 16,
    height: 16,
    marginLeft: "10px",
    marginRight: "-4px",
  },
};

const BlockHeading = ({ children }) => (
  <Typography component="h5" variant="body1" sx={{ fontWeight: 700, marginBottom: 1 }}>
    {children}
  </Typography>
);

export default function AgentCard({ agent }) {
  // Only one of the three agents orchestrates subagents, so the block is tied
  // to the field being there rather than to the agent it belongs to.
  const subagents = agent.subagents || [];

  // Surface, outline, radius, resting shadow, and the hover lift all come from
  // the theme's card defaults. Only the wrapping rule is local, since an
  // integration name can be longer than a narrow column.
  return (
    <Card sx={{ overflowWrap: "anywhere" }}>
      <CardContent>
        <Typography component="h4" variant="h5" sx={{ fontWeight: 700 }}>
          {agent.name}
        </Typography>

        {agent.input && (
          <Typography
            component="p"
            variant="body2"
            sx={{ color: "var(--text-secondary)", marginTop: 0.5 }}
          >
            <Box
              component="span"
              sx={{ color: "var(--accent)", fontWeight: 500 }}
            >
              {`${LABELS.input}: `}
            </Box>
            {agent.input}
          </Typography>
        )}

        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          {agent.steps?.length > 0 && (
            <Grid item xs={12} md={7}>
              <BlockHeading>{LABELS.steps}</BlockHeading>
              {/* The `xp` class carries the caret bullets used by the other
                  detail lists on the page. */}
              <Box
                component="ul"
                className="xp"
                sx={{ margin: 0, paddingLeft: 3 }}
              >
                {agent.steps.map((step) => (
                  <Box component="li" key={step}>
                    <Typography component="span" variant="body2">
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={5}>
            {/* Integrations render as chips with marks, the same treatment the
                technology list gets on a project card. `TechIcon` strips the
                `MCP` qualifier itself, so `Jira MCP` and `MongoDB MCP` land on
                their product marks and `glab` on the GitLab one. */}
            {agent.integrations?.length > 0 && (
              <Box sx={{ marginBottom: subagents.length > 0 ? 3 : 0 }}>
                <BlockHeading>{LABELS.integrations}</BlockHeading>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {agent.integrations.map((item) => (
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
              </Box>
            )}

            {subagents.length > 0 && (
              <Box>
                <BlockHeading>{LABELS.subagents}</BlockHeading>
                <Stack spacing={1.5}>
                  {subagents.map((subagent) => (
                    <Box key={subagent.id}>
                      <Typography
                        component="p"
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                      >
                        {subagent.name}
                      </Typography>
                      <Typography
                        component="p"
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        {subagent.about}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Grid>
        </Grid>

        {agent.replaces && (
          <Box
            sx={{
              marginTop: 3,
              paddingTop: 2,
              borderTop: "1px solid var(--border)",
            }}
          >
            <Typography component="p" variant="body2">
              <Box
                component="span"
                sx={{ color: "var(--accent)", fontWeight: 500 }}
              >
                {`${LABELS.replaces}: `}
              </Box>
              <Box component="span" sx={{ color: "var(--text-secondary)" }}>
                {agent.replaces}
              </Box>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
