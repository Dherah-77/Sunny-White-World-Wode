import { useEffect, useState } from "react";
import "./items.css";

export default function Items({ onChange }) {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");

    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItem() {
    const newItem = {
      name: productName,
      quantity: quantity,
      unit: unit,
      price: Number(price),
      id: Date.now(),
    };

    setItems([...items, newItem]);
    setPrice("");
    setProductName("");
    setQuantity("");
    setForm(false);
  }

  function handleDelete(id) {
    const updatedItem = items.filter((item) => item.id !== id);

    setItems(updatedItem);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="items-page">
      <div className="items-header">
        <button className="back-btn" onClick={() => onChange("dashboard")}>
          ←
        </button>

        <div>
          <h1>Items</h1>
          <p>Manage your inventory</p>
          <p>
            <label>🔍</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </p>
        </div>

        <button className="add-btn" onClick={() => setForm(true)}>
          Add Item
        </button>
      </div>

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div className="item-info" key={item.id}>
            <h3>{item.name}</h3>
            <p>
              {" "}
              {item.quantity} {item.unit}
            </p>
            <p>
              {" "}
              ₦{Number(item.price).toLocaleString()}{" "}
              <span onClick={() => handleDelete(item.id)} className="delete">
                🗑️
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="no-item">No item found 🔎</p>
      )}

      {form && (
        <form className="add-item-form" action="">
          <button type="button" onClick={() => setForm(false)}>
            Close
          </button>

          <label htmlFor="product-name">Product name:</label>
          <input
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Product..."
          />

          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />

          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option>Cartons</option>
            <option>Packets</option>
            <option>Pieces</option>
          </select>

          <label htmlFor="price">Price:</label>
          <input
            id="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />

          <button type="button" onClick={handleAddItem}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}
