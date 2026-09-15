import { HospitalFacility, ResponderUnit, VehicleTelemetry, EmergencyPacket } from '../types';

export const INITIAL_VEHICLE_STATE: VehicleTelemetry = {
  vehicleId: 'VH-8842-EV',
  model: 'CityNexus Urban Mobility EV (Integrated Telematics)',
  status: 'CONNECTED',
  gps: {
    lat: 28.6139,
    lng: 77.2090,
    formatted: '28.6139° N, 77.2090° E',
    street: 'Outer Ring Rd at Sector 4 Junction',
  },
  speed: 62,
  airbagStatus: 'NORMAL',
  dashcamStatus: 'RECORDING',
  connectivity: 'ONLINE',
  emergencySystem: 'STANDBY',
  impactForceG: 0.1,
  impactZone: 'None',
  occupantsDetected: 2,
  batteryLevel: 84,
};

export const INITIAL_EMERGENCY_PACKET: EmergencyPacket = {
  incidentId: 'INC-2026-0915-001',
  vehicleId: 'VH-8842-EV',
  timestamp: '21:54:01',
  gpsLocation: {
    lat: 28.6139,
    lng: 77.2090,
    address: 'Outer Ring Rd at Sector 4 Junction',
  },
  crashSeverity: 'HIGH',
  estimatedImpact: '18.4 G Impact (Severe Front Deceleration)',
  airbagStatus: 'DEPLOYED',
  dashcamStatus: 'Last 2 minutes circular buffer saved',
  dashcamBufferSeconds: 120,
  sosStatus: 'SENT',
  selectedHospitalId: 'HOSP-A',
  status: 'TRANSMITTED',
};

export const HOSPITALS_DATA: HospitalFacility[] = [
  {
    id: 'HOSP-A',
    name: 'Hospital A',
    type: 'Regional Emergency Center',
    distanceKm: 4.2,
    travelTimeMin: 8,
    emergencyCapability: 'Available',
    traumaBedsAvailable: 4,
    specialties: ['Emergency Trauma Care', 'Critical Surgery ICU'],
    isAppropriate: true,
    selectionReason: 'Appropriate match: Emergency capacity available, fully equipped for severe collision impacts, 8 min travel time.',
  },
  {
    id: 'HOSP-B',
    name: 'Hospital B',
    type: 'Community Clinic',
    distanceKm: 2.1,
    travelTimeMin: 6,
    emergencyCapability: 'Limited',
    traumaBedsAvailable: 0,
    specialties: ['General Urgent Care'],
    isAppropriate: false,
    selectionReason: 'Not selected despite closer 2.1 km distance: Emergency capacity is limited and unable to handle high-severity impact cases.',
  },
  {
    id: 'HOSP-C',
    name: 'Hospital C',
    type: 'Metro General Hospital',
    distanceKm: 5.0,
    travelTimeMin: 10,
    emergencyCapability: 'Available',
    traumaBedsAvailable: 2,
    specialties: ['General Emergency Ward'],
    isAppropriate: false,
    selectionReason: 'Backup facility: Emergency capacity available but travel time (10 min) is longer than Hospital A (8 min).',
  },
];

export const INITIAL_RESPONDERS: ResponderUnit[] = [
  {
    id: 'AMB-04',
    unitName: 'Medic-Unit 04 (Advanced Life Support)',
    type: 'AMBULANCE',
    status: 'IDLE',
    currentEta: '04:32',
    assignedIncident: null,
    locationLabel: 'Sector 2 Fire & Rescue Depot (3.1 km away)',
  },
  {
    id: 'POL-12',
    unitName: 'Patrol-12 (Highway Traffic Division)',
    type: 'POLICE',
    status: 'IDLE',
    currentEta: '03:15',
    assignedIncident: null,
    locationLabel: 'Sector 3 Arterial Patrol Cruiser (1.8 km away)',
  },
];

export const SIMULATION_STAGES = [
  { step: 1, title: 'CRASH DETECTED', desc: 'Accelerometer triggers on severe 18.4G impact vector. Deceleration threshold exceeded.' },
  { step: 2, title: 'VERIFYING INCIDENT', desc: 'Cross-verifying crash pulse with airbag deployment signal & rapid velocity drop to 0 km/h.' },
  { step: 3, title: 'EMERGENCY SYSTEM ACTIVATED', desc: 'Automated response protocol activated. Driver display alerts occupants; priority uplink engaged.' },
  { step: 4, title: 'CAPTURING GPS + CRASH DATA', desc: 'Satellite coordinates locked (28.6139° N, 77.2090° E), impact angle and delta-V packaged.' },
  { step: 5, title: 'SAVING LAST 2 MINUTES OF DASHCAM', desc: 'Pre-crash & collision video buffer locked from ring cache to secure crash record.' },
  { step: 6, title: 'GENERATING SOS', desc: 'Digital emergency packet compiled (INC-2026-0915-001) with cryptographic hash.' },
  { step: 7, title: 'EMERGENCY PACKET SENT', desc: 'Instantaneous cellular transmission broadcast to public emergency dispatch gateway.' },
  { step: 8, title: 'AMBULANCE ALERTED', desc: 'Medic-Unit 04 dispatched automatically with incident telemetry and coordinates.' },
  { step: 9, title: 'POLICE ALERTED', desc: 'Patrol-12 notified for high-priority traffic clearance and accident perimeter safety.' },
  { step: 10, title: 'APPROPRIATE HOSPITAL IDENTIFIED', desc: 'Selection algorithm identifies Hospital A based on trauma capability, ICU availability & ETA.' },
  { step: 11, title: 'HOSPITAL ALERTED', desc: 'Apex Trauma Center receives pre-arrival crash telemetry & dashcam preview.' },
  { step: 12, title: 'MEDICAL TEAM PREPARED', desc: 'Emergency trauma team standing by; Trauma Bay 2 reserved prior to ambulance arrival.' },
  { step: 13, title: 'AMBULANCE ARRIVING & CARE', desc: 'Paramedics on scene; seamless triage transition initiated.' },
];
