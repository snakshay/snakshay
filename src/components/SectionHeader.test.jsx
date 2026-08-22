import { render, screen } from "@testing-library/react";

import SectionHeader, { labelForSection } from "./SectionHeader";
import { NAV_ITEMS } from "../navigation";

describe("SectionHeader", () => {
  it("renders the navigation label for a section id", () => {
    render(<SectionHeader name="Experience" />);

    expect(
      screen.getByRole("heading", { name: "Proficiency" })
    ).toBeInTheDocument();
  });

  it("renders a label for every navigation entry", () => {
    NAV_ITEMS.forEach((item) => {
      const { unmount } = render(<SectionHeader name={item.id} />);
      expect(
        screen.getByRole("heading", { name: item.label })
      ).toBeInTheDocument();
      unmount();
    });
  });

  it("falls back to the id when it has no navigation entry", () => {
    expect(labelForSection("Unlisted")).toBe("Unlisted");

    render(<SectionHeader name="Unlisted" />);
    expect(
      screen.getByRole("heading", { name: "Unlisted" })
    ).toBeInTheDocument();
  });

  it("lays the heading out as a flex row with a filling rule element", () => {
    const { container } = render(<SectionHeader name="About" />);

    const heading = screen.getByRole("heading", { name: "Bio" });
    const headingStyle = window.getComputedStyle(heading);
    expect(headingStyle.display).toBe("flex");
    expect(headingStyle.flexDirection).toBe("row");

    // The rule is decorative and `aria-hidden`, so no Testing Library query
    // reaches it. Reading it from the container is the only route.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const rule = container.querySelector(".section-header-rule");
    expect(rule).not.toBeNull();
    expect(window.getComputedStyle(rule).flex).toBe("1");

    // jsdom drops `var()` from computed values, so read the injected rule for
    // the element's own class instead.
    // eslint-disable-next-line testing-library/no-node-access
    const injected = Array.from(document.querySelectorAll("style"))
      .map((node) => node.textContent)
      .join("");
    const ownClass = Array.from(rule.classList).find((name) =>
      name.startsWith("css-")
    );
    const ownRule = injected.slice(injected.indexOf(`.${ownClass}{`));
    expect(ownRule.slice(0, ownRule.indexOf("}"))).toContain(
      "background-color:var(--border)"
    );
  });
});
