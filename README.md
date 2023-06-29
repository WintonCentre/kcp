# Development Quickstart:
* Install clojure
* Install babashka
* Install npm
* `npm run` to view scripts help in `package.json`
* I'm hoping that babashka tasks will eventually wrap all the administrative scripts we use so we can generate a build system that works in Windows as well as Unix/bash flavour OSs. `bb tasks` will list those tasks.

To run the configuration tool, and start a shadow-cljs dashboard:
```sh
git checkout develop
bb config
bb kidney
npm run watch-all
```
KCP Lung is not currently using, so for generating kidney we use `bb kidney`.

The project is a Shadow-cljs deps.edn project. It no longer uses leiningen.

Open `localhost:9630` for the shadow-cljs dashboard. The `:app` will be served on `localhost:3000` and the
`:test-browser` on `localhost:3021`.

## For VSCode app development,
Install Calva extension in VSCode.
`npm run stop`
Run VSC command `Calva: Start a Project REPL and Connect (aka Jack-in)` and select `shadow-cljs`.
Check both `:app` and `test-browser` to start both. Connect to the `:app` build. Enable notifications on 3021.

To inspect values in code, it is more convenient to use `tap>` rather than `println`.
Results will appear in the dashboard inspectors which allow navigation of run-time data.

Requiring `shadow.debug` will provide a higher level interface to `tap>`
with useful snapshotting utilities that call `tap>`. See the comment at the end of this file for usage: [shadow.debug](https://github.com/thheller/shadow-cljs/blob/master/src/main/shadow/debug.clj)

## Other editors/IDEs
Start at https://shadow-cljs.github.io/docs/UsersGuide.html#_editor_integration.

## Server builds
We run a Jenkins server which will currently build development and production versions of the kcp project, publishing these at https://kcp-dev.wintoncentre.uk and https://kcp-staging.wintoncentre.uk/. These both connect to the develop branche.

Future production builds will need to create a servers at kidney.kcp.wintoncentre.uk. These have not yet been set up.


## Configuration

> **WARNING:**
>
> If you come back to this after a while with new data, be particularly careful about sheet names within spreadsheets. Make sure they correspond to the sheet names in config.edn. If they fail to exist when reading you can get a puzzling crash.


## Contents
This repository contains both a set of configuration utilities and the run-time TRAC tool web-site(s) themselves.

The configuration tools are written in clojure and run on the JVM. JVM 8 or 11 are recommended for clojure. Use a tool such as Jabba to install and switch JVM versions as necessary. Since Oracle JVMs are no longer free we are using `adopt-openj9@1.11.0-6`.

The websites are also written in clojure - in clojurescript - and they compile to js code to run in a browser. The build tools are currently using the [shadow-cljs](https://shadow-cljs.github.io/docs/UsersGuide.html) tool set as this gave simpler access to the few `npm` module dependencies such as react-bootstrap that we are using.

<!--
There have however been recent releases on the main [clojurescript compiler](https://clojurescript.org) thread that mean this dependency on shadow-cljs is no longer necessary. It too can now access `npm` modules easily, and it also now has a target which output which is compatible with js bundlers like webpack. We will avoid any run-time code dependencies on shadow-cljs so we retain the ability to use this approach at a later date.
-->

## Configuration tools and data
  Tools are in `src/kcp/configure`.
  Configuration is in `data` and is controlled by `resources/config.edn`

  Run `bb config` to generate a complete set of edn and csv files in the `resources/public` directory.

  The configuration tool has a profile argument set to `:kidney` which selects the kidney xlsx workbook. The configuration reads in a workbook, validates it, and generates site run-time configuratioqn files in `resources/public`.

### Configuration Development
All run-time data is stored in the `resources` folder.
```
resources
├── config.edn
├── kcp-models-master.xlsx
```

Incoming data/docs from NHSBT and others now in the `doc` folder.

The job of the clojure configuration app is to read these spreadsheets and validate them, and then write them out again in a form suitable for consumption by the web tools. We don't want the web tools to read in xlsx files directly, and we'd also prefer to use a much simpler validation mechanism within the web tool itself such as a hash code.

The process is controlled by `config.edn`. This identifies the path and the format of all organ `.xlsx` files that need to be read in. We are using `juxt/aero` to simplify the construction of this configuration file. This provides the ability to reference values that were previously defined in the same file, and a mechanism to allow profiling for organ - `:kidney` may be selected at time of writing.

There is also some issues that need sorting out. You can find more information in todo.md.

## Project Overview

* Architecture:
[Single Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application)
* Languages
  - Front end ([re-frame](https://github.com/day8/re-frame)): [ClojureScript](https://clojurescript.org/) (CLJS)
* Dependencies
  - UI framework: [re-frame](https://github.com/day8/re-frame)
  ([docs](https://github.com/day8/re-frame/blob/master/docs/README.md),
  [FAQs](https://github.com/day8/re-frame/blob/master/docs/FAQs/README.md)) ->
  [Reagent](https://github.com/reagent-project/reagent) ->
  [React](https://github.com/facebook/react)
  - Client-side routing: [Secretary](https://github.com/gf3/secretary)
* Build tools
  - Project task & dependency management: [Leiningen](https://github.com/technomancy/leiningen)
  - CLJS compilation, REPL, & hot reload: [`shadow-cljs`](https://github.com/thheller/shadow-cljs)
  - Test framework: [cljs.test](https://clojurescript.org/tools/testing)
* Development tools
  - Debugging: [CLJS DevTools](https://github.com/binaryage/cljs-devtools),
  [`re-frame-10x`](https://github.com/day8/re-frame-10x)

#### Directory structure

* [`/`](/../../): project config files
* [`dev/`](dev/): source files compiled only with the [dev](#running-the-app) profile
  - [`cljs/user.cljs`](dev/cljs/user.cljs): symbols for use during development in the
[ClojureScript REPL](#connecting-to-the-browser-repl-from-a-terminal)
* [`resources/public/`](resources/public/): SPA root directory
  - [`index.html`](resources/public/index.html): SPA home page
    - Dynamic SPA content rendered in the following `div`:
        ```html
        <div id="app"></div>
        ```
    - Customizable; add headers, footers, links to other scripts and styles, etc.
  - Generated directories and files
    - Created on build with either the [dev](#running-the-app) or [prod](#production) profile
    - `js/compiled/`: compiled CLJS (`shadow-cljs`)
      - Not tracked in source control; see [`.gitignore`](.gitignore)
* [`src/kcp/`](src/cljs/kcp/): SPA source files (ClojureScript,
[re-frame](https://github.com/Day8/re-frame))
  - [`core.cljs`](src/cljs/kcp/core.cljs): contains the SPA entry point, `init`
* [`test/kcp/`](test/cljs/kcp/): test files (ClojureScript,
[cljs.test](https://clojurescript.org/tools/testing))
  - Only namespaces ending in `-test` (files `*_test.cljs`) are compiled and sent to the test runner

### Browser Setup

Browser caching should be disabled when developer tools are open to prevent interference with
[`shadow-cljs`](https://github.com/thheller/shadow-cljs) hot reloading.

Custom formatters must be enabled in the browser before
[CLJS DevTools](https://github.com/binaryage/cljs-devtools) can display ClojureScript data in the
console in a more readable way.

#### Chrome/Chromium

1. Open [DevTools](https://developers.google.com/web/tools/chrome-devtools/) (Linux/Windows: `F12`
or `Ctrl-Shift-I`; macOS: `⌘-Option-I`)
2. Open DevTools Settings (Linux/Windows: `?` or `F1`; macOS: `?` or `Fn+F1`)
3. Select `Preferences` in the navigation menu on the left, if it is not already selected
4. Under the `Network` heading, enable the `Disable cache (while DevTools is open)` option
5. Under the `Console` heading, enable the `Enable custom formatters` option

#### Firefox

1. Open [Developer Tools](https://developer.mozilla.org/en-US/docs/Tools) (Linux/Windows: `F12` or
`Ctrl-Shift-I`; macOS: `⌘-Option-I`)
2. Open [Developer Tools Settings](https://developer.mozilla.org/en-US/docs/Tools/Settings)
(Linux/macOS/Windows: `F1`)
3. Under the `Advanced settings` heading, enable the `Disable HTTP Cache (when toolbox is open)`
option

Unfortunately, Firefox does not yet support custom formatters in their devtools. For updates, follow
the enhancement request in their bug tracker:
[1262914 - Add support for Custom Formatters in devtools](https://bugzilla.mozilla.org/show_bug.cgi?id=1262914).

## CLJS Development

We are using the react-bootstrap npm module as it provides some useful modal and popup behaviour which woud otherwise need jQuery. There are currently two mechanisms available to allow npm modules to be used in a cljs app. These are the clojure CLI tools with a deps.edn configuration file, and a shadow-cljs build. As it seems to be possible to support both with minor changes, that's what we do for now until it becomes clear which mechanism wins out.

The newer Deps/CLI uses webpack which should minimise the executable better than shadow-cljs as
it supports tree shaking. Shadow-cljs is perhaps simpler to set up however.

### Deps/CLI builds

This is documented from the perspective of using a VSCode development system with the Calva
plugin for Clojure/script. We also use figwheel-main for hot-reload during development.

I've documented the procedure at
https://github.com/gmp26/calva-docs/blob/master/docs/figwheel-main-webpack.md and submitted a
pull request which has been accepted, though not yet published at time of writing. It should appear at https://calva.io/ in due course.

Here's a quick summary:
    1. deps.edn is a map of dependencies, source-paths, and aliases.
    2. The clojure commandline interface tools (clojure or clj) refer to this file. `clj -Afoo` will cause them to refer to the alias `foo` in deps.edn.
    3. extra-paths, extra-deps, and a main-opt can be declared in an alias. This permits one deps.edn to serve multiple functions.
    4. See also `figwheel-main.edn` where the target folder is specified for compiled outputs.

In VSCode you can start a build using a `cider jack in` command.
VSCode looks though the project and offers you available options.
For a CLJS development build choose either Clojure CLI + figwheel-main. Then go on to check `fig` either with or without
`dev`.

First time through choose both `fig` and `dev` as this will force a webpack build. It does dump you in a terminal REPL however and as this is a lot less convenient than an in-editor REPL, on subsequent builds I recommend choosing only `fig` here. On the next screen you can select `dev`, but now you will have a Calva connected REPL.

Do the same for a `10x` enabled build after running `bb-script/switch-10x-dev.clj 10x`, or `bb-script/switch-10x-dev.clj dev` if you don't want to use 10x.

### Shadow-cljs builds

Start a temporary local web server, build the app with the `dev` profile, and serve the app with
hot reload:


```sh
npx shadow-cljs watch app
```

Please be patient; it may take over 20 seconds to see any output, and over 40 seconds to complete.

When `[:app] Build completed` appears in the output, browse to
[http://localhost:8280/](http://localhost:8280/).

[`shadow-cljs`](https://github.com/thheller/shadow-cljs) will automatically push ClojureScript code
changes to your browser on save. To prevent a few common issues, see
[Hot Reload in ClojureScript: Things to avoid](https://code.thheller.com/blog/shadow-cljs/2019/08/25/hot-reload-in-clojurescript.html#things-to-avoid).

Opening the app in your browser starts a
[ClojureScript browser REPL](https://clojurescript.org/reference/repl#using-the-browser-as-an-evaluation-environment),
to which you may now connect.

## Production

Build the app with the `prod` profile:

```sh
shadow-cljs release app
```

Please be patient; it may take over 15 seconds to see any output, and over 30 seconds to complete.

The `resources/public/js/compiled` directory is created, containing the compiled `app.js` and
`manifest.edn` files.

## Label test program

To check the correctness of labels on the charts, there is a script that generates all possible combinations of inputs and check if their label is wrong. The result of "only" wrong labels will be available as a table in the url:

```sh
/standard-error-test-848efcc3-938f-4dff-9b55-1f0394f29793
```

On the table, each score is sorted from high to low based on the labels.

The second column includes different sets of inputs, and the first column on the right is the score of that set of inputs.

The red numbers on the third column are the wrong labels generated by the current script. These are the labels shown on the charts as “no recurrence” percentages.

The fourth column includes the standard error range for that specific score.

The last column shows that each red wrong label belongs to which real score in green. If it's None, it means there is a gap in the standard error range list, and that red label does not belong to any standard error range at all.
