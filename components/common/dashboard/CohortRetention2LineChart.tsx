"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CohortRetention2LineChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        {/* Grid */}
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

        {/* X Axis */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF" }}
        />

        {/* Y Axis */}
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF" }}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        />

        {/* Legend */}
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{ paddingBottom: "20px" }}
        />

        {/* APRIL 2025 (Purple Line) */}
        <Line
          type="monotone"
          dataKey="april"
          name="April 2025"
          stroke="#8B5CF6"
          strokeWidth={3}
          dot={{ r: 6, fill: "#8B5CF6", stroke: "white", strokeWidth: 2 }}
          activeDot={{ r: 7 }}
        />

        {/* OCT 2024 (Cyan Line) */}
        <Line
          type="monotone"
          dataKey="oct"
          name="Oct 2024"
          stroke="#22D3EE"
          strokeWidth={3}
          dot={{ r: 6, fill: "#22D3EE", stroke: "white", strokeWidth: 2 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CohortRetention2LineChart;
