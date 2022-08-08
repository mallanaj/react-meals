import { createContext } from "react";

const cartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  increaseAmount: (id) => {},
  decreaseAmount: (id) => {},
  clearCart: () => {},
});

export default cartContext;
