import { useState } from 'react';

export default function TransactionForm({ onSave, initial }) {
  const [amount, setAmount] = useState(initial?.amount ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [type, setType] = useState(initial?.type ?? 'expense');
  const [note, setNote] = useState(initial?.note ?? '');
  const [occurred_on, setDate] = useState(initial?.occurred_on ?? '');

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      amount: Number(amount),
      category,
      type,
      note,
      occurred_on
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <input
        placeholder="Category (e.g., food)"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">expense</option>
        <option value="income">income</option>
      </select>
      <input
        placeholder="Note (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <input type="date" value={occurred_on} onChange={e => setDate(e.target.value)} />
      <button>{initial ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
}
