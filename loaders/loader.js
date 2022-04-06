module.exports = function loader(source) {
  const {
    env: { DEPLOY }
  } = this.getOptions();
  console.log("loader");
  const deploy = JSON.parse(source);
  return JSON.stringify(deploy[DEPLOY]);
};
