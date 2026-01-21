import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChartData {
  label: string;
  value: number;
  predicted?: number;
}

interface PredictionChartProps {
  data: ChartData[];
  type?: "line" | "area";
  title?: string;
}

const PredictionChart = ({ data, type = "area", title }: PredictionChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary font-semibold">
            Demand: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      {title && (
        <h4 className="text-sm font-medium text-muted-foreground mb-4">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height="100%">
        {type === "area" ? (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(210, 20%, 90%)" }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(210, 20%, 90%)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(173, 58%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(210, 20%, 90%)" }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }}
              axisLine={{ stroke: "hsl(210, 20%, 90%)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(173, 58%, 39%)"
              strokeWidth={2}
              dot={{ fill: "hsl(173, 58%, 39%)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "hsl(173, 58%, 39%)" }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
