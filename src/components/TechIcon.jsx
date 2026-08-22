// Shared icon layer for technology names and personal interests.
//
// Two jobs live here so a consuming section has one import site:
//   TechIcon           - a brand mark for a technology string from `data.js`
//   iconForInterest(id) - a MUI icon component for a `personal.interests` id
//
// Nothing in here holds state or reads the theme in JavaScript. Colour comes
// from `currentColor` by default, so a mark inherits whatever text colour the
// surface around it already resolved from the CSS custom properties
// (`--text-primary`, `--text-secondary`, `--accent`). No colour literal for a
// theme surface appears in this file.

import FlightTakeoffRounded from "@mui/icons-material/FlightTakeoffRounded";
import InterestsRounded from "@mui/icons-material/InterestsRounded";
import PetsRounded from "@mui/icons-material/PetsRounded";
import SportsTennisRounded from "@mui/icons-material/SportsTennisRounded";

import {
  siAngular,
  siAnsible,
  siApachekafka,
  siBootstrap,
  siConfluence,
  siCss,
  siExpress,
  siGit,
  siGitlab,
  siHtml5,
  siJasmine,
  siJavascript,
  siJest,
  siJira,
  siMongodb,
  siMui,
  siN8n,
  siNestjs,
  siNetlify,
  siNodedotjs,
  siPostman,
  siRabbitmq,
  siReact,
  siSass,
  siSocketdotio,
  siSonarqubeserver,
  siSplunk,
  siTypescript,
  siVmware,
  siWebpack,
} from "simple-icons";

// Registry keyed by normalised name (see `normaliseTechName`). Keys are
// lowercase, punctuation free, and version free, so one entry serves every
// spelling of a technology the store uses.
//
// A few entries are deliberate substitutes rather than exact marks:
//   awx     -> Ansible, AWX being the upstream project the API belongs to
//   vsphere -> VMware, vSphere shipping under the VMware mark
const TECH_ICONS = {
  angular: siAngular,
  ansible: siAnsible,
  apachekafka: siApachekafka,
  awx: siAnsible,
  bootstrap: siBootstrap,
  confluence: siConfluence,
  css: siCss,
  express: siExpress,
  expressjs: siExpress,
  git: siGit,
  gitlab: siGitlab,
  glab: siGitlab,
  html: siHtml5,
  html5: siHtml5,
  jasmine: siJasmine,
  javascript: siJavascript,
  jest: siJest,
  jira: siJira,
  kafka: siApachekafka,
  mongo: siMongodb,
  mongodb: siMongodb,
  mui: siMui,
  n8n: siN8n,
  nest: siNestjs,
  nestjs: siNestjs,
  netlify: siNetlify,
  node: siNodedotjs,
  nodejs: siNodedotjs,
  postman: siPostman,
  rabbitmq: siRabbitmq,
  react: siReact,
  sass: siSass,
  scss: siSass,
  socketio: siSocketdotio,
  sonarqube: siSonarqubeserver,
  splunk: siSplunk,
  ts: siTypescript,
  typescript: siTypescript,
  vmware: siVmware,
  vsphere: siVmware,
  webpack: siWebpack,
};

// Trailing words that describe how a technology is used rather than which
// technology it is: `vSphere API`, `Jira MCP`, `MongoDB MCP`.
const TRAILING_QUALIFIERS = new Set([
  "api",
  "cli",
  "cloud",
  "framework",
  "library",
  "mcp",
  "platform",
  "sdk",
  "server",
  "service",
]);

// Separators that join two technologies into one label: `CSS and SASS`. The
// first named technology wins, which is the one the mark should show.
const COMPOUND_SPLIT = /\s+(?:and|&|\+|\/|,|or)\s+|[/,+&]/;

// Neutral mark for a name with no brand icon: a square ring around a solid
// centre. Drawn in a 24 unit box with nonzero winding, so the ring reads as an
// outline rather than a filled block.
const FALLBACK_ICON = {
  title: "Technology",
  hex: null,
  path: "M3 3h18v18H3V3zm2 2v14h14V5H5zm4 4h6v6H9V9z",
};

