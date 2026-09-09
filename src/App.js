import { useState, useEffect } from "react";
import "./index.css";
import Sales from "./Sales";
import Balance from "./Balances";
import Items from "./Items";
import Activities from "./Activities";

export default function App() {
  return (
    <div>
      <Sales />
      <Items />
      <Balance />
      <Activities />
    </div>
  );
}
