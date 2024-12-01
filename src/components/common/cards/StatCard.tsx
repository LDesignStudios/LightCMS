import { formatNumber } from "@/lib/formatters/number";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: number;
  icon: IconType;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-6 bg-white">
      <div className="flex items-center justify-between pb-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="text-2xl font-black text-gray-950"> {formatNumber(value)}</div>
    </div>
  );
}
