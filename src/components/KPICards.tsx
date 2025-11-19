import { Card, CardContent } from "@/components/ui/card";
import { Premise } from "@/types/premise";
import { TrendingUp, TrendingDown, Droplet, Activity, CheckCircle2 } from "lucide-react";

interface KPICardsProps {
  selectedPremises: Premise[];
}

export const KPICards = ({ selectedPremises }: KPICardsProps) => {
  const totalConsumption = selectedPremises.reduce((sum, p) => sum + p.consumptionLast12Months, 0);
  const activeLeaks = selectedPremises.reduce((sum, p) => sum + p.activeLeaks, 0);
  
  const indexCounts = selectedPremises.reduce((acc, p) => {
    acc[p.smartvattenIndex]++;
    return acc;
  }, { GOOD: 0, NEUTRAL: 0, BAD: 0 } as Record<Premise["smartvattenIndex"], number>);
  
  const statusCounts = selectedPremises.reduce((acc, p) => {
    acc[p.monitoringStatus]++;
    return acc;
  }, { FULL: 0, MAIN_METER_ONLY: 0, SUBMETER_ONLY: 0, NOT_INSTALLED: 0 } as Record<Premise["monitoringStatus"], number>);

  const changePercentage = 12.5; // Mock data
  const isPositive = changePercentage > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Consumption</p>
              <h3 className="text-3xl font-bold text-smart-dark mt-2">
                {totalConsumption.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">m³ last 12 months</p>
            </div>
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <div className={`flex items-center gap-1 mt-4 text-sm ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-semibold">{Math.abs(changePercentage)}%</span>
            <span className="text-muted-foreground">vs previous period</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-destructive">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Leaks</p>
              <h3 className="text-3xl font-bold text-smart-dark mt-2">{activeLeaks}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedPremises.length} premise{selectedPremises.length !== 1 ? 's' : ''} monitored
              </p>
            </div>
            <Droplet className="h-8 w-8 text-destructive" />
          </div>
          {activeLeaks === 0 && (
            <div className="flex items-center gap-1 mt-4 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Everything looks normal</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Smartvatten Index</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Good</span>
                <span className="text-2xl font-bold text-green-700">{indexCounts.GOOD}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-700">Neutral</span>
                <span className="text-2xl font-bold text-yellow-700">{indexCounts.NEUTRAL}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700">Bad</span>
                <span className="text-2xl font-bold text-red-700">{indexCounts.BAD}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-smart-coral">
        <CardContent className="p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monitoring Coverage</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Full monitoring</span>
                <span className="font-semibold text-smart-dark">{statusCounts.FULL}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Main meter only</span>
                <span className="font-semibold text-smart-dark">{statusCounts.MAIN_METER_ONLY}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Submeter only</span>
                <span className="font-semibold text-smart-dark">{statusCounts.SUBMETER_ONLY}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Not installed</span>
                <span className="font-semibold text-smart-dark">{statusCounts.NOT_INSTALLED}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
