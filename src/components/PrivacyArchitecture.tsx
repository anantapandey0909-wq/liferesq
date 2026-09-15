import React from 'react';
import {
  ShieldCheck,
  Lock,
  Layers,
  Cpu,
  Database,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Car,
  Radio,
  Video,
  Navigation,
} from 'lucide-react';

export const PrivacyArchitecture: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
            System Concept & Data Ethics
          </span>
          <span className="text-xs text-slate-400 font-mono">GOVERNANCE & ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
          PRIVACY & SYSTEM ARCHITECTURE
        </h2>
        <p className="text-sm text-slate-300">
          How the system coordinates emergency response using existing vehicle technology while upholding data minimization.
        </p>
      </div>

      {/* SECTION 17: CORE INNOVATION & PRODUCT POSITIONING */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                PRODUCT POSITIONING
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                VEHICLE-INTEGRATED EMERGENCY RESPONSE SYSTEM
              </span>
            </div>
            
            <h3 className="text-xl font-black text-white mt-1.5">
              No Separate Physical Black Box
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-4xl">
              This system is <strong>NOT a new physical black box</strong> or proprietary hardware crate installed into the vehicle.
              Instead, it is an automatic coordination software layer that connects the existing systems modern vehicles already have:
            </p>

            {/* Existing Vehicle Capabilities */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span>CRASH SENSORS</span>
                </div>
                <p className="text-[11px] text-slate-400">Impact & deceleration sensors, airbag deployment lines.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs mb-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>GPS NAVIGATION</span>
                </div>
                <p className="text-[11px] text-slate-400">Satellite location for exact crash coordinates.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Video className="w-3.5 h-3.5" />
                  <span>DASHCAM BUFFER</span>
                </div>
                <p className="text-[11px] text-slate-400">Continuous rolling circular buffer locking last 2 minutes.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <Radio className="w-3.5 h-3.5" />
                  <span>CONNECTIVITY</span>
                </div>
                <p className="text-[11px] text-slate-400">Cellular modem for instant multi-agency packet dispatch.</p>
              </div>
            </div>

            {/* The Formula */}
            <div className="mt-4 p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                <span className="font-bold text-indigo-300">EXISTING VEHICLE SYSTEMS</span>
                <span className="text-slate-500">+</span>
                <span className="font-bold text-emerald-300">AUTOMATIC DATA CAPTURE</span>
                <span className="text-slate-500">+</span>
                <span className="font-bold text-sky-300">CONNECTED EMERGENCY COORDINATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 12: FOUR SIMPLE PRIVACY PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Principle 1: Data Minimization */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">DATA MINIMIZATION</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Only emergency-relevant information is shared:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Transmits single GPS coordinate snapshot at the moment of crash.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Locks only the rolling two-minute pre-crash window; regular driving trips are not saved or uploaded.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>No continuous tracking or surveillance logs are streamed during normal driving.</span>
            </li>
          </ul>
        </div>

        {/* Principle 2: Purpose Limitation */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">PURPOSE LIMITATION</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Data is used exclusively for emergency coordination:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Telemetry is routed only to authenticated emergency dispatchers, responding ambulance crews, and the destination hospital.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Data is never monetized, sold, or repurposed for commercial profiling.</span>
            </li>
          </ul>
        </div>

        {/* Principle 3: Synthetic Data */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">SYNTHETIC DATA</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Competition prototype transparency:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>This prototype uses simulated data to demonstrate system architecture.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>No real patient records, personal medical data, or real-world individuals are involved.</span>
            </li>
          </ul>
        </div>

        {/* Principle 4: Safety & Non-Disruption */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-base">NO REAL EMERGENCY SERVICES CONNECTED</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Isolated demonstration environment:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>Operates in a completely sandboxed simulation.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>No real 911 lines, police cruisers, ambulances, or live hospital beds are alerted.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
