import React, { Component } from "react";

class MakeRequestTextForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fullName: "",
        numberOfPeople: 0,
        personalStory: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
        
        event.preventDefault();
        this.props.setPersonalStory(this.state.fullName, this.state.numberOfPeople, this.state.personalStory);
        
      }
  
    render() {
      return (
          <div className="formDetails">
        <form>
            <div className="request-fullname">
          <label >
            Full Name:
            <input
              name="fullName"
              type="text"
              checked={this.state.fullName}
              onChange={this.handleInputChange} />
          </label>
          </div>
          <br />
          <div className="request-PersonCount">
          <label >
            Number of People:
            <input
              name="numberOfPeople"
              type="number"
              value={this.state.numberOfPeople}
              onChange={this.handleInputChange} />
          </label>
          </div>
          <div className="request-personalStory">
          <label >
            Personal Story:
            <textarea
              name="personalStory"
              value={this.state.personalStory}
              onChange={this.handleInputChange} />
          </label>
          </div>
        </form>
        <button type="button" onClick={this.handleSubmit}>Submit To xDai Blockchain</button>
         </div>
      );
    }
  }

  export default MakeRequestTextForm;