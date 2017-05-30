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
    const todo = event.target.value;
    this.setState(this.state, { prop: 'todo', value: todo });
    this.renderList(this.state.todo, this.root);
  }
}

const newTodo = new Todo();
const form = () => newTodo.createComponent(newTodo.root, 'form');
const button = () =>
  newTodo.createComponent(newTodo.findElement('form'), 'input', 'submit');

//==============================================
//RENDER
//==============================================
//newTodo.render(newTodo.addTodo.bind(newTodo), null, [form, button]);
newTodo.render(newTodo.addTodo.bind(newTodo), null, () => {
  newTodo.createComponent(newTodo.root, 'form');
  newTodo.createComponent(newTodo.findElement('form'), 'input', 'submit');
});
