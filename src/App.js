import { useState, useEffect } from "react";

import "./index.css";
import Sales from "./Sales";
import Balance from "./Balances";
import Items from "./Items";

export default function App() {
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");

    return savedPage ? JSON.parse(savedPage) : "dashboard";
  });
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      {page === "sales" ? (
        <Sales items={items} setItems={setItems} onChange={setPage} />
      ) : page === "items" ? (
        <Items onChange={setPage} items={items} setItems={setItems} />
      ) : page === "balance" ? (
        <Balance onChange={setPage} />
      ) : (
        <div className="first-page">
          <h1>Sunny White World Wide</h1>
          <p>Inventory Management</p>

          <div className="dashboard">
            <button
              onClick={() => setPage("sales")}
              className="dashboard-card sales-card"
            >
              <span>💰</span>
              <h2>Sales</h2>
              <p>Record and manage sales</p>
            </button>

            <button
              onClick={() => setPage("items")}
              className="dashboard-card items-card"
            >
              <span>📦</span>
              <h2>Items</h2>
              <p>Manage your inventory</p>
            </button>

            <button
              onClick={() => setPage("balance")}
              className="dashboard-card balance-card"
            >
              <span>📊</span>
              <h2>Balance</h2>
              <p>View your financial summary</p>
            </button>

            <button className="dashboard-card activities-card">
              <span>📝</span>
              <h2>Activities</h2>
              <p>View recent activities</p>
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
