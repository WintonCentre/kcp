# Data Preparation

`resources/corrected-leibovoch-baseline-calculation.xlsx` contains a spreadsheet that reverse engineers the
Leobovich paper to generate a baseline S_0.

Once only this baseline must be copied to the correct times in `resources/kcp-models-master.xlsx` sheet ldsurvival-baseline-cifs. Note that this file format was originally developed for an app that used days as time units.
One old day is ONE kcp MONTH. So we need 120 old days to for the full kcp 10 years. We fill in the gaps from the reverse engineered baseline by piecewise linear interpolation.
# Data Configuration


Files in this directory need to be processed into EDN format text files that will be installed with the tool inside
`resouces/public/lung/edn` or `resouces/public/kidney/edn`.

The  entry point for configuration tool that does this lives in the kcp.config clj namespace with an entry point at 
`kcp.configure/-main`.

Run the configuration tools from this directory with:
```
bb kidney
bb config
```

## Reconfiguration

Mostly, you will only need to run the configuration tool if there are revisions to the models, but if there are structural changes you may need to adjust or verify the configuration code too to ensure the resulting EDN text files are what you need.

To inspect the code and data, start the configuration tool in a clure REPL using
a **Calva Jack-in**. Open the project in Vscode and hit the key sequence ctl-C ctl-J. Select `clojure cli` first, then the `config` and `reveal` aliases. This will throw up a REPL and a further [reveal](https://github.com/vlaaad/reveal) window.

In the editor, navigate to `src/kcp/configure.clj` and evaluate the whole file using `ctl-c enter`. Individual forms may be selected and evaluated with `ctl-c e`. Forms inside `(comment)` blocks may be evaluated this way, but will be ignored at runtime.

 If you run the live comment code in `kcp.configure` in the REPL, you can see the resulting data structures more clearly in the reveal window. There, you can select the structure you wish to view and hit return for the various view options e.g. `view:table`.

After making a code change, always evaluate the form you have changed

## A note on the data formats

The xlsx master files in this folder contain all the necessary model data and some of the texts that are used at run time. The `config.edn` file specifies where that data is to be found inside the xlsx files. If you add or delete a column in the xlsx file you will need to edit `config.edn` so the configuration tool picks up on the change.

Inside `config.edn` is a single map with keys for the major sections. These are:

    :workbook
        For each organ
            The paths to the imported xlsx master files
    :export
        For each organ
            The paths to the exported EDN text files
    :bundles
        For each organ
            The bundle of sheets used by each tool
    :sheets
        For each organ
            The columns where data is to be found in each sheet

##Running the app in development
After a shadow-cljs jack-in, browse to the dashboard at localhost:9630. From here you can find links to the app and a small test suite in the test-browser.

To test the model against Leibovich go to:
http://localhost:3000/#/standard-error-test-848efcc3-938f-4dff-9b55-1f0394f29793

To run the app, go to http://localhost:3000/ 

The test suite is at http://localhost:3021/  which runs the :test-browser build.


****