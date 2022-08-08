import cartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		//item already in cart
		if (state.items.some((item) => item.id === action.item.id)) {
			const updatedItems = state.items.map((item) => {
				if (item.id === action.item.id)
					return { ...item, amount: item.amount + action.item.amount };
				else return item;
			});
			const totalAmount =
				state.totalAmount + action.item.amount * action.item.price;
			return { items: updatedItems, totalAmount: totalAmount };
		} else {
			const updatedItems = [...state.items, action.item];
			const totalAmount =
				state.totalAmount + action.item.amount * action.item.price;
			return { items: updatedItems, totalAmount: totalAmount };
		}
	}

	if (action.type === 'REMOVE') {
		let totalAmount = state.totalAmount;

		const updatedItems = state.items.filter((item) => {
			if (item.id === action.id) {
				totalAmount = totalAmount - item.amount * item.price;
			}
			return item.id !== action.id;
		});
		return { ...state, items: updatedItems, totalAmount: totalAmount };
	}

	if (action.type === 'INC') {
		let totalAmount = state.totalAmount;
		const updatedItems = state.items.map((item) => {
			if (item.id === action.id) {
				totalAmount += item.price;
				return { ...item, amount: item.amount + 1 };
			} else return item;
		});
		return { ...state, items: updatedItems, totalAmount: totalAmount };
	}

	if (action.type === 'DEC') {
		let totalAmount = state.totalAmount;
		const updatedItems = state.items.map((item) => {
			if (item.id === action.id) {
				totalAmount -= item.price;
				return { ...item, amount: item.amount - 1 };
			} else return item;
		});
		return { ...state, items: updatedItems, totalAmount: totalAmount };
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const onAddItem = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const onRemoveItem = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const onDecrease = (id) => {
		dispatchCartAction({ type: 'DEC', id: id });
	};

	const onIncrease = (id) => {
		dispatchCartAction({ type: 'INC', id: id });
	};

	const cartContextData = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: onAddItem,
		removeItem: onRemoveItem,
		increaseAmount: onIncrease,
		decreaseAmount: onDecrease,
	};

	return (
		<cartContext.Provider value={cartContextData}>
			{props.children}
		</cartContext.Provider>
	);
};

export default CartProvider;
