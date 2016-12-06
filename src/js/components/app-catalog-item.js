import React from 'react';
import AppActions from '../actions/app-actions';
import CartButton from './app-cart-button';

export default (props) => {
  return (
    <div>
      <h4>{props.item.title}</h4>
      <img src="http://placehold.it/250X250"/>
      <p>{props.item.summary}</p>
      <p>{props.item.cost}</p>
      <CartButton
        handler={AppActions.addItem.bind(null, props.item)}
        txt="Add to Cart"
        />
    </div>
  )
}
