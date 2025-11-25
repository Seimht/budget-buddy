// client/src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import { api } from "../api";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all transactions on mount
  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const data = await api("/api/transactions");
      setTransactions(data);
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoading(false);
    }
  }

  // When the form saves something (create or update)
  function handleSaved(savedTx) {
    setTransactions((prev) => {
      const exists = prev.some((t) => t.id === savedTx.id);
      if (exists) {
        // UPDATE
        return prev.map((t) => (t.id === savedTx.id ? savedTx : t));
      } else {
        // CREATE – add new at top
        return [savedTx, ...prev];
      }
    });
    setSelected(null); // clear selection after save
  }

  function handleEdit(tx) {
    setSelected(tx);
    // optional: scroll to top where the form is
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const sure = window.confirm("Delete this transaction?");
    if (!sure) return;

    try {
      await api(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      if (selected && selected.id === id) {
        setSelected(null);
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Could not delete transaction.");
    }
  }

  function handleCancelEdit() {
    setSelected(null);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Transactions</h2>

      <TransactionForm
        selected={selected}
        onSaved={handleSaved}
        onCancel={handleCancelEdit}
      />

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
