import { motion } from 'framer-motion'
import{
        PieChart,
        Pie,
        Cell,
        ResponsiveContainer,
        BarChart,
        Bar,
        XAxis,
        YAxis,
        Tooltip,
} from "recharts";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  MessageSquare,
} from "lucide-react";

//MOCK data
const summary = [
  { title: "Compliance Score", value: "72%", icon: ShieldCheck },
  { title: "Pending Tasks", value: "3", icon: AlertTriangle },
  { title: "Upcoming Deadlines", value: "2", icon: Clock },
  { title: "Chat Topics", value: "5", icon: MessageSquare },
];

const complianceData = [
  { name: "GST", value: 60 },
  { name: "Licenses", value: 25 },
  { name: "Labor", value: 15 },
];

const riskData = [
  { name: "Low", value: 2 },
  { name: "Medium", value: 3 },
  { name: "High", value: 1 },
];

const insights = [
  "GST registered but GSTR-3B filing pending",
  "Trade License not applied",
  "Labor compliance awareness missing",
];


const actions = [
  { title: "File GST Return", priority: "High" },
  { title: "Apply Trade License", priority: "Medium" },
  { title: "Learn Labor Compliance", priority: "Low" },
];

// ---------------- COMPONENT ----------------
export default function AnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* ---------- SUMMARY CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summary.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl shadow p-5 flex items-center gap-4"
          >
            <card.icon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- CHARTS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Compliance Pie */}
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Compliance Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={complianceData} dataKey="value" outerRadius={90} label>
                {complianceData.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Bar */}
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Risk Levels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- INSIGHTS + ACTIONS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Insights */}
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Chat Insights</h3>
          <ul className="space-y-2">
            {insights.map((item, idx) => (
              <li key={idx} className="text-sm">• {item}</li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Recommended Actions</h3>
          <div className="space-y-3">
            {actions.map((task, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center p-3 rounded-xl bg-gray-100 dark:bg-slate-800"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">
                    Priority: {task.priority}
                  </p>
                </div>
                <button className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white">
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
    )
}