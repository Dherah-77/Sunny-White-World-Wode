import { useState, useEffect } from "react";
import "./index.css";

const listsItems = [
  {
    name: "20kg Top Bond Glue",
    quantity: "70",
    unit: "buckets",
    singlePrice: 51500,
    id: 1,
  },
  {
    name: "10kg Top Bond Glue",
    quantity: "100",
    unit: "buckets",
    singlePrice: 27500,
    id: 2,
  },
  {
    name: "5kg Top Bond Glue",
    quantity: "30",
    unit: "buckets",
    singlePrice: 13750,
    id: 3,
  },
  {
    name: "2kg Top Bond Glue",
    quantity: "30",
    unit: "buckets",
    singlePrice: 6200,
    id: 4,
  },
  {
    name: "1kg Top Bond Glue",
    quantity: "27",
    unit: "bucket",
    singlePrice: 3400,
    id: 5,
  },
  {
    name: "500g Top Bond Glue",
    quantity: "27 ",
    unit: "buckets",
    singlePrice: 1800,
    id: 6,
  },
  {
    name: "250g Top Bond Glue",
    quantity: "27 ",
    unit: "Cartons",
    singlePrice: 1000,
    id: 7,
  },
  {
    name: "100g Top Bond Glue",
    quantity: "27 ",
    unit: "Cartons",
    singlePrice: 500,
    id: 8,
  },
];

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : listsItems;
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Header />
      <Form onAddItem={handleAddItem} />
      <ListItems items={items} onDelete={handleDeleteItem} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <span role="img" aria-label="home">
        🏡
      </span>{" "}
      Sunny White World Wide Limited
    </header>
  );
}

function Form({ onAddItem }) {
  const [good, setGood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!good || !quantity || !unit || !price) return;

    const newItem = {
      id: Date.now(),
      name: good,
      quantity: quantity,
      unit,
      singlePrice: price ? Number(price) : null,
    };

    onAddItem(newItem);

    setGood("");
    setQuantity("");
    setUnit("");
    setPrice("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="srch">Item</label>
      <input
        className="itm-inpt"
        type="text"
        value={good}
        onChange={(e) => setGood(e.target.value)}
      />

      <label className="srch">Quantity</label>
      <input
        type="number"
        className="inpt"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label className="srch">Unit</label>
      <select
        className="inpt"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="">Slect unit</option>
        <option value="Buckets">Buckets</option>
        <option value="Cartons">Cartons</option>
        <option value="pieces">Pieces</option>
        <option value="Packets">Packets</option>
      </select>

      <label className="srch">Price</label>
      <input
        type="number"
        className="inpt"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* <label className="srch">Carton Price</label>
      <input
        type="number"
        className="inpt"
        value={crtnPrice}
        onChange={(e) => setCrtnPrice(e.target.value)}
      /> */}
      <button type="submit" className="add-btn">
        Add Item
      </button>
    </form>
  );
}

function ListItems({ items, onDelete }) {
  return (
    <ul className="unli">
      <Items items={items} onDelete={onDelete} />
    </ul>
  );
}

function Items({ items, onDelete }) {
  const [grandTotal, setGrandTotal] = useState("");

  function calculateTotal() {
    const total = items.reduce((sum, item) => {
      return sum + item.quantity * item.singlePrice;
    }, 0);

    setGrandTotal(total);
  }

  return (
    <div>
      {items.map((item) => {
        const total = item.quantity * item.singlePrice;

        return (
          <>
            <li className="list" key={item.id}>
              <h3>{item.name}</h3>
              <p>
                {item.quantity} {item.unit}
              </p>

              {item.singlePrice != null && <p>₦{item.singlePrice}</p>}
              <p>
                {" "}
                <strong>₦{total}</strong>{" "}
              </p>
              <button className="del-btn" onClick={() => onDelete(item.id)}>
                ❌
              </button>
            </li>
          </>
        );
      })}
      <div>
        <button className="add-btn" onClick={calculateTotal}>
          Total
        </button>
        {grandTotal !== null && <h3>Total: ₦{grandTotal.toLocaleString()}</h3>}
      </div>
    </div>
  );
}
