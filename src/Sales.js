import { useState, useEffect } from "react";

export default function Sales({ items, setItems, onChange }) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [receiptItems, setReceiptItems] = useState(() => {
    const savedReceiptItems = localStorage.getItem("receiptItems");
    return savedReceiptItems ? JSON.parse(savedReceiptItems) : [];
  });
  const [form, setForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [paid, setPaid] = useState("");
  const [editItem, setEditItem] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  function handleAddToReceipt() {
    const item = items.find((item) => item.id === selectedItem);

    const receiptItem = {
      item: item,
      quantity: quantity,
      unit: unit,
      id: editItem || Date.now(),
      price: price,
    };

    if (editItem) {
      const updatedItems = receiptItems.map((receiptItem) =>
        receiptItem.id === editItem
          ? { ...receiptItem, quantity: quantity, unit: unit, price: price }
          : receiptItem,
      );

      setReceiptItems(updatedItems);
      setEditItem();
    } else {
      setReceiptItems([...receiptItems, receiptItem]);
    }

    setForm(false);
    setQuantity("");
    setSearch("");
    setPrice("");
    setUnit();
  }

  function handleDeleteItem(id) {
    const updatedItems = receiptItems.filter(
      (receiptItem) => receiptItem.id !== id,
    );

    setReceiptItems(updatedItems);
  }

  function handleEditItem(id) {
    const receiptItem = receiptItems.find(
      (receiptItem) => receiptItem.id === id,
    );

    setEditItem(id);
    setQuantity(receiptItem.quantity);
    setUnit(receiptItem.unit);
    setPrice(receiptItem.price);
    setForm(true);
  }

  function completeSale() {
    if (!name.trim()) {
      return;
    }

    const sale = {
      name: name,
      date: new Date(),
      address: address,
      id: editItem || Date.now(),
      items: receiptItems,
      total: total,
      paid: Number(paid),
      balance: ovrTot - Number(paid),
      payments:
        Number(paid) > 0
          ? [
              {
                amount: Number(paid),
                date: new Date(),
                balance: ovrTot - Number(paid),
              },
            ]
          : [],
    };

    const savedSales = localStorage.getItem("sales");
    const sales = savedSales ? JSON.parse(savedSales) : [];

    sales.push(sale);

    localStorage.setItem("sales", JSON.stringify(sales));

    const updatedItem = items.map((item) => {
      const receiptItem = receiptItems.find(
        (receiptItem) => receiptItem.item.id === item.id,
      );

      if (!receiptItem) {
        return item;
      }

      if (receiptItem.unit === item.mainUnit) {
        return {
          ...item,
          mainQuantity: item.mainQuantity - receiptItem.quantity,
        };
      } else if (receiptItem.unit === item.smallUnit) {
        if (item.looseSmallUnits >= receiptItem.quantity) {
          return {
            ...item,
            looseSmallUnits: item.looseSmallUnits - receiptItem.quantity,
          };
        } else {
          const shortfall = receiptItem.quantity - item.looseSmallUnits;

          const mainUnitsToOpen = Math.ceil(shortfall / item.unitsPerMain);

          const newMainQuantity = item.mainQuantity - mainUnitsToOpen;

          const newLooseSmallUnits =
            item.looseSmallUnits +
            mainUnitsToOpen * item.unitsPerMain -
            receiptItem.quantity;

          return {
            ...item,
            mainQuantity: newMainQuantity,
            looseSmallUnits: newLooseSmallUnits,
          };
        }
      }

      return item;
    });

    setItems(updatedItem);
    setReceiptItems([]);
    setName("");
    setAddress("");
    setPaid("");
  }

  function getOldBal() {
    const savedSales = localStorage.getItem("sales");
    const sales = savedSales ? JSON.parse(savedSales) : [];

    const oldSales = sales.filter(
      (savedSale) =>
        name.trim().toLowerCase() === savedSale.name.trim().toLowerCase() &&
        address.trim().toLowerCase() === savedSale.address.trim().toLowerCase(),
    );

    const latestSale = oldSales[oldSales.length - 1];

    return latestSale ? latestSale.balance : 0;
  }

  useEffect(() => {
    localStorage.setItem("receiptItems", JSON.stringify(receiptItems));
  }, [receiptItems]);

  const filteredItems = search
    ? items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const total = receiptItems.reduce((sum, receiptItem) => {
    const price = Number(receiptItem.price);
    return sum + receiptItem.quantity * price;
  }, 0);

  const oldBalance = getOldBal();

  const ovrTot = oldBalance + total;

  return (
    <div className="sales-page">
      <div className="items-header">
        <button className="back-btn" onClick={() => onChange("dashboard")}>
          ←
        </button>
        <div className="header-text">
          <h1>Sales</h1>
          <p>Record and manage sales</p>
          <label htmlFor="🔍">🔍</label>
          <input
            type="text"
            placeholder="Add Item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn">&#9776;</button>
      </div>
      <div>
        {search.length > 0 &&
          filteredItems.length > 0 &&
          filteredItems.map((item) => {
            return (
              <div className="item-info" key={item.id}>
                <h3>{item.name}</h3>
                <span>
                  <p>
                    {item.mainQuantity} {""}
                    {item.mainUnit}
                  </p>
                  {item.looseSmallUnits > 0 && (
                    <p className="loose-unit">
                      {item.looseSmallUnits} {""} {item.smallUnit}
                    </p>
                  )}
                </span>
                <button
                  className="add-btn"
                  onClick={() => {
                    setSelectedItem(item.id);
                    setForm(true);
                  }}
                >
                  Add Item
                </button>
              </div>
            );
          })}{" "}
        {search.length > 0 && filteredItems.length === 0 && (
          <p className="no-item">Item not available🔍</p>
        )}
      </div>
      <div>
        {form && (
          <form className="add-item-form" action="submit">
            <button type="button" onClick={() => setForm(false)}>
              Close
            </button>
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label htmlFor="Unit">Unit</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setUnit(selectedUnit);

                const item = items.find((item) => item.id === selectedItem);

                if (selectedUnit === item.mainUnit) {
                  setPrice(item.mainPrice);
                } else if (selectedUnit === item.smallUnit) {
                  setPrice(item.smallPrice);
                }
              }}
            >
              <option value="Select unit">Select unit</option>
              <option value="Cartons">Cartons</option>
              <option value="Bags">Bags</option>
              <option value="Rolls">Rolls</option>
              <option value="Drums">Drums</option>
              <option value="Packets">Packets</option>
              <option value="Pieces">Pieces</option>
              <option value="Sachets">Sachets</option>
              <option value="Rolls">Rolls</option>
              <option value="Galls">Galls</option>
              <option value="Buckets">Buckets</option>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
            <label htmlFor="Price">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button type="button" onClick={handleAddToReceipt}>
              Add
            </button>
          </form>
        )}
      </div>

      <div className="receipt">
        <div className="receipt-header">
          <h1>Sunny White Holdings</h1>
          <div className="recep-dets">
            <span>
              <p>
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="Address">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </p>
            </span>
            <p> {new Date().toLocaleDateString()} </p>
          </div>
        </div>
        {receiptItems.length > 0 ? (
          <div>
            {receiptItems.map((receiptItem) => {
              return (
                <div className="item-info" key={receiptItem.id}>
                  <span>
                    {receiptItem.quantity}
                    {""}
                    {receiptItem.unit}
                  </span>

                  <h3>{receiptItem.item.name}</h3>

                  <p className="pointer">
                    ₦{Number(receiptItem.price).toLocaleString()} {``} ₦
                    {(
                      Number(receiptItem.quantity) * Number(receiptItem.price)
                    ).toLocaleString()}
                    <span
                      onClick={() => {
                        handleEditItem(receiptItem.id);
                      }}
                    >
                      ✏️
                    </span>{" "}
                    <span onClick={() => handleDeleteItem(receiptItem.id)}>
                      🗑️
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-item">No added Item</p>
        )}
      </div>
      <div className="recp-tot">
        <p>Total: ₦{total.toLocaleString()}</p>
        <p>Old balance: ₦{oldBalance.toLocaleString()}</p>
        <p>Overall total:₦{ovrTot.toLocaleString()}</p>
        <p>
          <button className="add-btn">Paid:</button>{" "}
          <input
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
          />{" "}
        </p>
        <p> {`Balance: ₦${ovrTot - Number(paid)}`}</p>
        <button onClick={completeSale} className="comp-sale-btn">
          Complete Sales
        </button>
      </div>
    </div>
  );
}
