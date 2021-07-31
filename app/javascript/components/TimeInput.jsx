import React, { Component, createRef } from "react";

import { timeStrToMins } from "../utils/timeUtil";

class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.currVal = "";
    this.state = {
      keyVal: "",
      formattedVal: this.props.default,
      minutes: 0
    };
    this.inputRef = createRef();

    this.props.changeNotify(timeStrToMins(this.props.default));
  }

  componentDidUpdate(prevProps, prevState) {
    //Typical usage, don't forget to compare the props
    if (this.props?.default !== prevProps?.default) {
      this.setState({ formattedVal: this.props.default });
      this.props.changeNotify(timeStrToMins(this.props.default));
    }
   }

  onInputHandle = e => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.length > 4) value = value.slice(0, 4);

    if (value) {
      if (value.length === 1) {
        if (Number(value) > 2) value = "0" + value;
      }
      if (value.length < 4) {
        this.currVal = value;
      } else if (value.length == 4) {
        let h = Number(value.slice(0, 2));
        let m = Number(value.slice(2));
        h = Math.min(h, 23);
        m = Math.min(m, 59);

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;

        this.currVal = `${h}:${m}`;
      }
    } else {
      this.currVal = "";
    }

    const formattedVal = this.currVal;
    this.setState({ formattedVal, 
      minutes: timeStrToMins(formattedVal) 
    });
    this.props.changeNotify(timeStrToMins(formattedVal));
  };

  validateTimeInput(inputVal) {
    let val = inputVal.replace(/[^0-9]+/g, ""); //Remove all non-numeric characters

    if (!val) return "";

    if (val[0] > 2) return "0" + val;
  }

  render() {
    return (
      <div>
        <input
          className="time-input"
          type="text"
          onChange={this.onInputHandle}
          ref={this.inputRef}
          onClick={e => e.target.select()}
          onInput={this.onInputHandle}
          value={this.state.formattedVal}
        />
      </div>
    );
  }
}

export default TimeInput;
