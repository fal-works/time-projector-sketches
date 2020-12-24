const sltr = require("@fal-works/s-l-t-r");
const builder = require("@fal-works/bundle-helper/lib/build/browser-app");
const esbuild = require("@fal-works/bundle-helper/lib/use/esbuild");
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

const build = builder.command(buildConfig).rename("build");

// const devConfig = {
//   ...config,
//   format: false,
// };
// const dev = builder.command(devConfig).rename("dev");

const dev = sltr.seq(
  esbuild.bundle.command(config)("iife").rename("dev"), // fast but unstable
  esbuild.minify.commandFromConfig(config)("iife")
);

// ----------------------------------------------------------------------------

const startWatch = sltr.cmdEx(async () => {
  sltr.config.setQuiet();
  watch.createWatcher(() => sltr.run(dev));
}, "watch");

const router = sltr.tools.createRouter({
  build,
  dev,
  watch: startWatch,
});

const CLI_ARG = process.argv[2];
router.run(CLI_ARG);
