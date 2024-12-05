import * as esbuild from "esbuild";
import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import { globalExternals } from "@fal-works/esbuild-plugin-global-externals";
import path from "path";
import { StringDecoder } from "node:string_decoder";
import crypto from "crypto";
import stylePlugin from "esbuild-style-plugin";
import { readFileSync, writeFileSync } from "node:fs";
import { tailwindPlugin } from "esbuild-plugin-tailwindcss";

export const bundle = async (code: string) => {
  const cwd = process.cwd() + "/src";
  const entryPath = path.join(cwd, `./file-${crypto.randomUUID()}.jsx`);
  const absoluteFiles: Record<string, string> = {};
  absoluteFiles[entryPath] = code;

  const inMemoryPlugin = {
    name: "inMemory",
    setup(build: esbuild.PluginBuild) {
      build.onResolve(
        { filter: /.*/ },
        ({ path: filePath, importer }: { path: string; importer: string }) => {
          if (filePath === entryPath) {
            return {
              path: filePath,
              pluginData: { inMemory: true, contents: absoluteFiles[filePath] },
            };
          }

          const modulePath = path.resolve(path.dirname(importer), filePath);

          if (modulePath in absoluteFiles) {
            return {
              path: modulePath,
              pluginData: {
                inMemory: true,
                contents: absoluteFiles[modulePath],
              },
            };
          }

          for (const ext of [".js", ".ts", ".jsx", ".tsx", ".json"]) {
            const fullModulePath = `${modulePath}${ext}`;
            if (fullModulePath in absoluteFiles) {
              return {
                path: fullModulePath,
                pluginData: {
                  inMemory: true,
                  contents: absoluteFiles[fullModulePath],
                },
              };
            }
          }

          // Return an empty object so that esbuild will handle resolving the file itself.
          return {};
        }
      );

      build.onLoad(
        { filter: /.*/ },
        async ({
          path: filePath,
          pluginData,
        }: {
          path: string;
          pluginData: { inMemory: boolean; contents: string } | undefined;
        }) => {
          if (pluginData === undefined || !pluginData.inMemory) {
            // Return an empty object so that esbuild will load & parse the file contents itself.
            return null;
          }

          // the || .js allows people to exclude a file extension
          const fileType = (path.extname(filePath) || ".jsx").slice(1);
          const contents = absoluteFiles[filePath];

          let loader: esbuild.Loader;

          if (
            build.initialOptions.loader &&
            build.initialOptions.loader[`.${fileType}`]
          ) {
            loader = build.initialOptions.loader[
              `.${fileType}`
            ] as esbuild.Loader;
          } else {
            loader = fileType as esbuild.Loader;
          }

          return {
            contents,
            loader,
          };
        }
      );
    },
  };

  const result = await esbuild.build({
    plugins: [
      globalExternals({
        react: {
          varName: "React",
          type: "cjs",
        },
        "react-dom": {
          varName: "ReactDOM",
          type: "cjs",
        },
        "react/jsx-runtime": {
          varName: "_jsx_runtime",
          type: "cjs",
        },
      }),
      inMemoryPlugin,
      NodeResolvePlugin({
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        resolveOptions: { basedir: cwd },
      }),
      tailwindPlugin({}),
    ],
    entryPoints: [entryPath, path.join(cwd, `./app/globals.css`)],
    bundle: true,
    format: "iife",
    globalName: "Component",
    minify: true,
    publicPath: undefined,
    absWorkingDir: cwd,
    write: false,
    outdir: process.cwd() + "/dist",
  });

  const outCode = decodeFileContent(result.outputFiles[0].contents);
  const outCss = decodeFileContent(result.outputFiles[1].contents);

  return {
    code: `${outCode};return Component;`,
    css: outCss,
  };
};

const decodeFileContent = (content: any) => {
  const decoder = new StringDecoder("utf8");
  return decoder.write(Buffer.from(content));
};
