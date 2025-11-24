import { useEffect, useState } from 'react';
import { api } from '../api';
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [err, setErr] = useState('');

  async function load() {
    setErr('');
    try {
      const data = await api('/api/transactions');
      setItems(data);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(tx) {
    try {
      await api('/api/transactions', { method: 'POST', body: tx });
      setEditing(null);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function update(tx) {
    try {
      await api(`/api/transactions/${editing.id}`, {
        method: 'PUT',
        body: tx
      });
      setEditing(null);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function remove(id) {
    try {
      await api(`/api/transactions/${id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div>
      <h2>Transactions</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <TransactionForm onSave={editing ? update : add} initial={editing} />
      <TransactionList items={items} onEdit={setEditing} onDelete={remove} />
    </div>
  );
}
