const sltr = require("@fal-works/s-l-t-r");
const builder = require("@fal-works/bundle-helper/lib/build/browser-app");
const watch = require("./scripts/watch");

// ----------------------------------------------------------------------------

const no = 1;

const version = "0.1.0";
const year = "2020";

const external = ["p5"];
const globals = { p5: "p5" };

// ----------------------------------------------------------------------------

const url = `https://github.com/fal-works/time-projector-sketches`;

const bannerContent = `
Time Projector / sketch no. ${no}

src: ${url}

@copyright ${year} FAL ( https://www.fal-works.com/ )
@license MIT
@version ${version}
`;

const minifiedBannerContent = `
https://www.fal-works.com/
`;

const config = {
  bundleDistName: "sketch",
  bannerContent,
  srcDir: "src",
  srcEntryFileName: "index.ts",
  tsOutDir: "out",
  distDir: "dist",
  external,
  rollupOptions: {
    output: { globals },
  },
  terserOptions: {
    format: { comments: false },
  },
};

const buildConfig = {
  ...config,
  minifiedBannerContent,
};

const devConfig = {
  ...config,
  format: false,
};

const build = builder.command(buildConfig);
const dev = builder.command(devConfig);

// ----------------------------------------------------------------------------

const { run, cmdEx } = sltr;
const CLI_ARG = process.argv[2];

if (CLI_ARG === "watch") sltr.config.setQuiet();
const startWatch = cmdEx(
  async () => watch.createWatcher(() => run(dev)),
  "watch"
);

const router = sltr.tools.createRouter({ build, dev, watch: startWatch }, dev);
router.run(CLI_ARG);
