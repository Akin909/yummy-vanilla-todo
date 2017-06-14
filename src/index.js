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
  appendToDom('root', jsxElement`div(class:todo-container) button`);
  updateElement(findElement('todo-container'), jsxElement`ul(class:todo-list)`);
})();
