import Button from '../../Layout/HeaderCartButton';
import Input from '../../UI/Input';
import { useRef } from 'react';

import classes from './MealItemForm.module.css';

const MealItemForm = ({ id, onAdd }) => {
	const amountRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();
		onAdd(Number(amountRef.current.value));
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountRef}
				label="Amount"
				input={{
					id: { id },
					type: 'number',
					min: 1,
					max: 5,
					defaultValue: 1,
				}}
			/>
			<Button text="+ Add" />
		</form>
	);
};

export default MealItemForm;
