/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cartItem/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
	const { cartItems, amount, total } = useSelector((store) => store.cart);
	const dispatch = useDispatch();

	if (amount < 1) {
		return (
			<section>
				<div className="cart">
					<header>
						<h2>Your bag</h2>
						<h4 className="empty-cart">is Currently empty</h4>
					</header>
				</div>
			</section>
		);
	}
	return (
		<section className="cart">
			<header>
				<h2>Your bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<hr />
				<div className="cart-total">
					<h4>
						Total <span>${total.toFixed(2)}</span>
					</h4>
				</div>
				<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
					clear cart
				</button>
			</footer>
		</section>
	);
};

export default CartContainer;
