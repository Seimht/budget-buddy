
import { useEffect, useState } from "react";
import { api } from "../../api";

export default function TransactionForm({ selected, onSaved, onCancel }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [occurredOn, setOccurredOn] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = !!selected?.id;


  useEffect(() => {
    if (selected) {
      setAmount(selected.amount ?? "");
      setType(selected.type ?? "expense");
      setCategory(selected.category ?? "");
      setNote(selected.note ?? "");
      if (selected.occurred_on) {
        setOccurredOn(selected.occurred_on.slice(0, 10));
      } else {
        setOccurredOn("");
      }
    } else {
      setAmount("");
      setType("expense");
      setCategory("");
      setNote("");
      setOccurredOn("");
    }
  }, [selected]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      amount,
      type,
      category,
      note,
      occurred_on: occurredOn || null,
    };

    try {
      if (isEditing) {
        const updated = await api(`/api/transactions/${selected.id}`, {
          method: "PUT",
          body: JSON.stringify(payload), 
        });
        onSaved && onSaved(updated);
      } else {
        const created = await api("/api/transactions", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        onSaved && onSaved(created);
      }
    } catch (err) {
      console.error("Save transaction error:", err);
      alert("There was an error saving the transaction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <h3>{isEditing ? "Edit Transaction" : "Add Transaction"}</h3>

      <div style={{ marginBottom: 8 }}>
        <label>
          Amount
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Type
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Category
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Note (optional)
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Date
          <input
            type="date"
            value={occurredOn}
            onChange={(e) => setOccurredOn(e.target.value)}
          />
        </label>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading}>
          {loading
            ? isEditing
              ? "Saving..."
              : "Adding..."
            : isEditing
            ? "Save Changes"
            : "Add Transaction"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{ background: "#9ca3af" }}
          >
          Cancel
          </button>
        )}
      </div>
    </form>
  );
}
