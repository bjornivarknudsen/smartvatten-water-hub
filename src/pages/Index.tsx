import { useState } from "react";
import { Header } from "@/components/Header";
import { LocationCard } from "@/components/LocationCard";
import { KPICards } from "@/components/KPICards";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { ReportsPanel } from "@/components/ReportsPanel";
import { mockPremises } from "@/data/mockPremises";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [selectedPremiseIds, setSelectedPremiseIds] = useState<Set<string>>(new Set(["1", "2"]));

  const selectedPremises = mockPremises.filter((p) => selectedPremiseIds.has(p.id));
  const totalActiveLeaks = mockPremises.reduce((sum, p) => sum + p.activeLeaks, 0);

  const togglePremiseSelection = (id: string) => {
    setSelectedPremiseIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeLeaksCount={totalActiveLeaks} />
      
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Location Cards */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-smart-dark mb-4">Premises</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  {mockPremises.map((premise) => (
                    <LocationCard
                      key={premise.id}
                      premise={premise}
                      isSelected={selectedPremiseIds.has(premise.id)}
                      onSelect={() => togglePremiseSelection(premise.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Center Panel - Analytics Dashboard */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-smart-dark mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">
                Showing data for {selectedPremises.length} selected premise{selectedPremises.length !== 1 ? 's' : ''}
              </p>
            </div>

            {selectedPremises.length > 0 ? (
              <>
                <KPICards selectedPremises={selectedPremises} />
                <ConsumptionChart selectedPremises={selectedPremises} />
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-card rounded-2xl border-2 border-dashed">
                <p className="text-muted-foreground text-lg">
                  Select a premise to view analytics
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Reports & Actions */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-smart-dark mb-4">Reports & Actions</h2>
              <ReportsPanel selectedPremises={selectedPremises} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
