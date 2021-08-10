import React, { Component } from 'react';
import "./OrderForm.css"

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      isReady: true
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    this.props.addOrder(newOrder)
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
    const { name } = event.target
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
    const ingredientButtons = possibleIngredients.map((ingredient, index) => {
      return (
        <button key={ingredient} name={ingredient} data-cy="ingButton" className="ingButton" id={index} onClick={e => this.handleIngredientChange(e)}>
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
        <section className="buttons-section">
        { ingredientButtons }
        </section>

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button 
          disabled={this.state.isReady} 
          data-cy="submit"
          onClick={e => this.handleSubmit(e)}
        >
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
