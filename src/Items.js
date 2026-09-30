import { useState } from "react";
import "./items.css";

export default function Items({ onChange, items, setItems }) {
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [mainUnit, setMainUnit] = useState("");
  const [mainQuantity, setMainQuantity] = useState("");
  const [smallUnit, setSmallUnit] = useState("");
  const [unitsPerMain, setUnitsPerMain] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [smallPrice, setSmallPrice] = useState("");

  function handleAddItem() {
    const newItem = {
      name: productName,
      mainQuantity: Number(mainQuantity),
      mainUnit: mainUnit,
      smallUnit: smallUnit,
      unitsPerMain: Number(unitsPerMain),
      mainPrice: Number(mainPrice),
      smallPrice: Number(smallPrice),
      looseSmallUnits: 0,
      id: Date.now(),
    };

    setItems([...items, newItem]);

    setForm(false);

    setProductName("");
    setMainUnit("");
    setMainQuantity("");
    setSmallUnit("");
    setUnitsPerMain("");
    setMainPrice("");
    setSmallPrice("");
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

        <div className="header-text">
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
            <span className="quantity">
              <p>
                {" "}
                {item.mainQuantity} {item.mainUnit}
              </p>
              {item.looseSmallUnits > 0 && (
                <p className="loose-unit">
                  {item.looseSmallUnits} Loose {item.smallUnit}
                </p>
              )}
            </span>
            <p>
              {" "}
              ₦{Number(item.mainPrice).toLocaleString()}{" "}
              <span onClick={() => handleDelete(item.id)} className="delete">
                🗑️
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="no-item">Item not available 🔎</p>
      )}

      {form && (
        <form className="add-item-form">
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
            required
          />

          <label htmlFor="main-unit">Main unit:</label>
          <select
            id="main-unit"
            value={mainUnit}
            onChange={(e) => setMainUnit(e.target.value)}
            required
          >
            <option value="">Select unit</option>
            <option value="Cartons">Cartons</option>
            <option value="Bags">Bags</option>
            <option value="Rolls">Rolls</option>
            <option value="Drums">Drums</option>
            <option value="Buckets">Buckets</option>
          </select>

          <label htmlFor="main-quantity">Quantity:</label>
          <input
            id="main-quantity"
            value={mainQuantity}
            onChange={(e) => setMainQuantity(e.target.value)}
            type="number"
            required
          />

          <label htmlFor="small-unit">Smaller unit:</label>
          <select
            id="small-unit"
            value={smallUnit}
            onChange={(e) => setSmallUnit(e.target.value)}
            required
          >
            <option value="">Select unit</option>
            <option value="Packets">Packets</option>
            <option value="Pieces">Pieces</option>
            <option value="Sachets">Sachets</option>
            <option value="Rolls">Rolls</option>
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>

          <label htmlFor="units-per-main">
            How many {smallUnit || "small units"} in one{" "}
            {mainUnit || "main unit"}?
          </label>
          <input
            id="units-per-main"
            value={unitsPerMain}
            onChange={(e) => setUnitsPerMain(e.target.value)}
            type="number"
            required
          />

          <label htmlFor="main-price">
            {mainUnit || "Main unit"} selling price:
          </label>
          <input
            id="main-price"
            value={mainPrice}
            onChange={(e) => setMainPrice(e.target.value)}
            type="number"
            required
          />

          <label htmlFor="small-price">
            {smallUnit || "Small unit"} selling price:
          </label>
          <input
            id="small-price"
            value={smallPrice}
            onChange={(e) => setSmallPrice(e.target.value)}
            type="number"
            required
          />

          <button type="button" onClick={handleAddItem}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}
