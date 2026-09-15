export type SimulationState = 'IDLE_NORMAL' | 'CRASH_SEQUENCE' | 'EMERGENCY_ACTIVE' | 'RESOLVED';

export type CrashSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface VehicleTelemetry {
  vehicleId: string;
  model: string;
  status: 'CONNECTED' | 'CRASH_DETECTED' | 'EMERGENCY_MODE';
  gps: {
    lat: number;
    lng: number;
    formatted: string;
    street: string;
  };
  speed: number; // in km/h
  airbagStatus: 'NORMAL' | 'DEPLOYED';
  dashcamStatus: 'RECORDING' | 'BUFFER_LOCKED_SAVED';
  connectivity: 'ONLINE' | 'EMERGENCY_UPLINK';
  emergencySystem: 'STANDBY' | 'ACTIVATED' | 'TRANSMITTING' | 'PACKET_SENT';
  impactForceG: number;
  impactZone: string;
  occupantsDetected: number;
  batteryLevel: number;
}

export interface EmergencyPacket {
  incidentId: string;
  vehicleId: string;
  timestamp: string;
  gpsLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  crashSeverity: CrashSeverity;
  estimatedImpact: string;
  airbagStatus: 'DEPLOYED' | 'NORMAL';
  dashcamStatus: string;
  dashcamBufferSeconds: number;
  sosStatus: 'PENDING' | 'SENT' | 'ACKNOWLEDGED';
  selectedHospitalId: string;
  status: 'TRANSMITTING' | 'TRANSMITTED';
}

export interface SimulationStep {
  stepNumber: number;
  title: string;
  description: string;
  timestampOffset: number; // in ms
  statusKey: string;
}

export interface TimelineEvent {
  id: string;
  timeString: string;
  title: string;
  detail: string;
  category: 'VEHICLE' | 'SYSTEM' | 'AMBULANCE' | 'POLICE' | 'HOSPITAL';
  icon: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  type: string;
  distanceKm: number;
  travelTimeMin: number;
  emergencyCapability: 'Available' | 'Limited' | 'Full Level 1 Trauma';
  traumaBedsAvailable: number;
  specialties: string[];
  isAppropriate: boolean;
  selectionReason: string;
}

export interface ResponderUnit {
  id: string;
  unitName: string;
  type: 'AMBULANCE' | 'POLICE';
  status: 'IDLE' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE';
  currentEta: string;
  assignedIncident: string | null;
  locationLabel: string;
}
