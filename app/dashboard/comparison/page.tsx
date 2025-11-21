import CohortRetention2LineChart from "@/components/common/dashboard/CohortRetention2LineChart";
import MetricsComparisonTable from "@/components/common/MetricsComparisonTable";
import { Card, CardContent } from "@/components/ui/card";
import { chartData2lines, MetricsComparisonTableData } from "@/constants";
import React from "react";

const page = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">
            GDR Comparison (April 2024 vs Oct 2024)
          </h2>
          <CohortRetention2LineChart data={chartData2lines} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <MetricsComparisonTable data={MetricsComparisonTableData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
