import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "purple";
  delay?: number;
}

const colorClasses = {
  green: "text-secondary border-secondary/30 bg-secondary/10",
  blue: "text-primary border-primary/30 bg-primary/10",
  orange: "text-accent border-accent/30 bg-accent/10",
  purple: "text-metric-purple border-metric-purple/30 bg-metric-purple/10",
};

const glowClasses = {
  green: "group-hover:neon-green",
  blue: "group-hover:neon-blue",
  orange: "group-hover:neon-orange",
  purple: "group-hover:shadow-[0_0_20px_hsl(280_100%_65%/0.3)]",
};

const MetricCard = ({ title, value, subtitle, icon: Icon, color, delay = 0 }: MetricCardProps) => {
  return (
    <div 
      className="glass-card rounded-xl p-5 hover:shadow-hover transition-all duration-300 animate-slide-up group cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-extrabold text-foreground animate-pulse-soft">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl border transition-all duration-300",
          colorClasses[color],
          glowClasses[color]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
