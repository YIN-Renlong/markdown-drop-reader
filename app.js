/* markdown-drop-reader:v1 */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const welcome = $("welcome");
  const dropZone = $("dropZone");
  const chooseFile = $("chooseFile");
  const openAnother = $("openAnother");
  const fileInput = $("fileInput");
  const reader = $("reader");
  const fileName = $("fileName");
  const body = $("markdownBody");
  const message = $("message");

  const allowed = /\.(md|markdown)$/i;

  marked.setOptions({
    gfm: true,
    breaks: false
  });

  const pick = () => {
    fileInput.value = "";
    fileInput.click();
  };

  const home = (msg = "") => {
    reader.hidden = true;
    welcome.hidden = false;
    openAnother.hidden = true;
    message.textContent = msg;
    document.title = "Markdown Reader";
  };

  function render(markdown, name) {
    const html = marked.parse(
      markdown.replace(/^\uFEFF/, "")
    );

    body.innerHTML = DOMPurify.sanitize(
      html,
      {
        USE_PROFILES: {
          html: true
        }
      }
    );

    body
      .querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
      )
      .forEach((link) => {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });

    fileName.textContent = name;

    welcome.hidden = true;
    reader.hidden = false;
    openAnother.hidden = false;

    document.title = `${name} · Markdown Reader`;

    window.scrollTo(0, 0);
  }

  function read(file) {
    if (!file || !allowed.test(file.name)) {
      home(
        "Please choose a .md or .markdown file."
      );
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      try {
        render(
          String(fileReader.result || ""),
          file.name
        );
      } catch (error) {
        console.error(error);

        home(
          "This file could not be rendered."
        );
      }
    };

    fileReader.onerror = () => {
      home(
        "The browser could not read this file."
      );
    };

    fileReader.readAsText(
      file,
      "utf-8"
    );
  }

  chooseFile.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      pick();
    }
  );

  openAnother.addEventListener(
    "click",
    pick
  );

  dropZone.addEventListener(
    "click",
    (event) => {
      if (event.target !== chooseFile) {
        pick();
      }
    }
  );

  dropZone.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        pick();
      }
    }
  );

  fileInput.addEventListener(
    "change",
    () => {
      read(
        fileInput.files &&
        fileInput.files[0]
      );
    }
  );

  ["dragenter", "dragover"].forEach(
    (name) => {
      document.addEventListener(
        name,
        (event) => {
          event.preventDefault();
          dropZone.classList.add(
            "dragging"
          );
        }
      );
    }
  );

  ["dragleave", "drop"].forEach(
    (name) => {
      document.addEventListener(
        name,
        (event) => {
          event.preventDefault();
          dropZone.classList.remove(
            "dragging"
          );
        }
      );
    }
  );

  document.addEventListener(
    "drop",
    (event) => {
      const files =
        event.dataTransfer &&
        event.dataTransfer.files;

      if (files && files.length) {
        read(files[0]);
      }
    }
  );
})();
