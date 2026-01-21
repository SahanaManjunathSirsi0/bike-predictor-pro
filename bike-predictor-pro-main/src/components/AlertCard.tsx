import { AlertTriangle, TrendingUp, Battery, Clock } from "lucide-react";

interface AlertCardProps {
  type: "warning" | "demand" | "availability" | "time";
  title: string;
  description: string;
  value?: string;
  delay?: number;
}

const AlertCard = ({ type, title, description, value, delay = 0 }: AlertCardProps) => {
  const config = {
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-status-high-demand/10",
      borderColor: "border-status-high-demand/30",
      iconColor: "text-status-high-demand",
    },
    demand: {
      icon: TrendingUp,
      bgColor: "bg-status-in-use/10",
      borderColor: "border-status-in-use/30",
      iconColor: "text-status-in-use",
    },
    availability: {
      icon: Battery,
      bgColor: "bg-status-available/10",
      borderColor: "border-status-available/30",
      iconColor: "text-status-available",
    },
    time: {
      icon: Clock,
      bgColor: "bg-metric-purple/10",
      borderColor: "border-metric-purple/30",
      iconColor: "text-metric-purple",
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor } = config[type];

  return (
    <div
      className={`${bgColor} ${borderColor} border rounded-xl p-4 animate-slide-up transition-all duration-300 hover:shadow-md`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-foreground text-sm truncate">{title}</h4>
            {value && (
              <span className={`text-sm font-semibold ${iconColor}`}>{value}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
