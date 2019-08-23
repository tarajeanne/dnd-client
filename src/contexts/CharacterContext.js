import React from 'react';

export const CharacterContext = React.createContext({
  character: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setCharacter: () => {},
})

export default CharacterContext;

export class CharacterProvider extends React.Component {
  state = {
    character: {},
    error: null
  }

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setCharacter = character => {
    this.setState({ character })
  }

  render() {
    const value = {
      character: this.state.character,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCharacter: this.setCharacter
    }

    return (
      <CharacterContext.Provider value={value}>
        {this.props.children}
      </CharacterContext.Provider>
    )
  }
}