import Card from "../UI/Card";
import classes from "./Meals.module.css";
import MealItem from "./MealItem/MealItem";

import cartContext from "../../store/cart-context";

import { useContext, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setIsError] = useState();

  const cartCtx = useContext(cartContext);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://react-http-a3ccc-default-rtdb.firebaseio.com/meals.json"
        );
        if (!res.ok)
          throw new Error("Somethging went wrong please try again later");

        const data = await res.json();
        const loadedData = [];

        Object.entries(data).forEach(([key, val]) => {
          loadedData.push({
            ...val,
            id: key,
          });
        });
        setMeals(loadedData);
      } catch (error) {
        setIsError(error.message);
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    fetchMeals();

    return () => {};
  }, []);
  if (isLoading) {
    return (
      <p style={{ textAlign: "center", color: "white" }}>
        Loading plaese wait....
      </p>
    );
  }
  if (isError) {
    return <p style={{ textAlign: "center", color: "red" }}>{isError}</p>;
  }
  const onAddItemhandler = (val, item) => {
    cartCtx.addItem({ ...item, amount: val });
  };
  const itemList = meals.map((item) => {
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
        {!isLoading && (
          <ul style={{ padding: "0 2rem 0 2rem" }}> {itemList} </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
