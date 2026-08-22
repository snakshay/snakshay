import { render, screen } from "@testing-library/react";
import fc from "fast-check";

import TechIcon, {
  hasTechIcon,
  iconForInterest,
  normaliseTechName,
  resolveTechIcon,
} from "./TechIcon";
import { data } from "../data";

// Every technology string the store holds, read off `data.js` rather than
// listed here, so a technology added to the store later is covered by these
// tests without anyone remembering to update them.
const storeTechNames = () => {
  const names = [
    ...data.about.skills.flatMap((group) => group.items),
    ...data.projects.flatMap((project) => project.tech),
    ...data.agents.flatMap((agent) => agent.integrations),
  ];
  return Array.from(new Set(names));
};

// Store names with no mark in the icon set. Heroku and Visual Studio Code were
// both withdrawn from `simple-icons` over trademark terms, and Karma has never
// had an entry. They render the neutral fallback. A new store technology that
// has no mark fails the test below until it is either mapped or added here,
// which is the point: nothing falls through unnoticed.
const KNOWN_UNMATCHED = ["Heroku", "VS Code", "Karma"];

describe("normaliseTechName", () => {
  it.each([
    ["React", "react"],
    ["React 18", "react"],
    ["Angular 12", "angular"],
    ["JavaScript (ES6)", "javascript"],
    ["CSS and SASS", "css"],
    ["CSS3", "css3"],
    ["HTML5", "html5"],
    ["Node.js", "nodejs"],
    ["Nest.js", "nestjs"],
    ["Socket.io", "socketio"],
    ["vSphere API", "vsphere"],
    ["AWX API", "awx"],
    ["Jira MCP", "jira"],
    ["MongoDB MCP", "mongodb"],
    ["Confluence MCP", "confluence"],
    ["n8n", "n8n"],
    ["VS Code", "vscode"],
  ])("normalises %s to %s", (input, expected) => {
    expect(normaliseTechName(input)).toBe(expected);
  });

  it("returns an empty key for a non string or empty name", () => {
    expect(normaliseTechName(undefined)).toBe("");
    expect(normaliseTechName(null)).toBe("");
    expect(normaliseTechName(42)).toBe("");
    expect(normaliseTechName("   ")).toBe("");
  });

  it("keeps the only word left when the label is all qualifier", () => {
    expect(normaliseTechName("API")).toBe("api");
  });
});

describe("resolveTechIcon over the store", () => {
  it("resolves every store technology to a mark, bar the documented few", () => {
    const unmatched = storeTechNames().filter((name) => !hasTechIcon(name));

    expect(unmatched.sort()).toEqual([...KNOWN_UNMATCHED].sort());
  });

  it("returns a drawable path for every store technology", () => {
    storeTechNames().forEach((name) => {
      const icon = resolveTechIcon(name);
      expect(typeof icon.path).toBe("string");
      expect(icon.path.length).toBeGreaterThan(0);
      expect(icon.key).not.toBe("");
    });
  });

  it("renders a path element for every store technology", () => {
    storeTechNames().forEach((name) => {
      const { container, unmount } = render(<TechIcon name={name} />);
      // The mark is decorative and `aria-hidden`, so no Testing Library query
      // reaches it.
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const path = container.querySelector("svg.tech-icon path");
      expect(path).not.toBeNull();
      expect(path.getAttribute("d")).toBeTruthy();
      unmount();
    });
  });

  it("resolves a versioned or qualified spelling to the same mark as the base", () => {
    expect(resolveTechIcon("React 18").path).toBe(resolveTechIcon("React").path);
    expect(resolveTechIcon("Angular 12").path).toBe(
      resolveTechIcon("Angular").path
    );
    expect(resolveTechIcon("Jira MCP").path).toBe(resolveTechIcon("Jira").path);
    expect(resolveTechIcon("MongoDB MCP").path).toBe(
      resolveTechIcon("MongoDB").path
    );
    expect(resolveTechIcon("vSphere API").path).toBe(
      resolveTechIcon("VMware").path
    );
  });
});

