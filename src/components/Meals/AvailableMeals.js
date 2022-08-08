import Card from '../UI/Card';
import classes from './Meals.module.css';
import MealItem from './MealItem/MealItem';

import cartContext from '../../store/cart-context';

import { useContext } from 'react';

const DUMMY_MEALS = [
	{
		id: 'm1',
		name: 'Sushi',
		description: 'Finest fish and veggies',
		price: 22.99,
	},
	{
		id: 'm2',
		name: 'Schnitzel',
		description: 'A german specialty!',
		price: 16.5,
	},
	{
		id: 'm3',
		name: 'Barbecue Burger',
		description: 'American, raw, meaty',
		price: 12.99,
	},
	{
		id: 'm4',
		name: 'Green Bowl',
		description: 'Healthy...and green...',
		price: 18.99,
	},
];

const AvailableMeals = () => {
	const cartCtx = useContext(cartContext);

	const onAddItemhandler = (val, item) => {
		cartCtx.addItem({ ...item, amount: val });
	};
	const itemList = DUMMY_MEALS.map((item) => {
		return (
			<MealItem
				key={item.id}
				name={item.name}
				description={item.description}
				price={item.price}
				onAdd={(amount) => onAddItemhandler(amount, item)}
			></MealItem>
		);
	});

	return (
		<section className={classes.meals}>
			<Card>
				<ul style={{ padding: '0 2rem 0 2rem' }}> {itemList} </ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
