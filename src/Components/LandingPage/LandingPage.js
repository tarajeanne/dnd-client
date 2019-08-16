import React from 'react';
import { Redirect } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateCharacter(this.state.value);
    this.props.changeScreen('class')
    this.setState({
      toRace: true
    });
  }

  render() {
    if (this.state.toRace) {
      return <Redirect to={'/race'} />
    }
    return (
      <section>
        <header>Welcome to the Dungeons and Dragons character creator for true beginners!</header>
        <form onSubmit={this.handleSubmit}>
          <label for="name-input">Please enter a name for your character:</label>
          <input 
            name="name-input" 
            value={this.state.value} 
            onChange= {this.handleChange}
            id="name-input" 
            type="text" 
            placeholder="Sabrill of Savernke">
          </input>
        </form>
      </section>
      

    )
  }
}

export default LandingPage;