import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

// Field element ko render karna nahi aata
// It is only used to send the data to automate reducer stuff
// so we send a component as component prop
// meta.touch is true when user has interacted i.e touch and removed

class StreamCreate extends Component {
  onSubmit = (formValues) => {
    //gives you access to values to send to api
    this.props.createStream(formValues);
    // this.props.createStream(formValues);
  };
  //in field anytime you send a props that it doesnt have, it'll simply forward it ..

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
