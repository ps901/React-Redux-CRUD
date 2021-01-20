import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

// Field element ko render karna nahi aata
// It is only used to send the data to automate reducer stuff
// so we send a component as component prop
// meta.touch is true when user has interacted i.e touch and removed

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui message error">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(formProps);
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      // <input
      // onChange={formProps.input.onChange}
      // value={formProps.input.value}
      // />
      //<input {...input} /> // shorthand to above
      // we use this to make it controlled input as earlier
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    //gives you access to values to send to api
    this.props.onSubmit(formValues);
    // this.props.createStream(formValues);
  };
  //in field anytime you send a props that it doesnt have, it'll simply forward it ..

  render() {
    return (
      //1. whatever will send as prop will run on submit of form 2. handleSubmit from form 3. our function
      // note handlesubmit will do preventDefault
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// validate will run on every event (select/deselect/submit)
// we need to show error only after user attempts to submit the form or clicks out of if(focus remove)
// also need to remove autocomplete(optional)

const validate = (formValue) => {
  const errors = {}; // each if can add error
  if (!formValue.title) {
    // only run if the user did not enter the title
    errors.title = "You must enter a title";
  }
  if (!formValue.description) {
    // only run if the user did not enter the title
    errors.description = "You must enter a description";
  }
  // console.log(errors);
  return errors;
};

// pass object as config unless connect(it is similar to connect)
// you also need to wrap around connect .. you can wrap entire reduxform in connect or
// use this new syntax
const formWrapped = reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);

//earlier we had connect
export default formWrapped;
