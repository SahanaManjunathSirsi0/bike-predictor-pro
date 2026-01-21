import { useRef, DragEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, X, CheckCircle } from "lucide-react";

interface CSVUploadProps {
  onFileUpload: (file: File) => void;
  fileName: string | null;
  isLoading: boolean;
  onClear: () => void;
}

const CSVUpload = ({ onFileUpload, fileName, isLoading, onClear }: CSVUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileUpload(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  if (fileName) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{fileName}</p>
            <p className="text-xs text-muted-foreground">Dataset loaded</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
        ${isDragging 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50 hover:bg-muted/30"
        }
      `}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
      />
      
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <FileSpreadsheet className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      
      <p className="text-sm font-medium text-foreground mb-1">
        {isLoading ? "Processing..." : "Drop your CSV file here"}
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        or click to browse
      </p>
      
      <Button variant="outline" size="sm" disabled={isLoading}>
        <Upload className="w-4 h-4 mr-2" />
        Upload Dataset
      </Button>
    </div>
  );
};

export default CSVUpload;
