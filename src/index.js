import _ from "lodash";
import Icon from "./img.png";
import "./file2";

const temp = (tag, innner) => {
  const h22 = document.createElement(tag);
  h22.innerHTML = innner;
  return h22;
};

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack", "hahah"], " ");
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  element.appendChild(temp("h6", "plugin: 允许访问编译的整个生命周期"));
  element.appendChild(temp("h6", "loader: 交代如何处理某一类型的文件"));

  return element;
}

document.body.appendChild(component());
