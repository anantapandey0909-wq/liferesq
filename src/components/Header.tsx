import React from 'react';
import {
  Car,
  AlertTriangle,
  RefreshCw,
  Radio,
  Hospital,
  FileText,
  GitCompare,
  Shield,
  Activity,
  Zap,
  FastForward,
  StepForward,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { VehicleTelemetry } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  vehicle: VehicleTelemetry;
  stage: number;
  isSimulating: boolean;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  onSimulateCrash: () => void;
  onSimulateNormal: () => void;
  onReset: () => void;
  onStepForward: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  vehicle,
  stage,
  isSimulating,
  simSpeed,
  setSimSpeed,
  onSimulateCrash,
  onSimulateNormal,
  onReset,
  onStepForward,
}) => {
  const isCrashed = vehicle.status !== 'CONNECTED';

  const tabs = [
    { id: 'vehicle', label: 'Vehicle Simulator', icon: Car },
    { id: 'dashboard', label: 'Incident Command', icon: Radio, badge: isCrashed ? 'Active' : undefined },
    { id: 'hospital', label: 'Hospital Response', icon: Hospital, badge: stage >= 11 ? 'Alerted' : undefined },
    { id: 'incident', label: 'Emergency Packet', icon: FileText },
    { id: 'comparison', label: 'Before / After', icon: GitCompare },
    { id: 'privacy', label: 'Privacy & Architecture', icon: Shield },
  ];

  // 10 Sequential Steps for the Prominent Live Incident Status Area
  const liveSequenceSteps = [
    { num: 1, label: 'CRASH DETECTED' },
    { num: 3, label: 'RESPONSE ACTIVATED' },
    { num: 4, label: 'GPS LOCKED' },
    { num: 5, label: 'DASHCAM SECURED' },
    { num: 7, label: 'PACKET SENT' },
    { num: 8, label: 'AMBULANCE DISPATCHED' },
    { num: 9, label: 'POLICE ALERTED' },
    { num: 11, label: 'HOSPITAL NOTIFIED' },
    { num: 12, label: 'TEAM PREPARING' },
    { num: 13, label: 'CARE READY' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-50 backdrop-blur-md">
      {/* Top Competition Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-200">
              FUTURE CITY INNOVATION COMPETITION
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono text-[11px]">AUTONOMOUS CIVIC INFRASTRUCTURE</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              DEMO MODE • SYNTHETIC DATA
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 border border-slate-700">
              NO REAL EMERGENCY SERVICES CONNECTED
            </span>
          </div>
        </div>
      </div>

      {/* Main Project Header */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Project Title, Tagline & Subtitle */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-900/30 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                  REAL-TIME VEHICLE EMERGENCY RESPONSE SYSTEM
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-black tracking-widest text-rose-400 uppercase">
                    A SYSTEM THAT RESPONDS.
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-medium">
                    From crash detection to emergency care — in seconds.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: PRIMARY DEMO ACTION (HERO SIMULATE CRASH BUTTON) */}
          <div className="flex items-center gap-2 flex-wrap bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            {/* Normal Drive */}
            <button
              id="header-btn-normal"
              onClick={onSimulateNormal}
              disabled={isSimulating}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                !isCrashed
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-emerald-400" />
              <span>Normal Drive</span>
            </button>

            {/* HERO CRASH BUTTON */}
            <button
              id="header-btn-crash"
              onClick={onSimulateCrash}
              disabled={isSimulating}
              className={`px-5 py-2 rounded-lg text-xs font-black transition flex items-center gap-2 shadow-lg ${
                isSimulating
                  ? 'bg-amber-600 text-white animate-pulse'
                  : isCrashed
                  ? 'bg-rose-950 border border-rose-500 text-rose-300'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/60 hover:scale-[1.02]'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isSimulating ? 'SIMULATING RESPONSE...' : 'SIMULATE CRASH'}</span>
            </button>

            {/* Step Forward button for judge presentation */}
            {isCrashed && stage < 13 && !isSimulating && (
              <button
                id="header-btn-step"
                onClick={onStepForward}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-700 flex items-center gap-1"
                title="Step forward to next phase for demonstration"
              >
                <StepForward className="w-3 h-3 text-indigo-400" />
                <span>Next Step</span>
              </button>
            )}

            {/* Speed Toggle (1x / 2x) */}
            <button
              onClick={() => setSimSpeed(simSpeed === 1 ? 2 : 1)}
              className="px-2.5 py-2 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
              title="Toggle Speed"
            >
              <FastForward className="w-3 h-3 text-amber-400" />
              <span>{simSpeed}x</span>
            </button>

            {/* Reset */}
            <button
              id="header-btn-reset"
              onClick={onReset}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition"
              title="Reset Simulation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* SECTION 17: CORE MESSAGE BANNER */}
        <div className="mt-2.5 py-1.5 px-3 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-white uppercase tracking-wider">THE CORE CONCEPT:</span>
            <span className="text-slate-300 font-medium">
              "The car does not wait for someone to call for help. It detects the crash and automatically starts the emergency response."
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {isCrashed ? 'INCIDENT ACTIVE (INC-001)' : 'STANDBY MONITORING'}
          </span>
        </div>

        {/* SECTION 1: PROMINENT LIVE INCIDENT STATUS AREA (TIMELINE ANIMATION) */}
        <div className="mt-2.5 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 overflow-x-auto">
          <div className="min-w-[720px] flex items-center justify-between gap-1 text-[10px]">
            {liveSequenceSteps.map((step, idx) => {
              const isPassed = isCrashed && stage >= step.num;
              const isCurrent = isCrashed && (stage === step.num || (idx < liveSequenceSteps.length - 1 && stage > step.num && stage < liveSequenceSteps[idx + 1].num));

              return (
                <React.Fragment key={idx}>
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border font-bold transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-rose-950 border-rose-500 text-rose-200 ring-1 ring-rose-500/50'
                        : isPassed
                        ? 'bg-emerald-950/60 border-emerald-600/70 text-emerald-300'
                        : 'bg-slate-950 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                      isPassed
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPassed ? '✓' : idx + 1}
                    </span>
                    <span className="whitespace-nowrap">{step.label}</span>
                  </div>

                  {idx < liveSequenceSteps.length - 1 && (
                    <span className={`text-[10px] font-mono shrink-0 ${
                      isPassed ? 'text-emerald-500' : 'text-slate-700'
                    }`}>
                      →
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto mt-3 pt-1 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase ${
                    tab.id === 'hospital'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
