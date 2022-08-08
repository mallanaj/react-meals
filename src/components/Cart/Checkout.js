import { useState, useRef } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (ip) => ip.trim() !== "";
const isLength = (p) => p.trim().length === 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postCodeRef = useRef();
  const cityRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postCode: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const post = postCodeRef.current.value;
    const city = cityRef.current.value;

    const nameValid = isEmpty(name);
    const streetValid = isEmpty(street);
    const cityValid = isEmpty(city);
    const postValid = isLength(post);

    setFormValidity({
      name: nameValid,
      street: streetValid,
      postCode: postValid,
      city: cityValid,
    });

    const formValid = nameValid && streetValid && cityValid && postValid;

    if (!formValid) return;
    props.onConfirm({
      name,
      street,
      post,
      city,
    });
  };

  const nameClasses = formValidity.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  console.log("nameClasses ", nameClasses);
  const streetClasses = formValidity.street
    ? `${classes.control} `
    : `${classes.control} ${classes.invalid}`;
  const postClasses = formValidity.postCode
    ? `${classes.control} `
    : `${classes.control} ${classes.invalid}`;
  const cityClasses = formValidity.city
    ? `${classes.control} `
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="">Name</label>
        <input type="text" ref={nameRef} />
        {!formValidity.name && <p>Please eneter valid Name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="">Street</label>
        <input type="text" ref={streetRef} />
        {!formValidity.street && <p>Please eneter valid Street</p>}
      </div>
      <div className={postClasses}>
        <label htmlFor="">Postal Code</label>
        <input type="text" ref={postCodeRef} />
        {!formValidity.postCode && <p>Please eneter valid Postal Code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="">City</label>
        <input type="text" ref={cityRef} />
        {!formValidity.city && <p>Please eneter valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
