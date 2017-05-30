import Component from './component';
//=============================================
// TODO APP
//=============================================

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: []
    };
  }
  addTodo(event) {
    console.log('event target', event);
    const todo = event.target.value;
    this.setState(this.state, { prop: 'todo', value: todo });
  }
}

const newTodo = new Todo();
const form = () => newTodo.createComponent(newTodo.root, 'form');
const button = () =>
  newTodo.createComponent(newTodo.findElement('form'), 'input', 'submit');
newTodo.render(newTodo.addTodo.bind(newTodo), null, [form, button]);
