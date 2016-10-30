import React from "react";
import Comment from "./comments/comment"


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <Comment>
      </Comment>
    );
  }
}