// Reduce a store label to a registry key. Version numbers, parenthetical
// suffixes, trailing qualifiers, punctuation, and compound second halves all
// come off, so `React 18`, `JavaScript (ES6)`, `Jira MCP`, `Node.js`, and
// `CSS and SASS` land on `react`, `javascript`, `jira`, `nodejs`, and `css`.
export const normaliseTechName = (name) => {
  if (typeof name !== "string") return "";

  const withoutParens = name.toLowerCase().replace(/\([^)]*\)/g, " ");
  const [primary = ""] = withoutParens.split(COMPOUND_SPLIT);

  const words = primary
    .split(/[\s.]+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);

  // Drop trailing qualifiers and standalone version numbers, but never the
  // only word left, so a label made entirely of qualifiers still normalises to
  // something rather than to nothing.
  while (
    words.length > 1 &&
    (TRAILING_QUALIFIERS.has(words[words.length - 1]) ||
      /^v?\d+(\.\d+)*$/.test(words[words.length - 1]))
  ) {
    words.pop();
  }

  return words.join("");
};

// Resolve a store label to a mark. Always returns a descriptor, so a caller
// never has to guard: `matched` says whether it is a brand mark or the
// neutral fallback.
export const resolveTechIcon = (name) => {
  const key = normaliseTechName(name);

  // Exact key first, so `html5` and `css3` keep their own spelling a chance
  // before the version strip turns them into `html` and `css`.
  const candidates = [key, key.replace(/\d+$/, "")];

  for (const candidate of candidates) {
    const icon = candidate && TECH_ICONS[candidate];
    if (icon) {
      return { ...icon, key: candidate, matched: true };
    }
  }

  return { ...FALLBACK_ICON, key, matched: false };
};

export const hasTechIcon = (name) => resolveTechIcon(name).matched;

// MUI marks for the three interests in `data.personal.interests`. No licensed
// photography exists for them and no stock image is committed, so the set
// already installed carries them. An unknown id falls back to the generic
// interests mark.
const INTEREST_ICONS = {
  badminton: SportsTennisRounded,
  "flight-sim": FlightTakeoffRounded,
  animals: PetsRounded,
};

export const iconForInterest = (id) => INTEREST_ICONS[id] || InterestsRounded;

/**
 * A brand mark for a technology name.
 *
 * @param name    Store label, in any spelling the store uses.
 * @param size    Edge length in pixels, or any CSS length. Default 20.
 * @param brand   Render in the brand hex instead of `currentColor`. Brand
 *                colour ignores the colour mode, and several marks fail
 *                contrast in one or both palettes (Express and Splunk are near
 *                black, Jest is a dark red, Node green sits low on dark). Only
 *                turn this on where the mark sits on `--surface` at 24px or
 *                larger and its own contrast has been checked, such as a
 *                project card header. Body text and chip rows keep the default.
 * @param label   Accessible name. Supplying it switches the mark to
 *                `role="img"` for the case where it stands alone. Omit it when
 *                a text label sits next to the mark, which is the default and
 *                leaves the mark `aria-hidden`.
 */
const TechIcon = ({ name, size = 20, brand = false, label, ...rest }) => {
  const icon = resolveTechIcon(name);
  const labelled = Boolean(label);

  return (
    <svg
      role={labelled ? "img" : undefined}
      aria-label={labelled ? label : undefined}
      aria-hidden={labelled ? undefined : "true"}
      focusable="false"
      className="tech-icon"
      data-tech-key={icon.key}
      data-tech-matched={icon.matched ? "true" : "false"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={brand && icon.hex ? `#${icon.hex}` : "currentColor"}
      style={{ display: "block", flex: "none" }}
      {...rest}
    >
      {labelled ? <title>{label}</title> : null}
      <path d={icon.path} />
    </svg>
  );
};

export default TechIcon;
