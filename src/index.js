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
  addTodo(todo) {
    this.attachListeners();
    this.setState(this.state, { prop: 'todo', value: todo });
  }
}

const newTodo = new Todo();
newTodo.addTodo('hello world');
newTodo.render(function() {
  console.log('hello world');
});
