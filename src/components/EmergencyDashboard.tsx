import React from 'react';
import {
  ShieldAlert,
  Radio,
  Clock,
  MapPin,
  Ambulance,
  Shield,
  Hospital,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Car,
  FileText,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { MapSimulation } from './MapSimulation';
import { HospitalFacility, ResponderUnit, VehicleTelemetry, EmergencyPacket } from '../types';

interface EmergencyDashboardProps {
  vehicle: VehicleTelemetry;
  stage: number;
  emergencyPacket: EmergencyPacket;
  hospitals: HospitalFacility[];
  responders: ResponderUnit[];
  ambulanceProgress: number;
  onViewIncidentDetails: () => void;
  onViewHospitalResponse: () => void;
}

export const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({
  vehicle,
  stage,
  emergencyPacket,
  hospitals,
  responders,
  ambulanceProgress,
  onViewIncidentDetails,
  onViewHospitalResponse,
}) => {
  const isCrashed = vehicle.status !== 'CONNECTED';
  const ambulance = responders.find((r) => r.type === 'AMBULANCE');
  const police = responders.find((r) => r.type === 'POLICE');
  const selectedHospital = hospitals.find((h) => h.isAppropriate) || hospitals[0];

  // Timeline events generated during simulation
  const timelineEvents = [
    { time: '21:54:01', text: 'Crash detected', detail: 'Impact sensors triggered (18.4G deceleration)', minStage: 1 },
    { time: '21:54:02', text: 'Incident verified', detail: 'Cross-checked with airbag deployment & velocity drop', minStage: 2 },
    { time: '21:54:03', text: 'GPS captured', detail: 'Coordinates locked (28.6139° N, 77.2090° E)', minStage: 4 },
    { time: '21:54:03', text: 'Dashcam footage secured', detail: 'Last 2 minutes rolling buffer saved', minStage: 5 },
    { time: '21:54:04', text: 'SOS generated', detail: 'Emergency information packet compiled', minStage: 6 },
    { time: '21:54:05', text: 'Ambulance alerted', detail: 'Medic-Unit 04 dispatched automatically', minStage: 8 },
    { time: '21:54:05', text: 'Police alerted', detail: 'Patrol-12 notified for traffic clearance & perimeter', minStage: 9 },
    { time: '21:54:06', text: 'Hospital notified', detail: 'Hospital A selected based on capacity & travel time', minStage: 11 },
    { time: '21:54:07', text: 'Medical team preparing', detail: 'Trauma Bay 2 reserved; surgical team alerted', minStage: 12 },
  ];

  return (
    <div className="space-y-6">
      
      {/* SECTION 2 & 14: ONE ACTIVE INCIDENT HERO BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        {/* Top Identification Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800">
                  ACTIVE EMERGENCY
                </span>
                <span className="text-sm font-black text-white font-mono">
                  {emergencyPacket.incidentId}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated Incident Command • Connected City Dispatch
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2.5">
            <button
              id="dashboard-btn-packet"
              onClick={onViewIncidentDetails}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Emergency Packet</span>
            </button>
            <button
              id="dashboard-btn-hospital"
              onClick={onViewHospitalResponse}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Hospital className="w-3.5 h-3.5" />
              <span>Hospital View</span>
            </button>
          </div>
        </div>

        {/* Severity & Location Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              CRASH SEVERITY
            </span>
            <div className="text-xl font-black text-rose-400 mt-1">
              {isCrashed ? 'HIGH' : 'NOMINAL'}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {isCrashed ? '18.4 G Impact • Airbag Deployed' : 'No collision detected'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              LOCATION
            </span>
            <div className="text-sm font-mono font-bold text-sky-400 mt-1 truncate">
              {vehicle.gps.formatted}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
              {vehicle.gps.street}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              RESPONSE TIMELINE
            </span>
            <div className="text-sm font-bold text-white mt-1">
              {isCrashed ? '00:06 to Multi-Agency Alert' : 'Standby'}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Simultaneous dispatch to EMS, Police & Hospital
            </span>
          </div>
        </div>

        {/* SECTION 14: FIVE CORE DASHBOARD METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
          {/* Active Incidents */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ACTIVE INCIDENTS
            </div>
            <div className={`text-2xl font-black font-mono mt-1 ${isCrashed ? 'text-rose-400' : 'text-slate-500'}`}>
              {isCrashed ? '1' : '0'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {isCrashed ? 'INC-001 Active' : 'All clear'}
            </div>
          </div>

          {/* Ambulance */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AMBULANCE
            </div>
            <div className={`text-sm font-black uppercase mt-2 ${stage >= 8 ? 'text-sky-400' : 'text-slate-500'}`}>
              {stage >= 13 ? 'ON SCENE' : stage >= 8 ? 'RESPONDING' : 'STANDBY'}
            </div>
            <div className="text-[10px] font-mono text-sky-400 mt-1">
              {stage >= 8 ? `ETA: ${ambulance?.currentEta}` : '--:--'}
            </div>
          </div>

          {/* Police */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              POLICE
            </div>
            <div className={`text-sm font-black uppercase mt-2 ${stage >= 9 ? 'text-blue-400' : 'text-slate-500'}`}>
              {stage >= 9 ? 'ALERTED' : 'STANDBY'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stage >= 9 ? 'Traffic Perimeter' : 'Routine patrol'}
            </div>
          </div>

          {/* Hospital */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              HOSPITAL
            </div>
            <div className={`text-sm font-black uppercase mt-2 ${stage >= 11 ? 'text-emerald-400' : 'text-slate-500'}`}>
              {stage >= 11 ? 'NOTIFIED' : 'STANDBY'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stage >= 11 ? 'Hospital A (8 min)' : 'Census nominal'}
            </div>
          </div>

          {/* Medical Team */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              MEDICAL TEAM
            </div>
            <div className={`text-sm font-black uppercase mt-2 ${stage >= 12 ? 'text-teal-300' : 'text-slate-500'}`}>
              {stage >= 12 ? 'PREPARING' : 'ON CALL'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {stage >= 12 ? 'Bay 2 Reserved' : 'Emergency ward ready'}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CONNECTED NETWORK DIAGRAM */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide uppercase">
              CONNECTED EMERGENCY RESPONSE NETWORK
            </h3>
            <p className="text-xs text-slate-400">
              Direct digital coordination architecture from vehicle impact sensors to field responders and trauma bays.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            COORDINATION LAYER
          </span>
        </div>

        {/* Clean Architectural Network Flow Diagram */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 mt-4 overflow-x-auto">
          <div className="min-w-[650px] flex items-center justify-between gap-3 py-2">
            
            {/* Node 1: Car */}
            <div className={`p-3.5 rounded-xl border text-center flex-1 max-w-[150px] transition-all ${
              isCrashed
                ? 'bg-rose-950/60 border-rose-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <div className="w-7 h-7 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-rose-400 mb-1.5">
                <Car className="w-4 h-4" />
              </div>
              <div className="font-black text-xs">CAR</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isCrashed ? 'Crash Detected' : 'Normal Drive'}
              </div>
            </div>

            {/* Vector arrow 1 */}
            <div className="flex items-center text-slate-500 text-xs font-mono font-bold shrink-0">
              <span className={isCrashed ? 'text-rose-400' : 'text-slate-600'}>──────►</span>
            </div>

            {/* Node 2: Emergency Packet */}
            <div className={`p-3.5 rounded-xl border text-center flex-1 max-w-[170px] transition-all ${
              isCrashed && stage >= 6
                ? 'bg-indigo-950/60 border-indigo-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <div className="w-7 h-7 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-indigo-400 mb-1.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="font-black text-xs">EMERGENCY PACKET</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isCrashed && stage >= 6 ? 'Transmitted' : 'Standby'}
              </div>
            </div>

            {/* Vector arrow 2 */}
            <div className="flex items-center text-slate-500 text-xs font-mono font-bold shrink-0">
              <span className={isCrashed && stage >= 6 ? 'text-indigo-400' : 'text-slate-600'}>──────►</span>
            </div>

            {/* Node 3: Emergency Response Center */}
            <div className={`p-3.5 rounded-xl border text-center flex-1 max-w-[190px] transition-all ${
              isCrashed && stage >= 7
                ? 'bg-sky-950/60 border-sky-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <div className="w-7 h-7 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-sky-400 mb-1.5">
                <Radio className="w-4 h-4" />
              </div>
              <div className="font-black text-xs">RESPONSE CENTER</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isCrashed && stage >= 7 ? 'Coordinating Dispatch' : 'Standby'}
              </div>
            </div>

            {/* Vector branching out to 3 Responders */}
            <div className="flex flex-col justify-between h-36 py-1 text-slate-500 text-xs font-mono shrink-0">
              <div className="flex items-center gap-1">
                <span className={stage >= 8 ? 'text-sky-400 font-bold' : 'text-slate-600'}>─┐──►</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={stage >= 9 ? 'text-blue-400 font-bold' : 'text-slate-600'}>───►</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={stage >= 11 ? 'text-emerald-400 font-bold' : 'text-slate-600'}>─┘──►</span>
              </div>
            </div>

            {/* Destination Nodes: Ambulance, Police, Hospital */}
            <div className="flex flex-col justify-between gap-2 flex-1 max-w-[200px]">
              
              {/* Ambulance Node */}
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                stage >= 8
                  ? 'bg-sky-950/70 border-sky-500/80 text-sky-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <Ambulance className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="font-bold">AMBULANCE</span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  {stage >= 8 ? 'DISPATCHED' : 'IDLE'}
                </span>
              </div>

              {/* Police Node */}
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                stage >= 9
                  ? 'bg-blue-950/70 border-blue-500/80 text-blue-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="font-bold">POLICE</span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  {stage >= 9 ? 'ALERTED' : 'IDLE'}
                </span>
              </div>

              {/* Hospital Node */}
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                stage >= 11
                  ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <Hospital className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold">HOSPITAL</span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  {stage >= 11 ? 'NOTIFIED' : 'IDLE'}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Main Grid: Vector Map & Live Event Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Live Incident Map & Field Responder Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Live CAD Map & Dispatched Units</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Ambulance ETA: <span className="text-sky-400 font-bold">{stage >= 8 ? ambulance?.currentEta : '--:--'}</span>
            </span>
          </div>

          {/* Clean CAD Vector Map */}
          <MapSimulation
            vehicle={vehicle}
            stage={stage}
            hospitals={hospitals}
            responders={responders}
            ambulanceProgress={ambulanceProgress}
          />

          {/* Responder Dispatch Cards (Sections 7 & 8) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* SECTION 7: AMBULANCE RESPONSE */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
                  <Ambulance className="w-4 h-4" />
                  <span>AMBULANCE RESPONSE</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  stage >= 8
                    ? 'bg-sky-950 text-sky-300 border border-sky-700'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {stage >= 13 ? 'ON SCENE' : stage >= 8 ? 'DISPATCHED' : 'STANDBY'}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Unit:</span>
                  <span className="font-bold text-white">Medic-Unit 04 (ALS)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-sky-400 font-mono">
                    {stage >= 13 ? 'ON SCENE' : stage >= 8 ? 'EN ROUTE' : 'AT STATION'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ETA:</span>
                  <span className="font-bold text-sky-400 font-mono">
                    {stage >= 8 ? ambulance?.currentEta : '04:32'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-slate-300 font-mono truncate">Crash Location</span>
                </div>
              </div>
            </div>

            {/* SECTION 8: POLICE RESPONSE */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-blue-400">
                  <Shield className="w-4 h-4" />
                  <span>POLICE RESPONSE</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  stage >= 9
                    ? 'bg-blue-950 text-blue-300 border border-blue-700'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {stage >= 9 ? 'ALERTED' : 'STANDBY'}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Unit:</span>
                  <span className="font-bold text-white">Patrol-12 (Highway Div)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Priority:</span>
                  <span className="font-bold text-rose-400 font-mono">
                    {stage >= 9 ? 'HIGH' : 'STANDBY'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-blue-400 font-mono">
                    {stage >= 9 ? 'RESPONDING' : 'ROUTINE PATROL'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-300 font-mono truncate">Crash Location</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Event Timeline */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <h3 className="font-bold text-white text-sm">LIVE EVENT TIMELINE</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {isCrashed ? 'REAL-TIME LOG' : 'IDLE'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Autonomous coordination log executed without human intermediary latency:
            </p>

            <div className="space-y-2.5 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-800" />

              {timelineEvents.map((ev, idx) => {
                const isPassed = isCrashed && stage >= ev.minStage;
                const isCurrent = isCrashed && stage === ev.minStage;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 relative transition-all ${
                      isPassed ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 z-10 text-[9px] font-bold ${
                        isCurrent
                          ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                          : isPassed
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-900 border-slate-700 text-slate-600'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className={`flex-1 p-2 rounded-lg border text-xs ${
                      isCurrent
                        ? 'bg-rose-950/70 border-rose-500/70 text-rose-100'
                        : isPassed
                        ? 'bg-slate-950/90 border-slate-800 text-slate-300'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{ev.text}</span>
                        <span className="font-mono text-[10px] text-slate-400">{ev.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{ev.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hospital Readiness Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                <Hospital className="w-3.5 h-3.5" />
                <span>HOSPITAL RECEPTION READY</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                stage >= 11 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-500'
              }`}>
                {stage >= 11 ? 'NOTIFIED (8 MIN ETA)' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Hospital A (Apex Trauma Center) reserved Trauma Bay 2 with surgical staff preparing in advance of ambulance arrival.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
