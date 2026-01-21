import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface ParsedCSVResponse {
  columns: string[];
  rows_received: number;
  rows_used: number;
  invalid_rows: number;
  total_demand: number;
  hourly_demand: Record<string, number>;
  daily_demand: Record<string, number>;
  peak_hour: {
    hour: number;
    demand: number;
  };
  peak_day: {
    date: string;
    demand: number;
  };
}

export const useCSVUpload = () => {
  const [data, setData] = useState<ParsedCSVResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast.error("Only CSV files are supported");
      return;
    }

    setIsLoading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/api/parse/csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse CSV");
      }

      const parsed = (await response.json()) as ParsedCSVResponse;

      setData(parsed);

      toast.success(
        `Parsed ${parsed.rows_used} rows · Peak hour ${parsed.peak_hour.hour}:00`
      );
    } catch (err) {
      console.error(err);
      toast.error("Backend CSV parsing failed");
      setFileName(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setFileName(null);
  }, []);

  return {
    data,           // 🔥 THIS is the real parsed data
    isLoading,
    fileName,
    handleFileUpload,
    clearData,
  };
};
