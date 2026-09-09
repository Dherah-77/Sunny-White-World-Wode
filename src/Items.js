import { useState } from "react";
import "./items.css";

export default function Items({ onChange }) {
  const [items, setItems] = useState([
    {
      name: "20kg Top Bond Glue",
      quantity: 70,
      unit: "buckets",
      singlePrice: 51500,
      id: 1,
    },
    {
      name: "10kg Top Bond Glue",
      quantity: 100,
      unit: "buckets",
      singlePrice: 27500,
      id: 2,
    },
    {
      name: "5kg Top Bond Glue",
      quantity: 30,
      unit: "buckets",
      singlePrice: 13750,
      id: 3,
    },
    {
      name: "2kg Top Bond Glue",
      quantity: 30,
      unit: "buckets",
      singlePrice: 6200,
      id: 4,
    },
    {
      name: "1kg Top Bond Glue",
      quantity: 27,
      unit: "bucket",
      singlePrice: 3400,
      id: 5,
    },
    {
      name: "500g Top Bond Glue",
      quantity: 27,
      unit: "buckets",
      singlePrice: 1800,
      id: 6,
    },
    {
      name: "250g Top Bond Glue",
      quantity: 27,
      unit: "Cartons",
      singlePrice: 1000,
      id: 7,
    },
    {
      name: "100g Top Bond Glue",
      quantity: 27,
      unit: "Cartons",
      singlePrice: 500,
      id: 8,
    },
  ]);

  return (
    <div className="items-page">
      <div className="items-header">
        <button onClick={() => onChange("dashboard")}>←</button>
        <div>
          <h1>Items</h1>
          <p>Manage your inventory</p>
        </div>
      </div>

      {items.map((item) => (
        <div className="item-info" key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.singlePrice}</p>
        </div>
      ))}
    </div>
  );
}
