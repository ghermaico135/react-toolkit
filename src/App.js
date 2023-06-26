/** @format */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "./component/Navbar";
import CartContainer from "./component/CartContainer";
import { calculateTotal, getCartItems } from "./features/cartItem/cartSlice";
import Modal from "./component/Modal";

function App() {
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotal());
	}, [cartItems]);

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	);
}
export default App;
