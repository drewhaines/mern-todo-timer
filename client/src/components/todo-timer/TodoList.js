import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from './TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import Owl from '../../images/owl_books.png';
import Delete from 'material-ui-icons/Delete';

const styles = {
  todoList: {
    height: 350,
    textAlign: "left",
    overflowY: "auto",
    overflowX: "hidden",
  },
  textField: {
    marginRight: 10,
    fontSize: 20
  },
  missingText: {
    marginTop: 50,
    color: 'grey',
    padding: '0px 30px',
    fontSize: 16
  },
  todo: {
    padding: '15px 15px',
    margin: 0,
  },
  checkbox: {
    display: 'inline-block',
    position: 'relative',
    top: 5
  },
  todoText: {
    display: 'inline-block',
    position: 'relative',
    fontSize: 18
  },
  todoCompleted: {
    display: 'inline-block',
    position: 'relative',
    fontSize: 18,
    color: 'grey',
    textDecoration: 'line-through'
  },
  inline: {
    display: 'inline-block'
  },
  delete: {
    width: 25,
    height: 25,
    position: 'relative',
    top: 4,
    cursor: 'pointer'
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {name: '', completed: false}
    };
  }

  addTodo() {
    let todos = this.state.todos;

    if(this.state.newTodo && this.state.newTodo.name) {
      todos.push(this.state.newTodo)
      this.setState({todos: todos, newTodo: {name: '', completed: false}});
    }
  }

  removeTodo(index) {
    let todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({todos: todos})
  }

  handleInput(event, value){
    this.setState({newTodo: {name: value}})
  }

  handleCheck(index, event, value){
    let todos = this.state.todos;
    todos[index]['completed'] = value;
    this.setState({todos: todos})
  }

  renderTodos(todos) {
    return(
      todos.map((todo, index) => (
        <div>
          <p key={todo.name} style={styles.todo}>
            <span style={styles.inline}>
              <Checkbox
                checked={todo.completed}
                onCheck={this.handleCheck.bind(this, index)}
                style={styles.checkbox}
                iconStyle={{fill: '#1e88e5'}}
              />
            </span>
            <span style={todo.completed ? styles.todoCompleted : styles.todoText}>
              {todo.name}
            </span>
            {
              !todo.completed &&
              <span
                className='float-right'
                style={styles.inline}
                onClick={this.removeTodo.bind(this, index)}
              >
                <Delete style={styles.delete} color='grey' />
              </span>
            }
          </p>
          <Divider />
        </div>
      ))
    );
  }

  render() {
    return (
      <div style={{marginBottom: 100}}>
        <br/>
        <div className="row">
          <div className="col s12 m10 offset-m1 l6 offset-m0 center">
            <Paper zDepth={1}>
              <div style={styles.todoList}>
                {
                  this.state.todos.length === 0 &&
                  <div className='center'>
                    <p style={styles.missingText}>
                      You need to add some todos to your list!
                    </p>
                    <Row>
                      <Col xs={{ size: 4, offset: 4 }}>
                        <img src={Owl} alt={"owl"} style={{maxWidth: 200}} className='responsive-img' />
                      </Col>
                    </Row>
                  </div>
                }
                {
                 this.state.todos.length > 0 &&
                 this.renderTodos(this.state.todos)
                }
              </div>
              <br/>
            </Paper>
            <Row style={{marginTop: 50}}>
              <Col xs={9} sm={10}>
                <TextField
                  style={styles.textField}
                  fullWidth={true}
                  floatingLabelText="Add New Todo"
                  floatingLabelStyle={{fontSize: 20}}
                  value={this.state.newTodo.name}
                  onChange={this.handleInput.bind(this)}
                  onEnter={this.addTodo.bind(this)}
                />
              </Col>
              <Col xs={3} sm={2}>
                <FloatingActionButton onClick={this.addTodo.bind(this)} backgroundColor="#1e88e5">
                  <ContentAdd />
                </FloatingActionButton>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
