import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Premise, ReportType } from "@/types/premise";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ReportsPanelProps {
  selectedPremises: Premise[];
}

const reportTypes: { value: ReportType; label: string; format: "PDF" | "EXCEL" }[] = [
  { value: "premise_pdf", label: "Premise PDF Report", format: "PDF" },
  { value: "monthly", label: "Monthly Report", format: "EXCEL" },
  { value: "hourly", label: "Hourly Report", format: "EXCEL" },
  { value: "daily", label: "Daily Report", format: "EXCEL" },
  { value: "monthly_readings", label: "Monthly Readings", format: "EXCEL" },
  { value: "daily_leakage", label: "Daily Leakage Report", format: "EXCEL" },
  { value: "consumption", label: "Consumption Report", format: "EXCEL" },
];

export const ReportsPanel = ({ selectedPremises }: ReportsPanelProps) => {
  const [selectedReport, setSelectedReport] = useState<ReportType>("premise_pdf");

  const handleGenerateReport = (format: "PDF" | "EXCEL") => {
    const reportType = reportTypes.find(r => r.value === selectedReport);
    toast.success(`${format} report generated (mock)`, {
      description: `${reportType?.label} for ${selectedPremises.length} premise(s)`,
    });
  };

  const mockAlerts = [
    { type: "leak", premise: "As Oy Auringonpaiste", message: "Active leak detected" },
    { type: "consumption", premise: "Vattentornet", message: "Abnormal consumption pattern" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-smart-dark">Generate Reports</CardTitle>
          <p className="text-sm text-muted-foreground">
            {selectedPremises.length} premise{selectedPremises.length !== 1 ? 's' : ''} selected
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={selectedReport} onValueChange={(value) => setSelectedReport(value as ReportType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center justify-between w-full gap-2">
                      <span>{type.label}</span>
                      <Badge variant="outline" className="text-xs">{type.format}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPremises.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Select at least one premise to generate reports
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleGenerateReport("PDF")}
              disabled={selectedPremises.length === 0}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
            <Button
              onClick={() => handleGenerateReport("EXCEL")}
              disabled={selectedPremises.length === 0}
              variant="outline"
              className="gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-smart-dark flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAlerts.map((alert, index) => (
            <div key={index} className="p-3 bg-smart-rose rounded-lg border border-smart-rose">
              <p className="text-sm font-medium text-smart-dark">{alert.premise}</p>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-smart-coral/20 border-primary/20">
        <CardHeader>
          <CardTitle className="text-smart-dark">ESG & Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Water Efficiency Score</p>
            <p className="text-2xl font-bold text-primary">8.5 / 10</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Suggested Action</p>
            <p className="text-sm text-muted-foreground">
              Focus on reducing consumption at premises with "Bad" Smartvatten Index
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
