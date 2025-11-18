"use client";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

const StatsCard = ({
  stat,
  index,
  statsData,
  statsDataRes,
  customers,
}: any) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`flex-1 min-w-[220px] flex items-start justify-between p-[22px] group ${index !== statsData.length - 1 ? "border-r border-[#E5E7EB]" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col gap-y-1">
        <div className="w-10 h-10 flex items-center rounded-full justify-center bg-transparent group-hover:bg-[#9B6EEE]/10 mb-3 transition-all">
          {hover ? (
            <stat.fillIcon color={"#9B6EEE"} />
          ) : (
            <stat.icon color={"#6B7280"} />
          )}
        </div>

        <span className="text-secondary-text text-sm font-medium">
          {stat.title}
        </span>
        <div className="text-[28px] font-bold text-primary-text group-hover:text-[#9B6EEE] transition-all">
          {index === 0 && statsDataRes?.GDR}
          {index === 1 && statsDataRes?.NDR}
          {index === 2 && statsDataRes?.LTV}
          {index === 3 && customers}
          {/* {stat.value} */}
        </div>
        <span className="text-secondary-text text-sm">
          {index === 3 ? `Churn Rate: ${statsDataRes?.churn}` : stat.label}
        </span>
      </div>
      {/* <div className="flex items-center bg-green-50 text-green-600 rounded-lg px-2 py-1 text-xs font-medium">
        <ArrowUp className="w-3.5 h-3.5 mr-1" />
        {stat.growth}
      </div> */}
    </div>
  );
};

export default StatsCard;
