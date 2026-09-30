import { useState } from "react";
import "./items.css";

export default function Balances({ onChange }) {
  const [search, setSearch] = useState("");
  const [savedSales, setSavedSales] = useState(() => {
    const savedSales = localStorage.getItem("sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });
  const [form, setForm] = useState(false);

  return (
    <div className="sales-page">
      <div className="items-header">
        <button className="back-btn" onClick={() => onChange("dashboard")}>
          ←
        </button>
        <div className="header-text">
          <h1>Balance</h1>
          <p>View your financial summary</p>
          <label htmlFor="🔍">🔍</label>
          <input
            type="text"
            placeholder="Search Blance"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn">&#9776;</button>
      </div>
      <div>
        {savedSales.map((savedSale) => {
          return (
            <div
              onClick={() => setForm(true)}
              className="balance-info"
              key={savedSale.id}
            >
              <span>
                <p>{savedSale.name}</p>
                <p>{savedSale.address}</p>
              </span>
              <span>
                <p> {new Date(savedSale.date).toLocaleDateString()} </p>
                <p> {new Date(savedSale.date).toLocaleTimeString()} </p>
              </span>

              <h3>{savedSale.balance.toLocaleString()}</h3>
            </div>
          );
        })}
      </div>
      <form action=""></form>
    </div>
  );
}
