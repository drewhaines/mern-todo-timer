export const styles = {
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
  },
  icon: {
    width: 25,
    height: 25,
    position: 'relative',
    cursor: 'pointer'
  },
  dialogHeight: {
    marginTop: 25,
    minHeight: 200
  },
  deleteCycle: {
    width: 35,
    height: 35,
    position: 'relative',
    top: 30,
    left: 10,
    cursor: 'pointer'
  },
  timer: {
    fontSize: 30,
    marginTop: 100,
  }
}

export default styles;
