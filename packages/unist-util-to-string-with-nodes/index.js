const toList = require('unist-util-to-list-of-char');

function toString(tree) {
  let final = { text: '', nodes: [] };
  toList(tree, (list) => {
    final = list.reduce((result, node) => {
      result.text += node.value; // eslint-disable-line
      result.nodes.push(node);
      return result;
    }, final);
  });
  return final;
}

module.exports = toString;
