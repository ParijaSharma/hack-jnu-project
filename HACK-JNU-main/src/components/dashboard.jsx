"use client"
//import { useEffect, useState } from "react"
import DashboardHeader from "./dashboard-header";
//import { AIInputBar } from "./ai-input-bar";
import { Calendar, FileText, Bell, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react"

// const quickStats = [
//   {
//     label: "Pending Compliances",
//     value: "3",
//     icon: Clock,
//     color: "text-secondary",
//     bgColor: "bg-secondary/10",
//   },
//   {
//     label: "Completed This Month",
//     value: "12",
//     icon: CheckCircle,
//     color: "text-accent",
//     bgColor: "bg-accent/10",
//   },
//   {
//     label: "Upcoming Deadlines",
//     value: "5",
//     icon: AlertTriangle,
//     color: "text-primary",
//     bgColor: "bg-primary/10",
//   },
// ]

// const upcomingTasks = [
//   {
//     title: "GST Return Filing",
//     dueDate: "Feb 15, 2026",
//     status: "pending",
//   },
//   {
//     title: "PF Monthly Return",
//     dueDate: "Feb 20, 2026",
//     status: "pending",
//   },
//   {
//     title: "Trade License Renewal",
//     dueDate: "Mar 01, 2026",
//     status: "upcoming",
//   },
// ]

// const recentDocuments = [
//   { name: "GST Certificate", date: "Jan 10, 2026" },
//   { name: "MSME Registration", date: "Dec 15, 2025" },
//   { name: "Shop & Establishment License", date: "Nov 28, 2025" },
// ]



export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  useEffect(() => {
  fetch("http://localhost:5000/api/dashboard")
    .then(res => res.json())
    .then(data => setDashboardData(data))
    .catch(err => console.error("API Error:", err))
}, [])

          return (
            <div className="min-h-screen bg-background">
              <DashboardHeader />
              
              <main className="pt-24 pb-40 px-4">
                <div className="max-w-6xl mx-auto">
                  {/* Welcome Section */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-2">Welcome back!</h1>
                    <p className="text-muted-foreground">
                      Here is your compliance overview for today.
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {dashboardData?.stats && [
          {
            label: "Pending Compliances",
            value: dashboardData.stats.pending,
            icon: Clock,
            color: "text-secondary",
            bgColor: "bg-secondary/10",
          },
          {
            label: "Completed This Month",
            value: dashboardData.stats.completed,
            icon: CheckCircle,
            color: "text-accent",
            bgColor: "bg-accent/10",
          },
          {
            label: "Upcoming Deadlines",
            value: dashboardData.stats.upcoming,
            icon: AlertTriangle,
            color: "text-primary",
            bgColor: "bg-primary/10",
          }
        ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Tasks */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <h2 className="font-semibold text-primary">Upcoming Deadlines</h2>
              </div>
              <div className="space-y-4">
                {dashboardData?.tasks?.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors duration-200"
                  >
                    <div>
                      <p className="font-medium text-primary">{task.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "pending"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-semibold text-primary">Recent Documents</h2>
              </div>
              <div className="space-y-4">
                {dashboardData?.documents?.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-medium text-primary">{doc.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold text-primary">AI Compliance Insights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardData?.aiInsights?.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-background border border-border/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {insight.type === "Reminder" && (
                        <Bell className="h-4 w-4 text-secondary" />
                      )}
                      {insight.type === "Tip" && (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      )}
                      {insight.type === "Update" && (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      )}

                      <p className="text-sm font-medium text-primary">
                        {insight.type}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {insight.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIInputBar />
    </div>
  )
}
