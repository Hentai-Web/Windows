const dirTree = require("directory-tree");
const path = require("path");

const tree = dirTree(path.resolve(__dirname, "dist"), { extensions: /\.js$/ });
tree.children.map((item) => {
  try {
    const tree = dirTree(path.resolve(__dirname, "dist"), { extensions: /\.js$/ });
    const pa = tree + item;
    pa.map((item) => {
      console.log(item.name);
    });
  } catch (error) {
    console.log(item.name);
  }
});
