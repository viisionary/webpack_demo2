class MyFirstWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    /**
     * // https://webpack.js.org/api/compiler-hooks/
     * @param compiler
     */
    apply(compiler) {
        // environment =>
        // afterEnvironment =>
        // entryOption =>
        // afterPlugins=>
        // afterResolvers=>
        // initialize
        // beforeRun
        // run
        // watchRun

        compiler.hooks.done.tap("MyFirstWebpackPlugin", (stats) => {
            console.log(`hooks.done`, this.options.env)
        })
    }
};

module.exports = MyFirstWebpackPlugin;