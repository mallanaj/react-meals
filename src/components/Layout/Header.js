import mealImg from '../../assets/meals.jpg';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

const Header = ({ onCartClick }) => {
	return (
		<>
			<header className={classes.header}>
				<h1>React Meals</h1>
				<HeaderCartButton icon badge text="Your Cart" cartClick={onCartClick} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealImg} alt="" />
			</div>
		</>
	);
};

export default Header;
