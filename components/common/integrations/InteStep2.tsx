// SyncingPage.tsx

import { Card, CardContent } from "@/components/ui/card";
import { GroupIcon } from "@/icons";
// import { Progress } from "@/components/ui/progress";
import { Check, Lock, Database, BarChart3, Loader2 } from "lucide-react";
import Image from "next/image";

// 1. Define the status data structure
const syncSteps = [
  {
    id: 1,
    title: "Connect to QuickBooks",
    status: "completed",
    icon: Lock,
  },
  {
    id: 2,
    title: "Fetching transaction data",
    status: "completed",
    icon: Database,
  },
  {
    id: 3,
    title: "Analyzing retention metrics",
    status: "in-progress",
    icon: BarChart3,
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

  // Tailwind classes for styling based on status
  const baseClasses =
    "flex items-center justify-between p-4 rounded-lg my-3 border transition-colors duration-300";
  let statusClasses = "";
  let iconColor = "";

  if (isCompleted) {
    statusClasses = "bg-green-50 border-green-300";
    iconColor = "text-green-600";
  } else if (isInProgress) {
    statusClasses =
      "bg-purple-50 border-purple-400 shadow-lg shadow-purple-100/50";
    iconColor = "text-purple-600";
  } else {
    // pending (not shown in this specific design, but good for completeness)
    statusClasses = "bg-gray-50 border-gray-300 opacity-70";
    iconColor = "text-gray-500";
  }

  return (
    <div className={`${baseClasses} ${statusClasses}`}>
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <span
          className={`font-medium ${isInProgress ? "text-purple-700" : "text-gray-700"}`}
        >
          {title}
        </span>
      </div>

      {/* Right side status indicator */}
      {isCompleted ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : isInProgress ? (
        <Loader2 className="h-5 w-5 text-purple-600 animate-spin" /> // Used for the "..." effect visually
      ) : (
        // Placeholder for pending state if needed
        <span className="text-gray-400"></span>
      )}
    </div>
  );
};

export default function InteStep2() {
  const progressValue = 90; // The value from the image

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2 text-2xl text-primary-text font-semibold mb-6">
          <GroupIcon color="#9B6EEE" />
          <h1>Syncing your QuickBooks Data</h1>
        </div>
        <p className="text-secondary-text">
          We're analyzing your transactions and preparing your first dashboard
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-xl border-gray-100/50 p-6">
        <CardContent className="flex flex-col items-center p-0">
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
            {/* Custom progress bar appearance */}
            {/* <Progress 
              value={progressValue} 
              className="h-2 [&>div]:bg-purple-500" // Override shadcn default to use purple
            /> */}
          </div>

          {/* Status Steps */}
          <div className="w-full">
            {syncSteps.map((step) => (
              <SyncStep
                key={step.id}
                title={step.title}
                status={step.status as "completed" | "in-progress"}
                Icon={step.icon}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            This may take a few moments. Your Dashboard will load automatically
            when ready.
          </p>
        </CardContent>
      </Card>

      {/* Security Footer */}
      <div className="mt-10 flex items-center space-x-2 text-sm text-gray-600">
        <Lock className="h-4 w-4 text-purple-600" />
        <span>Your data is encrypted and processed securely</span>
      </div>
    </div>
  );
}
