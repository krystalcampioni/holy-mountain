import { dispatch, register } from '../dispatchers/app-dispatcher';
import AppConstants from '../constants/app-constants';
import { EventMitter } from 'events';

const CHANGE_EVENT = 'change';

var _catalog = [];

for (let i = 1; i < 9; i++){
  _catalog.push({
    'id': 'Item' + i,
    'title': 'Item #' + i,
    'summary': 'A great item',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'cost': i
  })
}

var cartItems = [];

const _removeItem = (item) => {
  _cartItems.splice( _cartItems.findIndex( i => i === item ), 1);
};

const _findCartItem = (item) => {
  return _cartItems.find( cartItem => cartItem.id === item.id)
};

const _increaseItem = (item) => item.qty++;

const _decreaseItem = (item) => {
  item.qty--;
  if ( item.qty === 0 ){
    _removeItem(item);
  }
};

const _addItem = (item) => {
  const cartItem = _findCartItem(item);
  if(!cartItem){
    _cartItems.push( Object.assign({ qty: 1}, item) );
  }
  else {
    _increaseItem(cartItem);
  }
};

const _cartTotals = ( qty = 0, total = 0) => {
  _cartItems.forEach( cartItem => {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });
  return { qty, total };
};

const AppStore = Object.assign(EventMitter.prototype, {
  emitChange(){
    this.emit( CHANGE_EVENT )
  },
  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback){
    this.remove(CHANGE_EVENT, callback)
  },
  getCart(){
    return _cartItems;
  },
  getCatalog(){
    return _catalog.map(item => {
      return Object.assign( {}, item, _cartItems.find( cItem => cItem.id === item.id))
    })
  },

  getCartTotals(){
    return _cartTotals();
  }

  dispatcherIndex: register( function(action){
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        _removeItem(action.item);
        break;
      case AppConstants.INCREASE_ITEM:
        _increaseItem(action.item);
        break;
      case AppConstants.DECREASE_ITEM:
        _decreaseItem(action.item);
        break;
    }

    AppStore.emitChange();
  })
});

export default AppStore;
