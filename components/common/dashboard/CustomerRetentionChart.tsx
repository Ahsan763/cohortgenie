"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerRetentionChartData } from "@/constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CustomerRetentionChart({ data }: any) {
  return (
    <div className="h-[300px] w-full -translate-x-[0.4vw]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid
            // strokeDasharray="3 3"
            vertical={true} // 👈 enables vertical grid
            horizontal={true} // 👈 enables horizontal grid
            opacity={0.3}
          /> */}
          <XAxis dataKey="period" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: "8px",
              background: "white",
              border: "1px solid #eee",
              color: "#9B6EEE",
            }}
            formatter={(value: number) => [`Retention : $${value}`]}
          />
          <Bar dataKey="netRevenue" fill="#C9B1F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
