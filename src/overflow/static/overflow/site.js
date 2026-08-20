(() => {
  "use strict";

  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const isDark = () =>
    root.classList.contains("dark") || root.classList.contains("light")
      ? root.classList.contains("dark")
      : systemDark.matches;

  const toggles = document.querySelectorAll("[data-theme-toggle]");

  const label = () => (isDark() ? "Switch to the light theme" : "Switch to the dark theme");

  const paintChrome = () => {
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');

    if (!meta) {
      for (const keyed of document.querySelectorAll('meta[name="theme-color"][media]')) {
        keyed.remove();
      }

      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.append(meta);
    }

    meta.setAttribute("content", getComputedStyle(document.body).backgroundColor);

    for (const button of toggles) {
      button.setAttribute("aria-label", label());
    }
  };

  const setTheme = (dark) => {
    if (dark === systemDark.matches) {
      root.classList.remove("dark", "light");
      try {
        localStorage.removeItem("theme");
      } catch (e) {
        void e;
      }
    } else {
      root.classList.toggle("dark", dark);
      root.classList.toggle("light", !dark);
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch (e) {
        void e;
      }
    }

    paintChrome();
  };

  for (const button of toggles) {
    button.addEventListener("click", () => setTheme(!isDark()));
  }

  systemDark.addEventListener("change", paintChrome);
  paintChrome();

  for (const heading of document.querySelectorAll(".prose-of h2[id], .prose-of h3[id]")) {
    const anchor = document.createElement("a");

    anchor.href = `#${heading.id}`;
    anchor.className = "heading-anchor";
    anchor.textContent = "#";
    anchor.setAttribute("aria-label", `Link to section: ${heading.textContent.trim()}`);
    heading.append(anchor);
  }

  for (const table of document.querySelectorAll(".prose-of table")) {
    const wrapper = document.createElement("div");

    wrapper.className = "table-scroll";
    table.replaceWith(wrapper);
    wrapper.append(table);
  }

  const scrollers = document.querySelectorAll(".prose-of pre, .prose-of .codehilite, .table-scroll");

  const markOverflow = (element) => {
    const overflowing = element.scrollWidth > element.clientWidth + 1;

    element.toggleAttribute("data-overflowing", overflowing);
    element.toggleAttribute(
      "data-scrolled-end",
      overflowing && element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    );

    if (overflowing) {
      element.tabIndex = 0;
      element.setAttribute("role", "region");
      element.setAttribute(
        "aria-label",
        element.classList.contains("table-scroll") ? "Table, scrollable" : "Code, scrollable",
      );
    } else {
      element.removeAttribute("tabindex");
      element.removeAttribute("role");
      element.removeAttribute("aria-label");
    }

    if (element.classList.contains("table-scroll")) {
      const column = element.parentElement;
      const wide = element.firstElementChild.scrollWidth > column.clientWidth + 1;

      element.toggleAttribute("data-wide", wide);

      if (wide) {
        const centre = document.documentElement.clientWidth / 2;
        element.style.setProperty("--breakout-shift", `${centre - column.getBoundingClientRect().left}px`);
      } else {
        element.style.removeProperty("--breakout-shift");
      }
    }
  };

  for (const element of scrollers) {
    markOverflow(element);
    element.addEventListener("scroll", () => markOverflow(element), { passive: true });
  }

  const remark = () => scrollers.forEach(markOverflow);

  if (scrollers.length) {
    addEventListener("resize", remark, { passive: true });
  }

  const header = document.querySelector("header");
  const progress = document.querySelector("[data-progress]");

  const onScroll = () => {
    if (header) {
      header.toggleAttribute("data-scrolled", window.scrollY > 4);
    }

    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

      progress.style.setProperty("--progress", Math.min(1, Math.max(0, ratio)).toFixed(4));
    }
  };

  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
})();
