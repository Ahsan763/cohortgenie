import { insights } from "@/constants";

export default function InsightsCard() {
  return (
    <>
      {insights.map((item: any, i) => (
        <div key={i} className="flex items-start gap-4">
          <div
            className={`w-[50px] h-[50px] bg-[#F2F2F2] rounded-full flex items-center justify-center shrink-0`}
          >
            <item.icon
              color={
                item?.title?.trim().split(" ")[0].toLowerCase() === "churn"
                  ? "#FF3B30"
                  : "#9B6EEE"
              }
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`text-base font-semibold ${
                item?.title?.trim().split(" ")[0].toLowerCase() === "churn"
                  ? "text-[#FF3B30]"
                  : "text-[#9B6EEE]"
              }`}
            >
              {item?.title}
            </span>
            <span className="text-gray-500 text-sm">{item?.desc}</span>
          </div>
        </div>
      ))}
    </>
  );
}
