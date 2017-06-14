import { jsxElement, doc, updateElement } from './virtualDOM';
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

const findElement = element => {
  return doc.querySelector(`#${element}`) || doc.querySelector(`.${element}`);
};

const appendToDom = curry((parent, child) => {
  findElement(parent).appendChild(child);
});

(function() {
  const root = findElement('root');
  updateElement(root, jsxElement`div(className:todo-container)`);
  const container = findElement('todo-container');
  updateElement(container, jsxElement`ul(className:todo-list) li`);
  updateElement(container, jsxElement`button(className:js-button)`);
})();

findElement('js-button').onclick = e =>
  updateElement(findElement('todo-list'), jsxElement`li(class:todo)`);
