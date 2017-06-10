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
    const todo = this.findElement('input').value;
    this.setState(this.state, { prop: 'todo', value: todo });
    this.renderList(this.state.todo, this.root);
  }
}

const newTodo = new Todo();
const todo = new CustomEvent('todo', {
  detail: {
    todo: 'stuff'
  }
});

//==============================================
//RENDER
//==============================================
const action = newTodo.addTodo.bind(newTodo);
newTodo.render(action, null, () => {
  newTodo.createComponent(newTodo.root, 'form', null, null, action);
  newTodo.createComponent(
    newTodo.findElement('form'),
    'input',
    'submit',
    'js-submit',
    action
  );
});
