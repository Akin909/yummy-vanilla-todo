export const doc = document;

export function create(type, props, ...children) {
  return { type, props, children };
}

export function createElement(node) {
  if (typeof node === 'string') {
    doc.createTextNode(node);
  }
  const $el = doc.createElement(node.type);
  if (node.props) {
    node.props.forEach(prop => {
      let [key] = Object.keys(prop);
      addProp($el, key, prop);
    });
  }
  if (node.children) {
    node.children
      .map(child => createElement(create(child)))
      .forEach($el.appendChild.bind($el));
  }
  return $el;
}

export function addProp($el, key, prop) {
  switch (key) {
    case 'id':
      $el.id = prop[key];
      break;
    case 'class':
      $el.className = prop[key];
      break;
    default:
      return $el;
  }
}

export function changed(firstNode, secondNode) {
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
  const { html, props } = jsxify(jsx);
  const type = html[0];
  const children = html.slice(1);
  const node = create(type, [props], ...children);
  console.log('node', node);
  return createElement(node);
}

export function jsxify(string) {
  //matches anything in parantheses
  const propsRegExp = /\(([^)]+)\)/;
  //Exec returns a bunch of crud only want the matching result
  const matches = propsRegExp.exec(string)[1];
  const matchesToProps = matches.split(':');
  const props = { [matchesToProps[0]]: matchesToProps[1] };
  const htmlWithExcess = string[0]
    //removes parentheses then newline characters
    .replace(/\(.*?\)/g, '')
    .replace(/\n/g, ' ')
    .split(' ');
  return {
    html: htmlWithExcess.filter(element => element !== ''),
    props
  };
}
