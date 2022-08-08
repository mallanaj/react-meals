import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import cartContext from '../../store/cart-context';
import { useContext, useState } from 'react';
import Input from '../UI/Input';

const Cart = (props) => {
	const [isError, setIsError] = useState(false);
	const cartCtx = useContext(cartContext);

	const decreaseAmount = (item) => {
		// when amount(count) is 1, remove item
		if (item.amount === 1) {
			cartCtx.removeItem(item.id);
		} else {
			setIsError(false);
			cartCtx.decreaseAmount(item.id);
		}
	};
	const increaseAmount = (item) => {
		// max 5 quantity allowed
		if (item.amount >= 5) {
			setIsError(true);
		} else {
			setIsError(false);
			cartCtx.increaseAmount(item.id);
		}
	};

	const cartItems = cartCtx.items.length ? (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<li key={item.id} className={classes.itemlist}>
					<div>
						<h3>{item.name}</h3>
						<div className={classes.priceamount}>
							<p key={item.id}>{`$${item.price.toFixed(2)}`}</p>
							<Input
								input={{
									id: item.id,
									type: 'input',
									min: '0',
									max: '5',
									value: `x ${item.amount}`,
								}}
							/>
						</div>
					</div>
					<div className={classes.btnGroup}>
						<button
							className={classes.btn}
							onClick={() => decreaseAmount(item)}
						>
							-
						</button>
						<button
							className={classes.btn}
							onClick={() => increaseAmount(item)}
						>
							+
						</button>
					</div>
				</li>
			))}
		</ul>
	) : (
		<h5>Cart is Empty</h5>
	);

	const orderHandler = () => {
		console.log('Food ordered......');
		props.onClose();
	};
	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			{isError && (
				<p className={classes.error}>
					Max 5 Quantity is allowed for each Meal item
				</p>
			)}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button-alt']} onClick={props.onClose}>
					Close
				</button>
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			</div>
		</Modal>
	);
};

export default Cart;
