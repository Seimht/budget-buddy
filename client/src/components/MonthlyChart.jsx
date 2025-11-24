import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  export default function MonthlyChart({ data }) {
    return (
      <div style={{ width: "100%", height: 300, marginTop: 20 }}>
        <h3>Monthly Summary</h3>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4f46e5" />
            <Bar dataKey="expense" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  