// client/src/pages/components/TransactionList.jsx
export default function TransactionList({ transactions, onEdit, onDelete }) {
    if (!transactions || transactions.length === 0) {
      return <p>No transactions yet.</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th style={{ width: 140 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.occurred_on ? t.occurred_on.slice(0, 10) : ""}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td>${Number(t.amount).toFixed(2)}</td>
              <td>{t.note || ""}</td>
              <td>
                <button
                  type="button"
                  style={{ marginRight: 8 }}
                  onClick={() => onEdit(t)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  style={{ background: "#dc2626" }}
                  onClick={() => onDelete(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  