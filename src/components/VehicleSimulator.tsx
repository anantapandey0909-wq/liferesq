import React, { useState, useEffect } from 'react';
import {
  Car,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Video,
  Navigation,
  Gauge,
  Wifi,
  Radio,
  Check,
  Zap,
} from 'lucide-react';
import { VehicleTelemetry, EmergencyPacket } from '../types';

interface VehicleSimulatorProps {
  vehicle: VehicleTelemetry;
  stage: number;
  emergencyPacket: EmergencyPacket;
  onSimulateCrash: () => void;
  onSimulateNormal: () => void;
  onReset: () => void;
  onViewIncident: () => void;
  isSimulating: boolean;
}

export const VehicleSimulator: React.FC<VehicleSimulatorProps> = ({
  vehicle,
  stage,
  emergencyPacket,
  onSimulateCrash,
  onSimulateNormal,
  onReset,
  onViewIncident,
  isSimulating,
}) => {
  const isCrashed = vehicle.status !== 'CONNECTED';
  const [roadOffset, setRoadOffset] = useState(0);

  // Smooth road animation when vehicle is driving normally
  useEffect(() => {
    if (vehicle.speed > 0) {
      const interval = setInterval(() => {
        setRoadOffset((prev) => (prev + 10) % 50);
      }, 40);
      return () => clearInterval(interval);
    }
  }, [vehicle.speed]);

  const stagesList = [
    { num: 1, title: 'CRASH DETECTED', desc: '18.4G impact detected on front crash sensors' },
    { num: 2, title: 'VERIFYING INCIDENT', desc: 'Cross-checked with airbag deployment & speed drop' },
    { num: 3, title: 'EMERGENCY SYSTEM ACTIVATED', desc: 'Automated response protocol initiates' },
    { num: 4, title: 'CAPTURING GPS + CRASH DATA', desc: 'Location locked (28.6139° N, 77.2090° E)' },
    { num: 5, title: 'SAVING LAST 2 MINUTES OF DASHCAM', desc: 'Rolling 120s buffer extracted and saved' },
    { num: 6, title: 'GENERATING SOS', desc: 'Emergency information packet compiled' },
    { num: 7, title: 'EMERGENCY PACKET SENT', desc: 'Transmitted to emergency response network' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header & Primary Simulation Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                Connected Vehicle Telematics
              </span>
              <span className="text-xs text-slate-400 font-mono">VEHICLE ID: {vehicle.vehicleId}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
              VEHICLE SIMULATOR
            </h2>
            <p className="text-sm text-slate-300 mt-0.5 max-w-2xl">
              Simulates existing vehicle sensors, GPS, dashcam, and connectivity. When a crash occurs, the vehicle detects it and starts the emergency response automatically.
            </p>
          </div>

          {/* Primary Demo Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="btn-simulate-normal"
              onClick={onSimulateNormal}
              disabled={isSimulating}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 border ${
                !isCrashed
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Car className="w-4 h-4 text-emerald-400" />
              <span>NORMAL DRIVE</span>
            </button>

            <button
              id="btn-simulate-crash-hero"
              onClick={onSimulateCrash}
              disabled={isSimulating}
              className={`px-5 py-2.5 rounded-lg text-xs font-black transition flex items-center gap-2 shadow-lg ${
                isSimulating
                  ? 'bg-amber-600 text-white animate-pulse'
                  : isCrashed
                  ? 'bg-rose-950 border-2 border-rose-600 text-rose-200'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50 hover:scale-[1.02]'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isSimulating ? 'EXECUTING RESPONSE...' : 'SIMULATE CRASH'}</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner: Core Concept */}
        <div className="mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-rose-400 uppercase tracking-wide">Key Innovation:</span>
            <span>No physical black box needed. Uses existing vehicle sensors to trigger immediate emergency coordination.</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            STATUS: <strong className={isCrashed ? 'text-rose-400' : 'text-emerald-400'}>{vehicle.status}</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Telemetry & Dashcam */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Telemetry & Realistic Dashcam */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Telemetry Status Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Speed */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">SPEED</span>
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-2xl font-black font-mono mt-1 text-white">
                {vehicle.speed} <span className="text-xs text-slate-400 font-normal">km/h</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isCrashed ? 'Vehicle Stopped' : 'Cruising Speed'}
              </div>
            </div>

            {/* Airbag */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              vehicle.airbagStatus === 'DEPLOYED'
                ? 'bg-rose-950/40 border-rose-600/70 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">AIRBAG STATUS</span>
                <ShieldCheck className={`w-3.5 h-3.5 ${vehicle.airbagStatus === 'DEPLOYED' ? 'text-rose-400' : 'text-emerald-400'}`} />
              </div>
              <div className={`text-xl font-black mt-1 ${vehicle.airbagStatus === 'DEPLOYED' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {vehicle.airbagStatus}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {vehicle.airbagStatus === 'DEPLOYED' ? 'Impact Triggered' : 'Normal / Armed'}
              </div>
            </div>

            {/* GPS */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">GPS TELEMETRY</span>
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="text-xs font-mono font-bold text-sky-400 mt-1 truncate">
                {vehicle.gps.formatted}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                {vehicle.gps.street}
              </div>
            </div>

            {/* Emergency System */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              isCrashed
                ? 'bg-rose-950/40 border-rose-600/70 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">EMERGENCY SYSTEM</span>
                <Radio className={`w-3.5 h-3.5 ${isCrashed ? 'text-rose-400' : 'text-slate-400'}`} />
              </div>
              <div className={`text-sm font-black mt-1 uppercase ${isCrashed ? 'text-rose-400' : 'text-slate-300'}`}>
                {vehicle.emergencySystem}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isCrashed ? 'Coordination Active' : 'Standby Mode'}
              </div>
            </div>
          </div>

          {/* Realistic Dashcam Viewport */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
            {/* Dashcam Header Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isCrashed ? 'bg-amber-400' : 'bg-rose-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isCrashed ? 'bg-amber-500' : 'bg-rose-600'}`}></span>
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  {isCrashed ? 'INCIDENT LOCKED' : 'LIVE DASHCAM'}
                </span>
                <span className="text-slate-500">•</span>
                <span className={`text-[11px] font-bold uppercase ${isCrashed ? 'text-amber-400' : 'text-rose-400'}`}>
                  {isCrashed ? 'LAST 2 MINUTES SAVED' : '● REC'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>1080p</span>
                <span>GPS: 28.6139°N</span>
                <span className="text-white font-bold">{vehicle.speed} km/h</span>
              </div>
            </div>

            {/* Realistic Simulated Road Scene */}
            <div className="relative bg-slate-950 h-64 flex items-center justify-center overflow-hidden select-none">
              <svg viewBox="0 0 700 280" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  {/* Sky gradient */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a0f1d" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  {/* Road asphalt gradient */}
                  <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e2530" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  {/* Horizon mist */}
                  <linearGradient id="horizonGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Sky */}
                <rect width="700" height="110" fill="url(#skyGrad)" />
                <rect y="80" width="700" height="30" fill="url(#horizonGlow)" />

                {/* Distant skyline buildings & trees */}
                <path
                  d="M 50 110 L 50 85 L 85 85 L 85 110 M 120 110 L 120 70 L 155 70 L 155 110 M 200 110 L 200 80 L 235 80 L 235 110 M 460 110 L 460 75 L 500 75 L 500 110 M 535 110 L 535 65 L 575 65 L 575 110 M 610 110 L 610 82 L 650 82 L 650 110"
                  stroke="#1e293b"
                  strokeWidth="2"
                  fill="#0b1120"
                />

                {/* Roadside verge / shoulders */}
                <polygon points="0,110 320,110 0,280" fill="#0d1522" />
                <polygon points="700,110 380,110 700,280" fill="#0d1522" />

                {/* Main asphalt roadway */}
                <polygon points="320,110 380,110 680,280 20,280" fill="url(#roadGrad)" />

                {/* Outer solid lane lines */}
                <line x1="320" y1="110" x2="20" y2="280" stroke="#94a3b8" strokeWidth="3" opacity="0.6" />
                <line x1="380" y1="110" x2="680" y2="280" stroke="#94a3b8" strokeWidth="3" opacity="0.6" />

                {/* Center road divider lines (animated during normal drive) */}
                <g stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="20 18" strokeDashoffset={-roadOffset}>
                  <line x1="350" y1="110" x2="350" y2="280" />
                </g>

                {/* Vehicle hood curve in bottom center (realistic dashcam perspective) */}
                <path d="M 220 280 Q 350 255 480 280 Z" fill="#020617" stroke="#1e293b" strokeWidth="2" />

                {/* Crash Impact Overlay if Crashed */}
                {isCrashed && (
                  <>
                    <rect width="700" height="280" fill="#dc2626" opacity="0.16" />
                    {/* Impact Vector graphic */}
                    <circle cx="270" cy="190" r="34" fill="#ef4444" opacity="0.35" />
                    <line x1="210" y1="140" x2="270" y2="190" stroke="#fca5a5" strokeWidth="4" />
                    <text x="270" y="240" fill="#fee2e2" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      IMPACT FORCE: 18.4 G (FRONT-LEFT)
                    </text>
                  </>
                )}
              </svg>

              {/* Realistic Dashcam OSD Watermarks */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono text-emerald-400 border border-slate-800">
                <span>{isCrashed ? 'CLIP LOCKED: 21:54:01' : 'LIVE: 21:54:01 UTC'}</span>
                <span className="text-slate-500 mx-1.5">•</span>
                <span>GPS: 28.6139° N, 77.2090° E</span>
              </div>

              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono text-slate-300 border border-slate-800">
                <span>1080p / 60fps</span>
                <span className="text-slate-500 mx-1.5">•</span>
                <span>SPEED: <strong className="text-white">{vehicle.speed} km/h</strong></span>
              </div>

              {/* Dashcam Educational Message Banner */}
              <div className="absolute bottom-3 inset-x-3 bg-slate-950/90 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Lock className={`w-3.5 h-3.5 ${isCrashed ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="font-semibold">Continuous Rolling Buffer:</span>
                  <span className="text-slate-400">
                    The system continuously records a rolling buffer and locks the previous two minutes when a crash occurs.
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-400 shrink-0">
                  {isCrashed ? 'BUFFER SAVED (120s)' : 'CIRCULAR LOOP ACTIVE'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Four Clearly Separated Captured Signals */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                  AUTOMATIC DATA CAPTURE
                </h3>
                <p className="text-xs text-slate-400">
                  Four primary signals captured automatically by existing vehicle systems upon impact detection.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-950 border border-emerald-500 text-emerald-300 tracking-wider">
                NO DRIVER ACTION REQUIRED
              </span>
            </div>

            {/* 4 Captured Signal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              
              {/* 1. GPS Location */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                isCrashed && stage >= 4
                  ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-white">GPS LOCATION</span>
                  {isCrashed && stage >= 4 ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">✓</span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">--</span>
                  )}
                </div>
                <div className="text-xs font-mono mt-2 font-semibold">
                  {isCrashed && stage >= 4 ? '28.6139° N, 77.2090° E' : 'Tracking in memory'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Accurate coordinate snapshot
                </div>
              </div>

              {/* 2. Last 2 Minutes Dashcam */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                isCrashed && stage >= 5
                  ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-white">LAST 2 MIN DASHCAM</span>
                  {isCrashed && stage >= 5 ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">✓</span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">--</span>
                  )}
                </div>
                <div className="text-xs font-mono mt-2 font-semibold">
                  {isCrashed && stage >= 5 ? '120s Clip Secured' : 'Rolling loop buffer'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Pre-impact & crash video
                </div>
              </div>

              {/* 3. Crash Data */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                isCrashed && stage >= 1
                  ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-white">CRASH DATA</span>
                  {isCrashed && stage >= 1 ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">✓</span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">--</span>
                  )}
                </div>
                <div className="text-xs font-mono mt-2 font-semibold">
                  {isCrashed && stage >= 1 ? '18.4 G • Airbag Fired' : 'Impact sensors armed'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Deceleration vector logged
                </div>
              </div>

              {/* 4. SOS */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                isCrashed && stage >= 6
                  ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-100'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-white">SOS STATUS</span>
                  {isCrashed && stage >= 6 ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">✓</span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">--</span>
                  )}
                </div>
                <div className="text-xs font-mono mt-2 font-semibold">
                  {isCrashed && stage >= 6 ? 'SENT (INC-001)' : 'Standby'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Automated digital transmission
                </div>
              </div>

            </div>

            <div className="mt-3 text-center text-xs font-medium text-slate-400">
              The driver does not need to dial emergency services, explain directions, or press an SOS button.
            </div>
          </div>
        </div>

        {/* Right Column: 7-Step Sequence & Emergency Information Packet */}
        <div className="space-y-4">
          
          {/* Live Incident Status Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm">ONBOARD SEQUENCE</h3>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isCrashed ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
              }`}>
                {isCrashed ? `PHASE ${Math.min(stage, 7)} OF 7` : 'SYSTEM STANDBY'}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Autonomous sequence executed immediately upon crash detection:
            </p>

            <div className="space-y-2">
              {stagesList.map((st) => {
                const isPassed = stage >= st.num;
                const isCurrent = stage === st.num;

                return (
                  <div
                    key={st.num}
                    className={`p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-rose-950/80 border-rose-500 text-white shadow-md ring-1 ring-rose-500/50'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-700/60 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isPassed
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPassed ? '✓' : st.num}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xs text-white flex items-center justify-between">
                        <span>{st.title}</span>
                        {isPassed && <span className="text-[10px] text-emerald-400 font-mono">COMPLETE</span>}
                        {isCurrent && <span className="text-[10px] text-rose-400 font-mono animate-pulse">ACTIVE</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{st.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clean Emergency Packet Card (Section 5) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                EMERGENCY INFORMATION PACKET
              </h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                isCrashed && stage >= 6
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {isCrashed && stage >= 6 ? 'STATUS: TRANSMITTED' : 'STATUS: PENDING'}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Incident ID:</span>
                <span className="font-bold text-white">{emergencyPacket.incidentId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Timestamp:</span>
                <span className="text-slate-300">{emergencyPacket.timestamp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">GPS Location:</span>
                <span className="text-sky-400 font-semibold">{vehicle.gps.formatted}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Crash Severity:</span>
                <span className="text-rose-400 font-bold">{isCrashed ? emergencyPacket.crashSeverity : 'NONE'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Impact Info:</span>
                <span className="text-slate-300">{isCrashed ? emergencyPacket.estimatedImpact : '0.1 G Nominal'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Airbag Status:</span>
                <span className={vehicle.airbagStatus === 'DEPLOYED' ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                  {vehicle.airbagStatus}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400 font-sans">Dashcam Footage:</span>
                <span className="text-amber-300 font-semibold">
                  {isCrashed ? emergencyPacket.dashcamStatus : 'Recording'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-sans">SOS Status:</span>
                <span className="text-emerald-400 font-bold">
                  {isCrashed && stage >= 6 ? 'SENT' : 'STANDBY'}
                </span>
              </div>
            </div>

            {/* Responders Checklist */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Responders Connected:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-2 rounded border font-semibold ${
                  stage >= 8
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}>
                  AMBULANCE {stage >= 8 ? '✓' : ''}
                </div>
                <div className={`p-2 rounded border font-semibold ${
                  stage >= 9
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}>
                  POLICE {stage >= 9 ? '✓' : ''}
                </div>
                <div className={`p-2 rounded border font-semibold ${
                  stage >= 11
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}>
                  HOSPITAL {stage >= 11 ? '✓' : ''}
                </div>
              </div>
            </div>

            {isCrashed && (
              <button
                onClick={onViewIncident}
                className="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <span>Inspect Full Incident Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
