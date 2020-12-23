const chokidar = require("chokidar");

const log = console.log.bind(console);

const createWatcher = (onChange) => {
  const watcher = chokidar.watch("src/", {
    ignored: /[/\\]\./,
    persistent: true,
  });

  watcher.on("ready", function () {
    log("Start watching...");
    watcher.on("change", onChange);
  });
  return watcher;
};

module.exports = { createWatcher };
