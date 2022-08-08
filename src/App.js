import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';

import CartProvider from './store/CartProvider';

function App() {
	const [showCart, setShowCart] = useState(false);

	const cartClickhandler = () => {
		setShowCart((prev) => !prev);
	};

	return (
		<CartProvider>
			{showCart && <Cart onClose={cartClickhandler} />}
			<Header onCartClick={cartClickhandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
