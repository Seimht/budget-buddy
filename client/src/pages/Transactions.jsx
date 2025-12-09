import { useEffect, useState } from "react";
import { api } from "../api";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);

  async function loadTransactions() {
    try {
      const data = await api("/api/transactions");
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  function handleEdit(tx) {
    setSelected(tx);
  }

  function handleSaved() {
    setSelected(null);
    loadTransactions();
  }

  function handleCancel() {
    setSelected(null);
  }

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1 className="dashboard-title">Transactions</h1>
          <p className="dashboard-subtitle">
            Add, edit, and review your transaction history.
          </p>
        </div>
      </div>

      <div className="transactions-grid">
        {/* Left: Form card */}
        <section className="card transactions-card">
          <h2 className="card-title">
            {selected ? "Edit transaction" : "Add transaction"}
          </h2>
          <p className="card-caption">
            Fill out the form below to record a new income or expense.
          </p>

          <TransactionForm
            selected={selected}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        </section>

        {/* Right: Table card */}
        <section className="card transactions-card">
          <h2 className="card-title">History</h2>
          <p className="card-caption">
            Complete list of your stored transactions.
          </p>

          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onChanged={loadTransactions}
          />
        </section>
      </div>
    </div>
  );
}
