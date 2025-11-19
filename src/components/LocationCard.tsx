import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Premise } from "@/types/premise";
import { MapPin, Droplet, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  premise: Premise;
  isSelected: boolean;
  onSelect: () => void;
}

const getIndexColor = (index: Premise["smartvattenIndex"]) => {
  switch (index) {
    case "GOOD":
      return "bg-green-100 text-green-800 border-green-200";
    case "NEUTRAL":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "BAD":
      return "bg-red-100 text-red-800 border-red-200";
  }
};

const getStatusLabel = (status: Premise["monitoringStatus"]) => {
  switch (status) {
    case "FULL":
      return "Full monitoring";
    case "MAIN_METER_ONLY":
      return "Main meter only";
    case "SUBMETER_ONLY":
      return "Submeter only";
    case "NOT_INSTALLED":
      return "Not installed";
  }
};

export const LocationCard = ({ premise, isSelected, onSelect }: LocationCardProps) => {
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+0060FF(${premise.lng || 24.9384},${premise.lat || 60.1699})/auto/400x200@2x?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTRrdHdwZzEwa3RsMmtzMGw0Y3JqMGN4In0.0Fq_PGJBVmE2nWVnJvzMVQ`;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg",
        isSelected && "border-2 border-primary shadow-xl ring-2 ring-primary/20"
      )}
      onClick={onSelect}
    >
      <div className="relative h-32 overflow-hidden rounded-t-2xl bg-smart-coral">
        <img
          src={mapUrl}
          alt={`Map of ${premise.name}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <MapPin className="h-6 w-6 text-primary drop-shadow-lg" />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-smart-dark">{premise.name}</h3>
          <p className="text-sm text-muted-foreground">
            {premise.address}, {premise.zip} {premise.city}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last 12 months:</span>
            <span className="font-semibold">{premise.consumptionLast12Months.toLocaleString()} m³</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Index:</span>
            <Badge className={cn("text-xs", getIndexColor(premise.smartvattenIndex))}>
              {premise.smartvattenIndex}
            </Badge>
          </div>
          
          {premise.activeLeaks > 0 && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <Droplet className="h-4 w-4" />
              <span className="font-medium">{premise.activeLeaks} Active Leak{premise.activeLeaks !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{getStatusLabel(premise.monitoringStatus)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
