import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      isReady: true
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
  }

  handleNameChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value }, () => {
      this.validateInputs()
    })
  }

  handleIngredientChange = async event => {
    event.preventDefault()
    const { name, value } = event.target
    await this.setState({ ingredients: [...this.state.ingredients, [name]] }, () => {
      this.validateInputs()
    })
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  validateInputs = () => {
    if (this.state.name && this.state.ingredients.length) {
      this.setState({ isReady: false })
    } else {
      this.setState({ isReady: true })
    }
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button 
          disabled={this.state.isReady} 
          onClick={e => this.handleSubmit(e)}
        >
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
