import { MoveDown, MoveUp } from "lucide-react";
const ChangeIndicator = ({ value }: any) => {
  const isPositive = value >= 0;
  const colorClass = isPositive
    ? "text-green-600 bg-green-50"
    : "text-red-600 bg-red-50";
  const icon = isPositive ? <MoveUp size={14} /> : <MoveDown size={14} />;
  const formattedValue = `${isPositive ? "+" : ""}${Math.abs(value).toFixed(1)}%`;
  return (
    <div
      className={`flex w-fit items-center justify-end font-medium px-2 py-1 rounded-full gap-x-1 ${colorClass} sm:min-w-20]`}
    >
      {icon}
      <span className="text-sm">{formattedValue}</span>
    </div>
  );
};
const MetricsComparisonTable = ({ data }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left font-medium">
        <thead className="text-xs text-primary-text uppercase bg-[#F9FAFB]">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium w-1/4">
              Metric
            </th>
            <th scope="col" className="px-6 py-3 font-medium w-1/4">
              April 2024 (Current)
            </th>
            <th scope="col" className="px-6 py-3 font-medium w-1/4">
              Oct 2024
            </th>
            <th scope="col" className="px-6 py-3 font-medium w-1/4">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((data: any, index: any) => (
            <tr
              key={data.metric}
              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <td className="px-6 py-4 font-medium text-primary-text whitespace-nowrap">
                {data.metric}
              </td>
              <td className={`px-6 py-4 font-semibold text-[#9B6EEE]`}>
                {data.current}
              </td>
              <td className="px-6 py-4 text-secondary-text">{data.previous}</td>
              <td className="px-6 py-4 text-right">
                <ChangeIndicator value={data.change} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricsComparisonTable;
