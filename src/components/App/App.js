import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      error: ""
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => this.setState({ orders: data.orders }))
    .catch(err => this.setState({error: err.message}))
  }

  addOrder = async newOrder => {
    await fetch('http://localhost:3001/api/v1/orders', {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json)
    .then(this.setState({ orders: [...this.state.orders, newOrder] }))
    .catch(err => this.setState({error: err.message}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>
        <section className="orders-display">
        {this.state.orders && <Orders orders={this.state.orders}/>}
        </section>
      </main>
    );
  }
}


export default App;
