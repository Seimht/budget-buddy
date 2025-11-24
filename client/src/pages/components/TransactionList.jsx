export default function TransactionList({ items, onEdit, onDelete }) {
    return (
      <table width="100%" border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(t => (
            <tr key={t.id}>
              <td>{t.occurred_on}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td>${Number(t.amount).toFixed(2)}</td>
              <td>{t.note || ''}</td>
              <td>
                <button onClick={() => onEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  