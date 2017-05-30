//=============================================
// Component
//=============================================

const string = 'string';
const number = 'number';
const object = 'object';

class Component {
  constructor(props) {
    this.root = document.getElementById('root');
    this.subscribers = [];
    this.mounted = false;
    this.state = {};
  }

  setState(prevState, newState) {
    const { prop, value } = newState;
    const valueToUpdate = prevState[prop];
    this.state = {
      ...this.state,
      [prop]: Array.isArray(prevState[prop]) ? [...valueToUpdate, value] : value
    };
    this.render();
  }

  renderList(array, domNode) {
    if (array.length < 1) return;
    array.forEach(item => {
      const li = this.createElement('li', item);
      domNode.innerHTML += li;
    });
  }

  createElement(element, item, type) {
    switch (element) {
      case 'form':
        return `<${element} id=${element}>
                    <input id="input" type="text" />
                </${element}>`;
      default:
        return `<${element} id="${element}" type="${type}">${item || ''}</${element}>`;
    }
  }

  createComponent(domNode, component, type) {
    const element = this.createElement(component, null, type);
    domNode.innerHTML += element;
    this.subscribe(component);
    this.attachListeners();
  }

  subscribe(element) {
    const node = this.findElement(element);
    this.subscribers.push(node);
  }

  findElement(element) {
    return document.getElementById(element);
  }

  attachListeners(action) {
    this.subscribers.forEach(subscriber => {
      let changeEvent;
      switch (subscriber.id) {
        case 'input':
          changeEvent = 'change';
          break;
        case 'form':
          changeEvent = 'submit';
          break;
        case 'button':
          changeEvent = 'click';
          break;
        default:
          changeEvent = 'click';
      }
      subscriber.addEventListener(`${changeEvent}`, e => {
        console.log('a thing happened', action);
        e.preventDefault();
        if (action) {
          action(event);
        }
        this.render(action);
      });
    });
  }

  render(action, component, fns) {
    if (fns) {
      fns.forEach(fn => fn());
    }
    if (component) {
      this.createComponent(this.root, component);
    }
    if (action) {
      this.attachListeners(action);
    }
    return Object.values(this.state).map(stateValue => {
      switch (typeof stateValue) {
        case number:
        case string:
          return (root.textContent = stateValue);
        case object:
          return Array.isArray(stateValue)
            ? this.renderList(stateValue, root)
            : this.renderList(Object.values(stateValue, root));
        default:
          return (root.TextContent = 'State is not a Javascript Type');
      }
    });
  }
}

export default Component;
