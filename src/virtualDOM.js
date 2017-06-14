export const doc = document;

function create(type, props, ...children) {
  return { type, props: props || {}, children };
}

function createElement(node) {
  if (typeof node === 'string') {
    doc.createTextNode(node);
  }
  const $el = doc.createElement(node.type);
  if (node.props) {
    setProps($el, node.props);
  }
  if (node.children) {
    node.children
      .map(child => createElement(create(child)))
      .forEach($el.appendChild.bind($el));
  }
  return $el;
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function isCustomProp(name) {
  return false;
}

function changed(firstNode, secondNode) {
  return (
    typeof firstNode !== typeof secondNode ||
    (typeof firstNode === 'string' && firstNode !== secondNode) ||
    firstNode.type !== secondNode.type
  );
}

export function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    //$parent.appendChild(createElement(newNode));
    $parent.appendChild(newNode);
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

export function jsxElement(jsx) {
  console.log('jsx', jsx);
  const { html, props } = jsxify(jsx);
  const type = html[0];
  const children = html.slice(1);
  const node = create(type, props, ...children);
  console.log('node', node);
  return createElement(node);
}

function jsxify(string) {
  //matches anything in parentheses
  const propsRegExp = /\(([^)]+)\)/;
  //Exec returns a bunch of crud only want the matching result
  const props = {};
  let matches = propsRegExp.exec(string);
  if (matches) {
    matches = matches[1].split(':');
    props[matches[0]] = matches[1];
  }

  const htmlWithExcess = string[0]
    //removes parentheses then newline characters
    .replace(/\(.*?\)/g, '')
    .replace(/\n/g, ' ')
    .split(' ');
  //console.log('props', props);
  return {
    html: htmlWithExcess.filter(element => element !== ''),
    props
  };
}
