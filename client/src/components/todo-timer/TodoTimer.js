import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TodoList from './TodoList'
import Timer from './Timer'

class TodoTimer extends Component {
  render() {
    const cycles = [25, 5];

    return (
      <div>
        <Container fluid={true} className='todo-timer'>
          <br/>
          <br/>
          <br/>
          <Row>
            <Col xs={{size: 12, order: 2}} md={{size: 6, order: 1}}>
              <div className='text-center'>
                <TodoList />
              </div>
            </Col>
            <Col xs={{size: 12, order: 1}} md={{size: 6, order: 2}}>
              <div className='text-center'>
                <Timer cycles={cycles} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TodoTimer;
