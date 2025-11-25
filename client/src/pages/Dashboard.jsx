import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import MonthlyChart from "../components/MonthlyChart.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [tx, setTx] = useState([]);
  const [quote, setQuote] = useState({
    content: "The best investment you can make is in yourself.",
    author: "Budget Buddy",
  });
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    // 1) All transactions
    api("/api/transactions")
      .then(setTx)
      .catch(console.error);

    // 2) Monthly summary data for chart
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

    // 3) Quote with simple localStorage cache (1 hour)
    const loadQuote = async () => {
      try {
        const cached = localStorage.getItem("bb_quote");
        const cachedTime = localStorage.getItem("bb_quote_time");

        // reuse cached quote if it was fetched within the last hour
        if (
          cached &&
          cachedTime &&
          Date.now() - Number(cachedTime) < 60 * 60 * 1000
        ) {
          setQuote(JSON.parse(cached));
          return;
        }

        const data = await api("/api/quote");
        setQuote(data);

        localStorage.setItem("bb_quote", JSON.stringify(data));
        localStorage.setItem("bb_quote_time", Date.now().toString());
      } catch (err) {
        console.error("Quote load error:", err);
        // keep existing fallback quote from state
      }
    };

    loadQuote();
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
              {Number(t.amount).toFixed(2)} {t.note ? `• ${t.note}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
