const getRoot = () => document.getElementById('root');

const createDomElement = (type, className, innerValue = '', id = '') => {
  switch (type) {
    case 'ul':
    case 'div':
      return !className
        ? (
            className,
            innerValue = '',
            id = ''
          ) => `<${type} class="${className}" id="${id}">${innerValue}</${type}>`
        : `<${type} class="${className}" id="${id}">${innerValue}</${type}>`;
    case 'a':
      return `<${type} class="${className}" id="${id}">${innerValue}</${type}>`;
    case 'form':
      return `<form id="${id}">${innerValue}</form>`;
    case 'input':
      return inputType => `<input type=${inputType} id="${id}"/>`;
    case 'button':
      return `<input type="button" id="${id}"/>`;
    case 'textInput':
      return `<input type="text" id="${id}"/>`;
    default:
      return;
  }
};

(() => {
  const root = getRoot();
  const createDiv = createDomElement('div');
  const createList = createDomElement('ul');
  const TodoContainer = createDiv('todo-container', createList('todo-list'));
  console.log('TodoContainer', TodoContainer);
  root.innerHTML += createDomElement('div', 'test-layout', TodoContainer);
})();
