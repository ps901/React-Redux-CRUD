import React from "react";
import ReactDOM from "react-dom";

//When using portal return value changes
function Modal(props) {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      {/* stop propagation makes sure that child doesnt inherit the function */}
      <div
        className="ui standard modal visible active"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;
