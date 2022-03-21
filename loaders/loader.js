module.exports = function loader(source) {
    const {env: {DEPLOY}} = this.getOptions();
    const deploy = JSON.parse(source)
    return JSON.stringify(deploy[DEPLOY])
}