import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Premise } from "@/types/premise";

interface ConsumptionChartProps {
  selectedPremises: Premise[];
}

// Mock data for consumption over time
const generateMockData = (premises: Premise[]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const totalYearly = premises.reduce((sum, p) => sum + p.consumptionLast12Months, 0);
  
  return months.map((month, index) => ({
    month,
    consumption: Math.round((totalYearly / 12) * (0.8 + Math.random() * 0.4)),
    previousYear: Math.round((totalYearly / 12) * (0.75 + Math.random() * 0.5)),
  }));
};

export const ConsumptionChart = ({ selectedPremises }: ConsumptionChartProps) => {
  const data = generateMockData(selectedPremises);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-smart-dark">Water Consumption Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Monthly consumption comparison</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              label={{ value: 'm³', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="consumption" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="This Year"
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              type="monotone" 
              dataKey="previousYear" 
              stroke="hsl(var(--smart-coral))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Previous Year"
              dot={{ fill: 'hsl(var(--smart-coral))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
