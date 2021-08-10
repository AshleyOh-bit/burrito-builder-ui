import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, index) => {
    return (
      <div className="order" data-cy="orderCard" key={index}>
        <h3 data-cy="orderName">{order.name}</h3>
        <ul className="ingredient-list" key={order.name} data-cy="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index} data-cy="ingredients">{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;