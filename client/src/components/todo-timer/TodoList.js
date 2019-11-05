import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { sortBy } from "lodash";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../actions/todoActions";
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from '../common/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import Owl from '../../images/owl_books.png';
import Delete from 'material-ui-icons/Delete';
import styles from "../../styles";

class TodoList extends Component {
  state = { newTodo: '' }

  componentWillMount() {
    const { id: userId } = this.props.user;
    this.props.getTodos(userId)
  }

  addTodo = () => {
    const { newTodo } = this.state;

    if (newTodo) {
      const todo = {
        name: newTodo,
        userId: this.props.user.id
      }
      this.props.createTodo(todo);
      this.setState({newTodo: ''});
    }
  }

  removeTodo = (todo) => this.props.deleteTodo(todo)

  handleInput = (event, value) => this.setState({newTodo: value})

  handleCheck = (todo) => {
    todo.completed = !todo.completed;
    this.props.updateTodo(todo);
  }

  renderTodos(todos) {
    const { handleCheck, removeTodo } = this
    return(
      sortBy((todos || []), t => t.completed).map((todo, index) => (
        <div key={todo._id}>
          <p key={todo.name} style={styles.todo}>
            <span style={styles.inline}>
              <Checkbox
                checked={todo.completed}
                onCheck={() => handleCheck(todo)}
                style={styles.checkbox}
                iconStyle={{fill: '#1e88e5'}}
              />
            </span>
            <span style={todo.completed ? styles.todoCompleted : styles.todoText}>
              {todo.name}
            </span>
            {
              <span
                className='float-right'
                style={styles.inline}
                onClick={() => removeTodo(todo)}
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
    const { addTodo, handleInput } = this;
    const todos = this.props.todos || [];

    return (
      <div style={{marginBottom: 100}}>
        <br/>
        <div className="row">
          <div className="col s12 m10 offset-m1 l6 offset-m0 center">
            <Paper zDepth={1}>
              <div style={styles.todoList}>
                {
                  todos.length === 0 &&
                  <div className='center'>
                    <p style={styles.missingText}>
                      You need to add some todos!
                    </p>
                    <br/>
                    <Row>
                      <Col xs={{ size: 12 }}>
                        <img src={Owl} alt={"owl"} style={{maxWidth: 200}} className='responsive-img' />
                      </Col>
                    </Row>
                  </div>
                }
                {
                 todos.length > 0 &&
                 this.renderTodos(todos)
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
                  value={this.state.newTodo}
                  onChange={handleInput}
                  onEnter={addTodo}
                />
              </Col>
              <Col xs={3} sm={2}>
                <FloatingActionButton onClick={addTodo} backgroundColor="#1e88e5">
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

const mapStateToProps = state => ({
  todos: state.todo.todos,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getTodos, createTodo, updateTodo, deleteTodo }
)(TodoList);