describe("resolveTechIcon fallback", () => {
  it("returns the fallback for an unknown name instead of throwing", () => {
    const icon = resolveTechIcon("Fortran Punchcards");

    expect(icon.matched).toBe(false);
    expect(icon.hex).toBeNull();
    expect(icon.path.length).toBeGreaterThan(0);
  });

  it("returns the fallback for a missing or non string name", () => {
    [undefined, null, "", 7, {}].forEach((input) => {
      const icon = resolveTechIcon(input);
      expect(icon.matched).toBe(false);
      expect(icon.path.length).toBeGreaterThan(0);
    });
  });

  it("renders a non empty mark for an unknown name", () => {
    const { container } = render(<TechIcon name="Fortran Punchcards" />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const svg = container.querySelector("svg.tech-icon");
    expect(svg.getAttribute("data-tech-matched")).toBe("false");
    // eslint-disable-next-line testing-library/no-node-access
    expect(svg.querySelector("path").getAttribute("d")).toBeTruthy();
  });

  it("renders without a name at all", () => {
    const { container } = render(<TechIcon />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector("svg.tech-icon path")).not.toBeNull();
  });
});

describe("TechIcon rendering", () => {
  it("is decorative by default and carries no accessible name", () => {
    const { container } = render(<TechIcon name="React" />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const svg = container.querySelector("svg.tech-icon");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("role")).toBeNull();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("takes a labelled role when a label is supplied", () => {
    render(<TechIcon name="React" label="React" />);

    const svg = screen.getByRole("img", { name: "React" });
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("aria-hidden")).toBeNull();
  });

  it("inherits the text colour by default and takes the brand hex on request", () => {
    const { container: plain } = render(<TechIcon name="Node.js" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(plain.querySelector("svg.tech-icon").getAttribute("fill")).toBe(
      "currentColor"
    );

    const { container: branded } = render(<TechIcon name="Node.js" brand />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const fill = branded.querySelector("svg.tech-icon").getAttribute("fill");
    expect(fill).toMatch(/^#[0-9A-Fa-f]{3,8}$/);
  });

  it("falls back to the inherited colour when a brand mark has no hex", () => {
    const { container } = render(<TechIcon name="Karma" brand />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector("svg.tech-icon").getAttribute("fill")).toBe(
      "currentColor"
    );
  });

  it("defaults to a 20 pixel box and takes a size", () => {
    const { container: base } = render(<TechIcon name="React" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const svg = base.querySelector("svg.tech-icon");
    expect(svg.getAttribute("width")).toBe("20");
    expect(svg.getAttribute("height")).toBe("20");
    expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");

    const { container: sized } = render(<TechIcon name="React" size={32} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(sized.querySelector("svg.tech-icon").getAttribute("width")).toBe(
      "32"
    );
  });
});

describe("iconForInterest", () => {
  it("returns a component for every store interest", () => {
    data.personal.interests.forEach((interest) => {
      const Icon = iconForInterest(interest.id);
      expect(Icon).toBeDefined();

      const { container, unmount } = render(<Icon titleAccess={interest.title} />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector("svg")).not.toBeNull();
      unmount();
    });
  });

  it("gives each interest its own mark", () => {
    const components = data.personal.interests.map((interest) =>
      iconForInterest(interest.id)
    );
    expect(new Set(components).size).toBe(components.length);
  });

  it("falls back for an unknown interest id", () => {
    expect(iconForInterest("kitesurfing")).toBeDefined();
    expect(iconForInterest(undefined)).toBeDefined();
  });
});

describe("resolveTechIcon property", () => {
  it("returns a drawable mark for any string without throwing", () => {
    fc.assert(
      fc.property(fc.string(), (name) => {
        const icon = resolveTechIcon(name);
        expect(typeof icon.path).toBe("string");
        expect(icon.path.length).toBeGreaterThan(0);
        expect(typeof icon.matched).toBe("boolean");
      }),
      { numRuns: 200 }
    );
  });

  it("resolves a store name to the same mark under version and qualifier noise", () => {
    const matched = storeTechNames().filter((name) => hasTechIcon(name));

    fc.assert(
      fc.property(
        fc.constantFrom(...matched),
        fc.constantFrom("", " 12", " 3.1", " v2", " API", " MCP", " server"),
        (name, suffix) => {
          expect(resolveTechIcon(`${name}${suffix}`).path).toBe(
            resolveTechIcon(name).path
          );
        }
      ),
      { numRuns: 200 }
    );
  });
});
