// SPDX-License-Identifier: MIT

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

function getConfig(options) {
  if (options == null) { options = { }; }

  const file = `./dist/hdwallet${ (options.suffix || "") }.js`;
  const exportConditions = [ "import", "default" ];
  const mainFields = [ "module", "main" ];
  if (options.browser) {
    mainFields.unshift("browser");
  }

  return {
    input: "./lib.esm/index.js",
    output: {
      file,
      banner: "const __$G = (typeof globalThis !== 'undefined' ? globalThis: typeof window !== 'undefined' ? window: typeof global !== 'undefined' ? global: typeof self !== 'undefined' ? self: {});",
      name: (options.name || undefined),
      format: (options.format || "esm"),
      sourcemap: true
    },
    context: "__$G",
    treeshake: true,
    plugins: [
      nodeResolve({
        exportConditions,
        mainFields,
        preferBuiltins: false
      }),
      commonjs({
        include: /node_modules/
      })
    ],
  };
}

export default [
  getConfig({
    browser: true
  }),
  getConfig({
    browser: true,
    suffix: ".umd",
    format: "umd",
    name: "hdwallet"
  }),
];
