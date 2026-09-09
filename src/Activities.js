import { useState, useEffect } from "react";
import "./index.css";
import Sales from "./Sales";
import Balance from "./Balances";
import Items from "./Items";
import Activities from "./Activities";
export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : listsItems;
  });
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      {" "}
      <Sales /> <Items /> <Balance /> <Activities />{" "}
    </div>
  );
}
