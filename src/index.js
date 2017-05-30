import Component from './component';
//=============================================
// TODO APP
//=============================================

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [props]
    };
  }
  addTodo(todo) {
    this.attachListeners()
    this.setState(this.state, { prop: 'todo', value: todo });
  }
}

const newTodo = new Todo('Do a Thing!');
newTodo.addTodo('hello world');


