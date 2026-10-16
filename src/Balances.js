import { useState } from "react";
import "./items.css";

export default function Balances({ onChange }) {
  const [search, setSearch] = useState("");
  const [savedSales, setSavedSales] = useState(() => {
    const savedSales = localStorage.getItem("sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });
  const [form, setForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [payment, setPayment] = useState("");

  const latestSales = savedSales.filter((sale, index, sales) => {
    return (
      index ===
      sales.findLastIndex(
        (savedSale) =>
          savedSale.name.trim().toLowerCase() ===
            sale.name.trim().toLowerCase() &&
          savedSale.address.trim().toLowerCase() ===
            sale.address.trim().toLowerCase(),
      )
    );
  });

  const filteredBalances = latestSales.filter(
    (savedSale) =>
      savedSale.balance > 0 &&
      savedSale.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleBalance() {
    const amount = Number(payment);
    const newBal = selectedSale.balance - amount;

    const newPayment = {
      amount: amount,
      date: new Date(),
      balance: newBal,
    };

    const updateSale = {
      ...selectedSale,
      paid: selectedSale.paid + amount,
      balance: newBal,
      payments: [...selectedSale.payments, newPayment],
    };

    const updateSales = savedSales.map((sale) =>
      sale.id === selectedSale.id ? updateSale : sale,
    );

    setSavedSales(updateSales);

    localStorage.setItem("sales", JSON.stringify(updateSales));

    setSelectedSale(updateSale);
    setPayment("");
  }

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
        {filteredBalances.length > 0 ? (
          filteredBalances.map((filteredBalance) => {
            return (
              <div
                onClick={() => {
                  setForm(true);
                  setSelectedSale(filteredBalance);
                }}
                className="balance-info"
                key={filteredBalance.id}
              >
                <span>
                  <p>{filteredBalance.name}</p>
                  <p>{filteredBalance.address}</p>
                </span>
                <span>
                  <p> {new Date(filteredBalance.date).toLocaleDateString()} </p>
                  <p> {new Date(filteredBalance.date).toLocaleTimeString()} </p>
                </span>

                <h3>{filteredBalance.balance.toLocaleString()}</h3>
              </div>
            );
          })
        ) : (
          <p className="no-item">No Balance </p>
        )}
      </div>
      {form && (
        <form className="add-item-form">
          <button type="button" onClick={() => setForm(false)}>
            Close
          </button>
          <div className="form-head">
            <span>
              <p>{selectedSale.name}</p>
              <p>{selectedSale.address}</p>
            </span>
            <span>
              <p> {new Date(selectedSale.date).toLocaleDateString()} </p>
              <p> {new Date(selectedSale.date).toLocaleTimeString()} </p>
            </span>
          </div>
          <h3 className="det">Payment Details</h3>
          <div className="balance-sum">
            <p>Total:{selectedSale.total.toLocaleString()}</p>
            <p>Paid:{selectedSale.paid.toLocaleString()}</p>
            <p>Balance:{selectedSale.balance.toLocaleString()}</p>
            {selectedSale.payments.map((payment) => (
              <div>
                <p>
                  Paid: {payment.amount}
                  {""}{" "}
                  <span className="day-pay">
                    {" "}
                    {new Date(payment.date).toLocaleDateString()}
                  </span>
                </p>
                <p>Balance:{payment.balance}</p>
              </div>
            ))}
          </div>
          <div className="pay">
            <h3>Make Payment</h3>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            />
            <button type="button" onClick={handleBalance} className="add-item">
              Complete Payment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
