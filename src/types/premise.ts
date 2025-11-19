export type SmartvattenIndex = "GOOD" | "NEUTRAL" | "BAD";

export type MonitoringStatus = 
  | "FULL" 
  | "MAIN_METER_ONLY" 
  | "SUBMETER_ONLY" 
  | "NOT_INSTALLED";

export interface Premise {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  propertyManager: string;
  consumptionLast12Months: number;
  smartvattenIndex: SmartvattenIndex;
  activeLeaks: number;
  monitoringStatus: MonitoringStatus;
  lat?: number;
  lng?: number;
}

export type ReportType = 
  | "premise_pdf"
  | "monthly"
  | "hourly"
  | "daily"
  | "monthly_readings"
  | "daily_leakage"
  | "consumption";
