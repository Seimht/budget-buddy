import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import MonthlyChart from "../components/MonthlyChart.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [tx, setTx] = useState([]);
  const [quote, setQuote] = useState(null);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    
    api("/api/transactions")
      .then(setTx)
      .catch(console.error);

    
    api("/api/transactions/monthly")
      .then((data) => {
        
        const formatted = {};

        data.forEach((row) => {
          const { month, type, total } = row;

          if (!formatted[month]) {
            formatted[month] = { month, income: 0, expense: 0 };
          }

          formatted[month][type] = Number(total);
        });

        setMonthly(Object.values(formatted));
      })
      .catch(console.error);

   
    api("/api/quote")
      .then(setQuote)
      .catch(console.error);
  }, []);

  const income = tx
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = tx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Welcome to Budget Buddy Seim</h2>
      <p>Signed in as {user?.email}</p>
      <div>
        <strong>Income:</strong> ${income.toFixed(2)} &nbsp;|&nbsp;{" "}
        <strong>Expense:</strong> ${expense.toFixed(2)} &nbsp;|&nbsp;{" "}
        <strong>Balance:</strong> ${balance.toFixed(2)}
      </div>

      {quote && (
        <blockquote>
          “{quote.content}” — {quote.author}
        </blockquote>
      )}

      {monthly.length > 0 && <MonthlyChart data={monthly} />}

      <div>
        <h3>Recent Transactions</h3>
        <ul>
          {tx.slice(0, 5).map((t) => (
            <li key={t.id}>
              {t.occurred_on} • {t.category} • {t.type} • $
              {Number(t.amount).toFixed(2)}{" "}
              {t.note ? `• ${t.note}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
