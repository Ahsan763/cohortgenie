"use client";
import CohortRetention2LineChart from "@/components/common/dashboard/CohortRetention2LineChart";
import MetricsComparisonTable from "@/components/common/MetricsComparisonTable";
import { Card, CardContent } from "@/components/ui/card";
import {
  chartData2lines,
  MetricsComparisonTableData,
  months,
  quarters,
  years,
  yearsOnly,
} from "@/constants";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import FiltersSheet from "@/components/common/FiltersSheet";
import { SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
const page = () => {
  const formatDate = (date?: Date) => {
    if (!date) return null;
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const [open, setOpen] = useState(false);

  const [staticYears, setStaticYears] = useState(yearsOnly);
  const [staticQuarters, setStaticQuarters] = useState(quarters);
  const [staticMonths, setStaticMonths] = useState(months);

  // SEPARATE arrays for Period 2
  const [staticYears2, setStaticYears2] = useState(yearsOnly);
  const [staticQuarters2, setStaticQuarters2] = useState(quarters);
  const [staticMonths2, setStaticMonths2] = useState(months);

  const [filterType, setFilterType] = useState("year");

  // PERIOD 1
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  // PERIOD 2
  const [selectedYear2, setSelectedYear2] = useState("");
  const [selectedMonth2, setSelectedMonth2] = useState("");
  const [selectedQuarter2, setSelectedQuarter2] = useState("");

  // Filter Period 2 options based on Period 1 selections
  useEffect(() => {
    if (filterType === "year" && selectedYear) {
      setStaticYears2(yearsOnly.filter((y) => y !== selectedYear));
    }
  }, [selectedYear, filterType]);

  useEffect(() => {
    if (filterType === "month" && selectedMonth) {
      // Sirf tab filter karo jab years SAME hain
      if (selectedYear === selectedYear2) {
        setStaticMonths2(months.filter((m) => m.id !== selectedMonth));
      } else {
        // Years different hain to sab months available
        setStaticMonths2(months);
      }
    }
  }, [selectedMonth, selectedYear, selectedYear2, filterType]);

  useEffect(() => {
    if (filterType === "quarter" && selectedQuarter) {
      // Sirf tab filter karo jab years SAME hain
      if (selectedYear === selectedYear2) {
        setStaticQuarters2(quarters.filter((q) => q.id !== selectedQuarter));
      } else {
        // Years different hain to sab quarters available
        setStaticQuarters2(quarters);
      }
    }
  }, [selectedQuarter, selectedYear, selectedYear2, filterType]);

  // Jab year2 change ho to months/quarters ko re-evaluate karo
  useEffect(() => {
    if (filterType === "month") {
      if (selectedYear === selectedYear2 && selectedMonth) {
        setStaticMonths2(months.filter((m) => m.id !== selectedMonth));
      } else {
        setStaticMonths2(months);
      }
    }

    if (filterType === "quarter") {
      if (selectedYear === selectedYear2 && selectedQuarter) {
        setStaticQuarters2(quarters.filter((q) => q.id !== selectedQuarter));
      } else {
        setStaticQuarters2(quarters);
      }
    }
  }, [selectedYear2, filterType]);

  // Reset everything when filter type changes
  useEffect(() => {
    setSelectedMonth("");
    setSelectedMonth2("");
    setSelectedQuarter("");
    setSelectedQuarter2("");
    setSelectedYear2("");

    // Reset Period 1 options
    setStaticMonths(months);
    setStaticQuarters(quarters);
    setStaticYears(yearsOnly);

    // Reset Period 2 options
    setStaticMonths2(months);
    setStaticQuarters2(quarters);
    setStaticYears2(yearsOnly);
  }, [filterType]);

  const handleSubmit = () => {
    let period1 = "";
    let period2 = "";
    let type = filterType;

    // Validation check karo
    if (type === "month") {
      if (
        !selectedMonth ||
        !selectedYear ||
        !selectedMonth2 ||
        !selectedYear2
      ) {
        toast.error("All Filter Values are Required");
        return null;
      }
      period1 = `${selectedMonth}-${selectedYear}`;
      period2 = `${selectedMonth2}-${selectedYear2}`;
    }

    if (type === "quarter") {
      if (
        !selectedQuarter ||
        !selectedYear ||
        !selectedQuarter2 ||
        !selectedYear2
      ) {
        toast.error("All Filter Values are Required", {});
        return null;
      }
      period1 = `${selectedQuarter}-${selectedYear}`;
      period2 = `${selectedQuarter2}-${selectedYear2}`;
    }

    if (type === "year") {
      if (!selectedYear || !selectedYear2) {
        toast.error("All Filter Values are Required", {});
        return null;
      }
      period1 = selectedYear;
      period2 = selectedYear2;
    }

    const payload = {
      type,
      period1,
      period2,
    };

    console.log("FINAL SUBMIT DATA:", payload);
    toast.success("Filters applied successfully!");
    return payload;
  };
  return (
    <div className="space-y-8">
      <FiltersSheet
        open={open}
        setOpen={setOpen}
        // Period 1 options
        staticYears={staticYears}
        staticQuarters={staticQuarters}
        staticMonths={staticMonths}
        // Period 2 options (NEW!)
        staticYears2={staticYears2}
        staticQuarters2={staticQuarters2}
        staticMonths2={staticMonths2}
        filterType={filterType}
        setFilterType={setFilterType}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        // period2
        selectedYear2={selectedYear2}
        setSelectedYear2={setSelectedYear2}
        selectedQuarter2={selectedQuarter2}
        setSelectedQuarter2={setSelectedQuarter2}
        selectedMonth2={selectedMonth2}
        setSelectedMonth2={setSelectedMonth2}
        handleSubmit={handleSubmit}
      />

      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <h2 className="text-lg font-semibold mb-2">
              GDR Comparison (April 2024 vs Oct 2024)
            </h2>
            <div className="flex items-center gap-3">
              <Button variant={"main"} onClick={() => setOpen((prev) => !prev)}>
                <SlidersHorizontal />
                Filters
              </Button>
            </div>
          </div>

          <CohortRetention2LineChart data={chartData2lines} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <MetricsComparisonTable data={MetricsComparisonTableData} />
        </CardContent>
      </Card>
      {/* filter sheet aside bar */}
    </div>
  );
};

export default page;
