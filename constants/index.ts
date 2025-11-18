import { SlideItem, Stat } from "@/types";
import slide1 from "../public/images/slide1.png";
import { AlertTriangle, DollarSign, BarChart3 } from "lucide-react";
import {
  ChartFillIcon,
  ChurnFillIcon,
  DollerCircleFillIcon,
  DollerCircleIcon,
  GDRfILLIcon,
  GDRIcon,
  NDRfILLIcon,
  NDRIcon,
  TwoProfileFillIcon,
  TwoProfileIcon,
} from "@/icons";
export const loginSlides: SlideItem[] = [
  {
    img: slide1,
    title: "Clarity, Not Chaos",
    desc: "From messy reports to understandable insights finally see your financial story in a way that feels clear, calm, and in control.",
  },
  {
    img: slide1,
    title: "Your Heading 2",
    desc: "This is the description text for slide two.",
  },
  {
    img: slide1,
    title: "Your Heading 3",
    desc: "This is the description text for slide three.",
  },
];
export const years = ["All", "2025", "2024", "2023", "2022"];
export const months = [
  { id: "1", value: "january", label: "January" },
  { id: "2", value: "february", label: "February" },
  { id: "3", value: "march", label: "March" },
  { id: "4", value: "april", label: "April" },
  { id: "5", value: "may", label: "May" },
  { id: "6", value: "june", label: "June" },
  { id: "7", value: "july", label: "July" },
  { id: "8", value: "august", label: "August" },
  { id: "9", value: "september", label: "September" },
  { id: "10", value: "october", label: "October" },
  { id: "11", value: "november", label: "November" },
  { id: "12", value: "december", label: "December" },
];
export const quarters = [
  { id: "1", value: "q1", label: "Quarter 1" },
  { id: "2", value: "q2", label: "Quarter 2" },
  { id: "3", value: "q3", label: "Quarter 3" },
  { id: "4", value: "q4", label: "Quarter 4" },
];
export const statsData: Stat[] = [
  {
    id: 1,
    title: "Gross Dollar Retention",
    value: "92%",
    label: "GDR",
    growth: "3.4%",
    icon: GDRIcon,
    fillIcon: GDRfILLIcon,
  },
  {
    id: 2,
    title: "Net Dollar Retention",
    value: "108%",
    label: "NDR",
    growth: "5.1%",
    icon: NDRIcon,
    fillIcon: NDRfILLIcon,
  },
  {
    id: 3,
    title: "Lifetime Value",
    value: "$2,340",
    label: "LTV",
    growth: "12%",
    icon: DollerCircleIcon,
    fillIcon: DollerCircleFillIcon,
  },
  {
    id: 4,
    title: "Active Customers",
    value: "392",
    label: "Churn Rate: 8.0%",
    growth: "1.8%",
    icon: TwoProfileIcon,
    fillIcon: TwoProfileFillIcon,
  },
];
export const CustomerRetentionChartData = [
  { month: "Jan", retention: 98 },
  { month: "Feb", retention: 75 },
  { month: "Mar", retention: 73 },
  { month: "Apr", retention: 78 },
  { month: "May", retention: 90 },
  { month: "Jun", retention: 70 },
  { month: "Jul", retention: 78 },
  { month: "Aug", retention: 60 },
  { month: "Sep", retention: 80 },
  { month: "Oct", retention: 50 },
  { month: "Nov", retention: 55 },
  { month: "Dec", retention: 82 },
];
export const insights = [
  {
    icon: ChurnFillIcon,
    title: "Churn +4% QoQ",
    desc: "Q2 churn increased from 2.8% to 3.2%",
  },
  {
    icon: DollerCircleFillIcon,
    title: "Top Revenue Cohort",
    desc: "Q2 churn increased from 2.8% to 3.2%",
  },
  {
    icon: ChartFillIcon,
    title: "Retention Improved",
    desc: "M1 retention up 5% vs last quarter",
  },
];
export const monthsdata = [
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 100, 96, 264, 419, 1816, 0, 0],
  [0, 0, 0, 0, 0, 104, 100, 275, 434, 1885, 0, 0],
  [0, 0, 0, 0, 0, 38, 36, 100, 158, 687, 0, 0],
  [0, 0, 0, 0, 0, 24, 23, 63, 100, 434, 0, 0],
  [0, 0, 0, 0, 0, 6, 5, 15, 23, 100, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
];
export const yearMatrix = [
  [100, 3413, 50],
  [3, 100, 70],
  [3, 0, 100],
];
export const quarterMatrix = [
  [100, 0, 0, 0],
  [0, 100, 754, 1816],
  [0, 13, 100, 241],
  [0, 6, 42, 100],
];
