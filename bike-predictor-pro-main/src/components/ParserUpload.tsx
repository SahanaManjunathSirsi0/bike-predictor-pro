import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const ParserUpload = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/api/parse/csv", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="font-bold mb-4">📄 Smart File Parser</h2>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="file" hidden onChange={handleUpload} />
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload CSV / PDF
        </Button>
      </label>

      {loading && <p className="mt-4">Parsing file...</p>}

      {result && (
        <pre className="mt-4 text-xs bg-muted p-3 rounded overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ParserUpload;
