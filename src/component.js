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
    const ul = this.createElement('ul');
    domNode.innerHTML += ul;
    const ulNode = this.findElement('ul');
    this.empty(ulNode);
    array.forEach(item => {
      const li = this.createElement('li', item);
      ulNode.innerHTML += li;
    });
  }

  empty(domNode) {
    while (domNode.firstChild) {
      domNode.removeChild(domNode.firstChild);
    }
  }

  createElement(element, item, type, uniqueId) {
    switch (element) {
      case 'form':
        return `<${element} id=${element}>
                    <input id="input" type="text" />
                </${element}>`;
      default:
        return `
        <${element} id="${uniqueId || element}" type="${type}">
            ${item || ''}
          </${element}>`;
    }
  }

  createComponent(domNode, component, type, uniqueId, action) {
    const element = this.createElement(component, null, type, uniqueId);
    domNode.innerHTML += element;
    const subscriber = this.subscribe(component);
    console.log('action', action);
    this.attachListeners(subscriber, action);
  }

  subscribe(element) {
    const node = this.findElement(element);
    this.subscribers.push(node);
    return node;
  }

  findElement(element) {
    return document.getElementById(element);
  }

  attachListeners(component, action) {
    let changeEvent;
    if (component) {
      switch (component.id) {
        case 'form':
          changeEvent = 'submit';
          break;
        case 'js-submit':
          changeEvent = 'submit';
          break;
        default:
        //changeEvent = 'click';
      }
      component.addEventListener(`${changeEvent}`, e => {
        console.log('responding', component);
        console.log('action', action);
        e.preventDefault();
        if (action) {
          action(event);
        }
        this.render(action);
      });
    }
  }

  render(action, component, fns) {
    if (fns) {
      fns();
    }
    if (action) {
      this.attachListeners(component, action);
    }
  }
}

export default Component;
