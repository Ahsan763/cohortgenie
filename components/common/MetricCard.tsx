const MetricCard = ({
  icon: Icon,
  primaryText,
  secondaryText,
  loading,
  chartComponent: Chart,
}: any) => (
  <div className="flex items-center justify-between gap-x-4 flex-wrap p-8 border border-[#E5E7EB] rounded-xl bg-white">
    <div className="flex items-center gap-x-4">
      <div
        className={`w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#F2F2F2] shrink-0`}
      >
        <Icon color="#6B7280" />
      </div>
      <div>
        <p className="text-xs text-secondary-text">
          {loading ? "---" : secondaryText}
        </p>
        <h3 className="text-xl font-semibold text-primary-text mt-0.5">
          {loading ? "---" : primaryText}
        </h3>
      </div>
    </div>
    <div>{Chart}</div>
  </div>
);
export default MetricCard;
