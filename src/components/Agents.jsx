import Stack from "@mui/material/Stack";

import { data } from "../data";
import AgentCard from "./AgentCard";
import SectionHeader from "./SectionHeader";

const Agents = () => {
  const agents = data.agents || [];

  // An empty array takes the whole section with it, heading included, rather
  // than leaving a titled gap on the page.
  if (agents.length === 0) return null;

  return (
    <div className="home agents">
      <div className="content-wrapper">
        <SectionHeader name="Agents" />

        {/* Each agent carries a long step list, so the cards stack at full
            width instead of sharing a row. Adding a store entry adds a card. */}
        <Stack spacing={3}>
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Agents;
