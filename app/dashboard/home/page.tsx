"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomerRetentionChartData,
  months,
  monthsdata,
  quarterMatrix,
  quarters,
  statsData,
  yearMatrix,
  years,
} from "@/constants";
import { AlertCircle, ArrowRight, Download, MoveRight } from "lucide-react";
import RevenueDonutChart from "@/components/common/dashboard/RevenueDonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/common/dashboard/StatsCard";
import CustomerRetentionChart from "@/components/common/dashboard/CustomerRetentionChart";
import MonthlyCohortTable from "@/components/common/MonthlyCohortTable";
import InsightsCard from "@/components/common/dashboard/InsightsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import YearlyCohortTable from "@/components/common/dashboard/YearlyCohortTable";
import QuartlyCohortTable from "@/components/common/dashboard/QuartlyCohortTable";
import { useGetDashboard } from "@/hooks/ReactQueryHooks/dashboard";
const page = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedType, setSelectedType] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [filters, setFilters] = useState({
    selectedYear: "2025",
    selectedType: "month",
    selectedMonth: "1",
    selectedQuarter: "",
  });
  const [chartValues, setChartValues] = useState([]);

  const {
    data: dashboardData,
    refetch,
    isLoading: loading,
    isError:error,
  } = useGetDashboard(filters);
  useEffect(() => {
    if (selectedType === "month") {
      setSelectedQuarter("");
      if (!selectedMonth) setSelectedMonth("1");
    }

    if (selectedType === "quarter") {
      setSelectedMonth("");
      if (!selectedQuarter) setSelectedQuarter("1");
    }

    if (selectedType === "year" && selectedYear !== "All") {
      setSelectedYear("2025");
      setSelectedMonth("");
      setSelectedQuarter("");
    }
  }, [selectedType]);
  useEffect(() => {
    setFilters({
      selectedYear,
      selectedType,
      selectedMonth,
      selectedQuarter,
    });
  }, [selectedYear, selectedType, selectedMonth, selectedQuarter]);
  useEffect(() => {
    if (!dashboardData) return;

    if (selectedType === "month") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.weekly || []);
    }

    if (selectedType === "quarter") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.quarterly || []);
    }

    if (selectedType === "year") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.monthly || []);
    }
    if (selectedYear === "All") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.yearly || []);
      setSelectedType("year");
    }
  }, [dashboardData, selectedType]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-primary-text text-[22px] font-semibold">
            Welcome back, Sarah 👋
          </h1>
          <p className="text-secondary-text text-sm">
            Here's your business health at a glance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={selectedYear}
            onValueChange={(year) => {
              setSelectedYear(year);
              // setSelectedType("");
              // setSelectedMonth("");
              // setSelectedQuarter("");
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedYear && selectedYear !== "All" && (
            <Select
              value={selectedType}
              onValueChange={(newType) => {
                setSelectedType(newType);
                setSelectedMonth("");
                setSelectedQuarter("");
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          )}

          {selectedType === "month" && (
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.id}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedType === "quarter" && (
            <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Quarter" />
              </SelectTrigger>
              <SelectContent>
                {quarters.map((quarter) => (
                  <SelectItem key={quarter.value} value={quarter.id}>
                    {quarter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select>
            <SelectTrigger className="w-[120px]">
              <Download />
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"csv"}>CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* header filters edn */}
      <Card>
        <CardContent className="grid grid-cols-4 px-0">
          {statsData.map((stat, index) => (
            <StatsCard
              stat={stat}
              key={index}
              index={index}
              statsData={statsData}
              statsDataRes={dashboardData?.data?.cohortGenie?.summary?.metrics}
              customers={dashboardData?.data?.cohortGenie?.summary?.customers}
              loading={loading}
              
            />
          ))}
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle> Customer Revenue by Cohort</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto">
            <CustomerRetentionChart data={chartValues} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle> Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueDonutChart />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between flex-row">
            <CardTitle> Cohort Retention Heatmap </CardTitle>
            <Link
              href={"/dashboard/heatmap"}
              className="flex items-center gap-x-2 text-[#9B6EEE] hover:underline underline-offset-2"
            >
              View Full Heatmap <MoveRight />
            </Link>
          </CardHeader>
          <CardContent className="mt-auto">
            {selectedYear === "All" && (
              <YearlyCohortTable
                matrix={
                  dashboardData?.data?.cohortGenie?.heatmap?.year?.yearMatrix
                }
                labels={dashboardData?.data?.cohortGenie?.heatmap?.year?.years}
                loading={loading}
              />
            )}
            {selectedType === "year" && selectedYear !== "All" && (
              <MonthlyCohortTable
                matrix={
                  dashboardData?.data?.cohortGenie?.heatmap?.month?.monthMatrix
                }
                labels={
                  dashboardData?.data?.cohortGenie?.heatmap?.month?.monthLabels
                }
                loading={loading}
              />
            )}
            {selectedType === "quarter" && (
              <QuartlyCohortTable
                matrix={
                  dashboardData?.data?.cohortGenie?.heatmap?.quarter
                    ?.quarterMatrix
                }
                labels={
                  dashboardData?.data?.cohortGenie?.heatmap?.quarter
                    ?.quarterLabels
                }
                loading={loading}
              />
            )}
            {selectedType === "month" && (
              <QuartlyCohortTable
                matrix={
                  dashboardData?.data?.cohortGenie?.heatmap?.month?.weekMatrix
                }
                labels={
                  dashboardData?.data?.cohortGenie?.heatmap?.month?.weekLabels
                }
                loading={loading}
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Key Insights
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <InsightsCard />
          </CardContent>
        </Card>
      </div>
      <div className="relative w-full rounded-md border border-[#9B6EEE] bg-[#9B6EEE1A] px-6 py-4 flex items-center justify-between overflow-hidden">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-[#9B6EEE] translate-y-1" />
          <div className="flex flex-col gap-y-1">
            <span className="text-[#9B6EEE] font-medium text-sm">
              Explore More Insights
            </span>
            <span className="text-[#9B6EEE] text-xs">
              Compare Q2 vs Q3 performance or dive deeper into cohort analysis
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="text-sm" variant={"main"}>
            Explore Heatmap <ArrowRight size={16} />
          </Button>
          <Button className="text-sm" variant={"outline"}>
            Compare Periods <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
