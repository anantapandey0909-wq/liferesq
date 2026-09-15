import React from 'react';
import { ShieldAlert, Navigation, Hospital, Shield, Radio, MapPin } from 'lucide-react';
import { HospitalFacility, ResponderUnit, VehicleTelemetry } from '../types';

interface MapSimulationProps {
  vehicle: VehicleTelemetry;
  stage: number;
  hospitals: HospitalFacility[];
  responders: ResponderUnit[];
  ambulanceProgress: number; // 0 to 100
}

export const MapSimulation: React.FC<MapSimulationProps> = ({
  vehicle,
  stage,
  hospitals,
  responders,
  ambulanceProgress,
}) => {
  const isCrashed = vehicle.status !== 'CONNECTED';
  const selectedHospital = hospitals.find((h) => h.isAppropriate) || hospitals[0];
  const ambulance = responders.find((r) => r.type === 'AMBULANCE');
  const police = responders.find((r) => r.type === 'POLICE');

  // SVG dimensions: 800 x 500
  // Crash / Vehicle location: (480, 260)
  const crashPos = { x: 480, y: 260 };
  
  // Hospital locations:
  // Hospital A (Selected, Level-1): (680, 110)
  // Hospital B (Clinic, closer but limited): (340, 200)
  // Hospital C (Metro General): (210, 390)
  const hospPos: Record<string, { x: number; y: number }> = {
    'HOSP-A': { x: 680, y: 110 },
    'HOSP-B': { x: 340, y: 190 },
    'HOSP-C': { x: 210, y: 390 },
  };

  // Responder start positions:
  // Ambulance Depot: (160, 120)
  // Route to crash: (160, 120) -> (320, 120) -> (320, 260) -> (480, 260)
  const ambStart = { x: 160, y: 120 };
  
  // Calculate current ambulance position along 3 segments based on ambulanceProgress (0-100)
  const getAmbulancePos = (pct: number) => {
    if (pct <= 0) return ambStart;
    if (pct >= 100) return { x: crashPos.x - 30, y: crashPos.y };

    if (pct < 40) {
      const segPct = pct / 40;
      return {
        x: ambStart.x + (320 - ambStart.x) * segPct,
        y: ambStart.y,
      };
    } else if (pct < 75) {
      const segPct = (pct - 40) / 35;
      return {
        x: 320,
        y: ambStart.y + (crashPos.y - ambStart.y) * segPct,
      };
    } else {
      const segPct = (pct - 75) / 25;
      return {
        x: 320 + (crashPos.x - 30 - 320) * segPct,
        y: crashPos.y,
      };
    }
  };

  const currentAmbPos = getAmbulancePos(ambulanceProgress);

  // Police position (starts from 580, 420 -> heads toward crash 480, 260)
  const policeStart = { x: 610, y: 410 };
  const policePos = isCrashed && stage >= 7
    ? {
        x: policeStart.x + (crashPos.x + 25 - policeStart.x) * Math.min(1, (stage - 6) / 5),
        y: policeStart.y + (crashPos.y + 20 - policeStart.y) * Math.min(1, (stage - 6) / 5),
      }
    : policeStart;

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-100 shadow-inner">
      {/* Top Map HUD Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isCrashed ? 'bg-rose-400 opacity-75' : 'bg-emerald-400 opacity-75'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isCrashed ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="font-semibold text-white tracking-wide">METRO EMERGENCY RADAR & ROUTING</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="font-mono text-slate-300">SECTOR 4 GRID • 28.6139° N, 77.2090° E</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          <span className="text-slate-400">Map Mode:</span>
          <span className="font-mono font-semibold text-indigo-300">LIVE CAD TELEMETRY</span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 800 480"
        className="w-full h-auto block select-none bg-[#090d16]"
        style={{ minHeight: '380px' }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162032" strokeWidth="0.8" />
          </pattern>

          {/* Radar Sweep Gradient */}
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>

          {/* Hospital Pulse Gradient */}
          <radialGradient id="hospGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Grid */}
        <rect width="800" height="480" fill="url(#cityGrid)" />

        {/* River / Geographic Feature */}
        <path
          d="M -10 40 Q 200 80 400 30 T 820 50"
          fill="none"
          stroke="#0f2642"
          strokeWidth="38"
          strokeLinecap="round"
          opacity="0.5"
        />
        <text x="50" y="32" fill="#2d5885" fontSize="10" fontFamily="monospace" letterSpacing="2">
          NORTH CANAL CORRIDOR
        </text>

        {/* Major Road Networks (Gray / Blue lines) */}
        <g stroke="#1e293b" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Ring Road (Main East-West) */}
          <line x1="0" y1="260" x2="800" y2="260" />
          {/* Highway 9 (North-South) */}
          <line x1="320" y1="0" x2="320" y2="480" />
          {/* Metro Expressway Diagonal */}
          <line x1="160" y1="0" x2="160" y2="480" />
          <line x1="560" y1="0" x2="560" y2="480" />
          {/* Avenue 4 */}
          <line x1="0" y1="120" x2="800" y2="120" />
          {/* Boulevard South */}
          <line x1="0" y1="390" x2="800" y2="390" />
          {/* Diagonal access to Hospital A */}
          <line x1="560" y1="260" x2="680" y2="110" />
        </g>

        {/* Inner Road Lanes (Dark slate lane centers) */}
        <g stroke="#334155" strokeWidth="2" strokeDasharray="6 6">
          <line x1="0" y1="260" x2="800" y2="260" />
          <line x1="320" y1="0" x2="320" y2="480" />
          <line x1="160" y1="0" x2="160" y2="480" />
          <line x1="560" y1="0" x2="560" y2="480" />
          <line x1="0" y1="120" x2="800" y2="120" />
          <line x1="0" y1="390" x2="800" y2="390" />
        </g>

        {/* Street Name Labels */}
        <text x="30" y="252" fill="#64748b" fontSize="10" fontFamily="sans-serif" fontWeight="500">
          OUTER RING ROAD (ARTERIAL)
        </text>
        <text x="330" y="50" fill="#64748b" fontSize="9" fontFamily="sans-serif" transform="rotate(90 330 50)">
          HIGHWAY 9 EXPRESS
        </text>
        <text x="30" y="112" fill="#475569" fontSize="9" fontFamily="sans-serif">
          SECTOR 2 CONNECTOR
        </text>
        <text x="30" y="382" fill="#475569" fontSize="9" fontFamily="sans-serif">
          SOUTH BOULEVARD
        </text>

        {/* Distance Range Circles around Crash */}
        {isCrashed && (
          <g>
            <circle cx={crashPos.x} cy={crashPos.y} r="80" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <circle cx={crashPos.x} cy={crashPos.y} r="160" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
            <circle cx={crashPos.x} cy={crashPos.y} r="240" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.08" />
            
            <circle cx={crashPos.x} cy={crashPos.y} r="130" fill="url(#radarGlow)">
              <animate attributeName="r" values="30;140;30" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Ambulance Route Highlight (When Dispatched) */}
        {isCrashed && stage >= 6 && (
          <g>
            <path
              d={`M ${ambStart.x} ${ambStart.y} L 320 120 L 320 260 L ${crashPos.x} 260`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d={`M ${ambStart.x} ${ambStart.y} L 320 120 L 320 260 L ${crashPos.x} 260`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
            >
              <animate attributeName="stroke-dashoffset" values="32;0" dur="1.2s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/* Selected Hospital Route from Crash to Hospital A */}
        {isCrashed && stage >= 8 && (
          <g>
            <path
              d={`M ${crashPos.x} 260 L 560 260 L ${hospPos['HOSP-A'].x} ${hospPos['HOSP-A'].y}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray="5 5"
              opacity="0.85"
            >
              <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/* --- FACILITIES --- */}

        {/* Hospital B: Closer but Limited */}
        <g transform={`translate(${hospPos['HOSP-B'].x}, ${hospPos['HOSP-B'].y})`}>
          <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="0" y="5" fill="#94a3b8" fontSize="16" textAnchor="middle" fontWeight="bold">H</text>
          <text x="0" y="28" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="600">Hospital B</text>
          <text x="0" y="38" fill="#ef4444" fontSize="8" textAnchor="middle">Limited (No ICU)</text>
        </g>

        {/* Hospital C: General */}
        <g transform={`translate(${hospPos['HOSP-C'].x}, ${hospPos['HOSP-C'].y})`}>
          <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="0" y="5" fill="#94a3b8" fontSize="16" textAnchor="middle" fontWeight="bold">H</text>
          <text x="0" y="28" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="600">Hospital C</text>
          <text x="0" y="38" fill="#64748b" fontSize="8" textAnchor="middle">5.0 km • 10m ETA</text>
        </g>

        {/* Hospital A: Selected Level-1 Trauma Center */}
        <g transform={`translate(${hospPos['HOSP-A'].x}, ${hospPos['HOSP-A'].y})`}>
          {stage >= 8 && (
            <circle cx="0" cy="0" r="32" fill="url(#hospGlow)">
              <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <rect
            x="-22"
            y="-22"
            width="44"
            height="44"
            rx="10"
            fill={stage >= 8 ? '#064e3b' : '#1e293b'}
            stroke={stage >= 8 ? '#10b981' : '#64748b'}
            strokeWidth={stage >= 8 ? '2.5' : '1.5'}
          />
          <text x="0" y="6" fill={stage >= 8 ? '#6ee7b7' : '#94a3b8'} fontSize="18" textAnchor="middle" fontWeight="bold">
            H
          </text>
          
          <g transform="translate(0, 32)">
            <rect x="-65" y="-3" width="130" height="28" rx="5" fill="#022c22" stroke="#059669" strokeWidth="1" />
            <text x="0" y="9" fill="#a7f3d0" fontSize="9.5" textAnchor="middle" fontWeight="bold">
              Hospital A (Apex Trauma)
            </text>
            <text x="0" y="20" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="semibold">
              {stage >= 8 ? '★ SELECTED FACILITY' : 'Level-1 Trauma • 4.2 km'}
            </text>
          </g>
        </g>

        {/* --- DISPATCH ORIGINS & UNITS --- */}

        {/* Sector 2 EMS Station */}
        <g transform={`translate(${ambStart.x}, ${ambStart.y})`}>
          <circle cx="0" cy="0" r="10" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1.5" />
          <text x="0" y="-14" fill="#38bdf8" fontSize="8.5" textAnchor="middle" fontWeight="600">
            Sector 2 EMS Station
          </text>
        </g>

        {/* Moving Ambulance (Medic-04) */}
        <g transform={`translate(${currentAmbPos.x}, ${currentAmbPos.y})`}>
          {isCrashed && stage >= 6 && (
            <circle cx="0" cy="0" r="18" fill="#38bdf8" opacity="0.3">
              <animate attributeName="r" values="10;22;10" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
          <rect
            x="-16"
            y="-12"
            width="32"
            height="24"
            rx="5"
            fill="#0369a1"
            stroke="#e0f2fe"
            strokeWidth="2"
          />
          {/* Siren light */}
          <circle cx="0" cy="-12" r="3" fill="#ef4444">
            <animate attributeName="fill" values="#ef4444;#38bdf8;#ef4444" dur="0.4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="4" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">
            EMS
          </text>
          <text x="0" y="24" fill="#bae6fd" fontSize="8.5" textAnchor="middle" fontWeight="bold">
            Medic-04
          </text>
        </g>

        {/* Police Patrol (Patrol-12) */}
        <g transform={`translate(${policePos.x}, ${policePos.y})`}>
          <rect
            x="-14"
            y="-10"
            width="28"
            height="20"
            rx="4"
            fill="#1e3a8a"
            stroke="#93c5fd"
            strokeWidth="1.5"
          />
          {/* Police Flasher */}
          <circle cx="-3" cy="-10" r="2.5" fill="#3b82f6">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="3" cy="-10" r="2.5" fill="#ef4444">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="0.3s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="3" fill="#ffffff" fontSize="7.5" textAnchor="middle" fontWeight="bold">
            POL
          </text>
          <text x="0" y="20" fill="#bfdbfe" fontSize="8" textAnchor="middle" fontWeight="bold">
            Patrol-12
          </text>
        </g>

        {/* --- CRASH / VEHICLE LOCATION --- */}
        <g transform={`translate(${crashPos.x}, ${crashPos.y})`}>
          {isCrashed ? (
            <>
              {/* Emergency Beacon Shockwave */}
              <circle cx="0" cy="0" r="28" fill="#ef4444" opacity="0.3">
                <animate attributeName="r" values="16;38;16" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite" />
              </circle>
              {/* Collision Marker */}
              <circle cx="0" cy="0" r="16" fill="#7f1d1d" stroke="#f87171" strokeWidth="2.5" />
              <path d="M -6 -6 L 6 6 M 6 -6 L -6 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

              {/* Callout Box */}
              <g transform="translate(0, -32)">
                <rect x="-80" y="-22" width="160" height="36" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="0" y="-8" fill="#fecaca" fontSize="9.5" textAnchor="middle" fontWeight="bold">
                  CRASH DETECTED (HIGH SEVERITY)
                </text>
                <text x="0" y="6" fill="#fca5a5" fontSize="8" textAnchor="middle" fontFamily="monospace">
                  VH-8842-EV • 18.4G IMPACT
                </text>
              </g>
            </>
          ) : (
            <>
              {/* Normal Vehicle Marker */}
              <circle cx="0" cy="0" r="12" fill="#047857" stroke="#34d399" strokeWidth="2" />
              <polygon points="0,-7 5,5 0,3 -5,5" fill="#ffffff" />
              <g transform="translate(0, -22)">
                <rect x="-55" y="-16" width="110" height="22" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x="0" y="-2" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                  VH-8842-EV (62 km/h)
                </text>
              </g>
            </>
          )}
        </g>
      </svg>

      {/* Bottom Map Legend */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${isCrashed ? 'bg-rose-500 ring-2 ring-rose-300' : 'bg-emerald-500'}`} />
            <span>{isCrashed ? 'Crash Incident (Sector 4)' : 'Vehicle Moving (Normal Drive)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-500 ring-1 ring-sky-300" />
            <span>Ambulance (Medic-04)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-700 ring-1 ring-blue-400" />
            <span>Police Cruiser (Patrol-12)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-700 ring-1 ring-emerald-400" />
            <span>Appropriate Level-1 Hospital</span>
          </div>
        </div>

        <div className="font-mono text-slate-400 text-[11px]">
          Simulated CAD Coordinates • Grid Resolution 0.0001°
        </div>
      </div>
    </div>
  );
};
