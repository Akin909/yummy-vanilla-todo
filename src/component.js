//=============================================
// Component
//=============================================

class Component {
  constructor(props) {
    this.root = document.getElementById('root');
    this.subscribers = [this.root];
    this.state = {};
  }

  setState(prevState, newState) {
    const { prop, value } = newState;
    const valueToUpdate = prevState[prop];
    this.state = {
      ...this.state,
      [prop]: Array.isArray(prevState[prop])
        ? [...this.state[prop], value]
        : value
    };
    this.render();
  }

  renderList(array, domNode) {
    array.forEach(item => {
      if (item.length < 1) return;
      const li = this.createElement('li', item);
      domNode.innerHTML += li;
    });
  }

  createElement(element, item) {
    return `<${element} id="${element}">${item || ''}</${element}>`;
  }

  createComponent(domNode, component) {
    const element = this.createElement(component);
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
      !subscriber.id === 'input'
        ? (changeEvent = 'click')
        : (changeEvent = 'change');
      subscriber.addEventListener(`${changeEvent}`, action);
    });
  }

  render() {
    console.log(this.state);
    if (!this.findElement('root')) {
      this.createComponent(this.root, 'input');
    }
    return Object.values(this.state).map(stateValue => {
      switch (typeof stateValue) {
        case 'number':
        case 'string':
          return (root.textContent = stateValue);
        case 'object':
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
