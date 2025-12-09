
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

  const displayName =
    user?.email?.split("@")[0] || "there";

  return (
    <div className="dashboard-page">
      {/* Top header row */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">
            Welcome back, {displayName}
          </h1>
          <p className="dashboard-subtitle">
            Here’s a quick overview of your finances this month.
          </p>
        </div>
        <div className="dashboard-balance-pill">
          <span>Current balance</span>
          <strong>${balance.toFixed(2)}</strong>
        </div>
      </div>

      {/* Quote card */}
      {quote && (
        <div className="card quote-card">
          <p className="quote-text">“{quote.content}”</p>
          <p className="quote-author">— {quote.author}</p>
        </div>
      )}

      {/* Main 3-card grid */}
      <div className="dashboard-grid">
        {/* Overview card */}
        <section className="card overview-card">
          <h2 className="card-title">Overview</h2>
          <p className="card-caption">
            Signed in as {user?.email}
          </p>

          <div className="overview-stats">
            <div className="overview-row">
              <div className="overview-label">
                <span className="pill pill-income"></span>
                <span>Income</span>
              </div>
              <span className="overview-amount">
                ${income.toFixed(2)}
              </span>
            </div>

            <div className="overview-row">
              <div className="overview-label">
                <span className="pill pill-expense"></span>
                <span>Expenses</span>
              </div>
              <span className="overview-amount">
                ${expense.toFixed(2)}
              </span>
            </div>

            <div className="overview-row overview-row-total">
              <div className="overview-label">
                <span className="pill pill-balance"></span>
                <span>Net balance</span>
              </div>
              <span className="overview-amount">
                ${balance.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Chart card */}
        <section className="card chart-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Spending vs Income</h2>
              <p className="card-caption">
                Monthly summary based on your transactions
              </p>
            </div>
          </div>

          {monthly.length > 0 ? (
            <div className="chart-wrapper">
              <MonthlyChart data={monthly} />
            </div>
          ) : (
            <p className="card-empty">
              Add some transactions to see your monthly chart.
            </p>
          )}
        </section>

        {/* Recent transactions card */}
        <section className="card recent-card">
          <h2 className="card-title">Recent transactions</h2>
          <p className="card-caption">
            Latest 5 items from your history
          </p>
          {tx.length === 0 ? (
            <p className="card-empty">
              No transactions yet. Try adding one on the Transactions page.
            </p>
          ) : (
            <ul className="recent-list">
              {tx.slice(0, 5).map((t) => (
                <li key={t.id} className="recent-item">
                  <div className="recent-main">
                    <span className="recent-category">
                      {t.category}
                    </span>
                    <span
                      className={`recent-type ${
                        t.type === "income"
                          ? "recent-type-income"
                          : "recent-type-expense"
                      }`}
                    >
                      {t.type}
                    </span>
                  </div>
                  <div className="recent-meta">
                    <span className="recent-date">
                      {t.occurred_on?.slice(0, 10)}
                    </span>
                    <span className="recent-amount">
                      {t.type === "income" ? "+" : "-"}$
                      {Number(t.amount).toFixed(2)}
                    </span>
                  </div>
                  {t.note && (
                    <div className="recent-note">
                      {t.note}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
