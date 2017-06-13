const doc = document;
const getRoot = () => doc.getElementById('root');

function curry(fn) {
  return function() {
    if (fn.length > arguments.length) {
      const slice = Array.prototype.slice;
      const args = slice.apply(arguments);
      return function() {
        return fn.apply(null, args.concat(slice.apply(arguments)));
      };
    }
    return fn.apply(null, arguments);
  };
}

function create(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === 'string') {
    doc.createTextNode(node);
  }
  const $el = doc.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(firstNode, secondNode) {
  return (
    typeof firstNode !== typeof secondNode ||
    (typeof firstNode === 'string' && firstNode !== secondNode) ||
    firstNode.type !== secondNode.type
  );
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

console.log('create', createElement(create('h1')));

const findElement = element => {
  return doc.querySelector(`#${element}`) || doc.querySelector(`.${element}`);
};

const appendToDom = curry((parent, child) => {
  findElement(parent).appendChild(child);
});

(function() {
  const root = findElement('root');
})();
