import React from  'react';
import AppActions from '../actions/app-actions';
import Catalog from './app-catalog';
import Cart from './app-cart';

export default class App extends React.Component {
  render(){
    return (
      <section>
        <Catalog />
        <Cart />
      </section>
    )
  }
}
