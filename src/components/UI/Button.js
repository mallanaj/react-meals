import CartIcon from "../Cart/CartIcon";

import classes from "./Button.module.css";
import cartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const Button = (props) => {
  const [isBump, setIsBump] = useState(false);

  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;
  const totalCartItems = cartCtx.items.reduce(
    (prev, item) => prev + item.amount,
    0
  );

  const btnClasses = `${classes.button} ${isBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIsBump(true);
    const btnTimer = setTimeout(() => {
      setIsBump(false);
    }, 300);
    return () => {
      clearTimeout(btnTimer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.cartClick}>
      {props.icon && (
        <span className={classes.icon}>
          <CartIcon />
        </span>
      )}
      <span>{props.text}</span>

      {props.badge && <span className={classes.badge}>{totalCartItems}</span>}
    </button>
  );
};

export default Button;
