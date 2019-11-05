import React, { Component } from 'react';
import TextFieldMui from 'material-ui/TextField';

class TextField extends Component {
  handleEnter(event){
    if (event.key === 'Enter') {
      if(this.props.onEnter){
        this.props.onEnter();
      }
    }
  }

  render() {
    return (
      <TextFieldMui
        floatingLabelFocusStyle={{color: "#1e88e5"}}
        underlineFocusStyle={{borderColor: "#1e88e5"}}
        onKeyPress={this.handleEnter.bind(this)}
        {...this.props}
      />
    );
  }
}

export default TextField;
