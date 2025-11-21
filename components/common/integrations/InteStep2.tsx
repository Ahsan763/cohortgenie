// SyncingPage.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartIcon,
  CheckFillIcon,
  DatabaseIcon,
  GroupIcon,
  LockIcon,
} from "@/icons";
// import { Progress } from "@/components/ui/progress";
import { Check, Lock, Database, BarChart3, Loader2 } from "lucide-react";
import Image from "next/image";

// 1. Define the status data structure
const syncSteps = [
  {
    id: 1,
    title: "Connect to QuickBooks",
    status: "completed",
    icon: LockIcon,
  },
  {
    id: 2,
    title: "Fetching transaction data",
    status: "completed",
    icon: DatabaseIcon,
  },
  {
    id: 3,
    title: "Analyzing retention metrics",
    status: "in-progress",
    icon: ChartIcon,
  },
];

// 2. Custom Component for a single sync step
interface SyncStepProps {
  title: string;
  status: "completed" | "in-progress" | "pending";
  Icon: React.ElementType;
}

const SyncStep = ({ title, status, Icon }: SyncStepProps) => {
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  const baseClasses =
    "flex items-center justify-between p-4 rounded-lg border transition-colors duration-300";
  let statusClasses = "";
  let iconColor = "";

  if (isCompleted) {
    statusClasses = "bg-[#F0FDF4] border-[#9DDFB7]";
    iconColor = "#009A3E";
  } else if (isInProgress) {
    statusClasses = "border-[#9B6EEE]";
    iconColor = "#9B6EEE";
  } else {
    statusClasses = "bg-gray-50 border-gray-300 opacity-70";
    iconColor = "text-gray-500";
  }

  return (
    <div className={`${baseClasses} ${statusClasses}`}>
      <div className="flex items-center space-x-3">
        <Icon color={`${iconColor}`} />
        <span
          className={`font-medium text-sm ${isInProgress ? "text-[#9B6EEE]" : "text-[#009A3E]"}`}
        >
          {title}
        </span>
      </div>

      {isCompleted ? (
        <CheckFillIcon color="#009A3E" />
      ) : isInProgress ? (
        <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
      ) : (
        <span className="text-gray-400"></span>
      )}
    </div>
  );
};

export default function InteStep2() {
  const progressValue = 90;

  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2 text-2xl text-primary-text font-semibold mb-6">
          <GroupIcon color="#9B6EEE" />
          <h1>Syncing your QuickBooks Data</h1>
        </div>
        <p className="text-secondary-text">
          We're analyzing your transactions and preparing your first dashboard
        </p>
      </div>

      <Card className="w-full">
        <CardContent className="flex flex-col items-center px-16 py-4">
          <div className="bg-[#9B6EEE33] flex items-center rounded-full justify-center border-2 border-white w-20 h-20 outline-4 outline-[#9B6EEE33] mb-6">
            <div className="bg-[#283E6D] w-16 h-16 flex items-center justify-center rounded-full">
              <Image
                src="/images/logo-sm.svg"
                width={193}
                height={36}
                alt="CohortGenie"
                className="h-[47] w-[]47"
              />
            </div>
          </div>

          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-secondary-text">Progress</span>
              <span className="font-semibold text-primary-text flex items-center">
                {progressValue}%
                <Loader2 className="h-4 w-4 text-gray-400 ml-1 animate-spin" />
              </span>
            </div>
            <Progress
              value={progressValue}
              className="h-2 [&>div]:bg-[#9B6EEE]"
            />
          </div>

          <div className="w-full space-y-6 mb-8">
            {syncSteps.map((step) => (
              <SyncStep
                key={step.id}
                title={step.title}
                status={step.status as "completed" | "in-progress"}
                Icon={step.icon}
              />
            ))}
          </div>

          <p className="text-sm text-secondary-text text-center">
            This may take a few moments. Your Dashboard will load automatically
            when ready.
          </p>
        </CardContent>
      </Card>

      <div className="mt-10 flex items-center justify-center font-medium gap-x-4 text-sm text-secondary-text">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#9B6EEE1A]">
          <Lock className="h-4 w-4 text-purple-600" />
        </div>
        <span className="text-sm">Your data is encrypted and processed securely</span>
      </div>
    </>
  );
}
