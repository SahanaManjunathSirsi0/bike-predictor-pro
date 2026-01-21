import { TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  type: "peak" | "alert" | "tip";
  title: string;
  description: string;
}

const icons = {
  peak: TrendingUp,
  alert: AlertCircle,
  tip: Lightbulb,
};

const colors = {
  peak: "bg-metric-green/10 text-metric-green border-metric-green/20",
  alert: "bg-metric-orange/10 text-metric-orange border-metric-orange/20",
  tip: "bg-metric-blue/10 text-metric-blue border-metric-blue/20",
};

const InsightCard = ({ type, title, description }: InsightCardProps) => {
  const Icon = icons[type];

  return (
    <div className={cn("rounded-lg p-4 border", colors[type])}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs opacity-80 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
