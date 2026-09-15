import React from 'react';
import {
  Clock,
  ArrowRight,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Activity,
  Shield,
  Hospital,
  HeartPulse,
} from 'lucide-react';

export const BeforeAfterComparison: React.FC = () => {
  const traditionalSteps = [
    { title: 'Crash', desc: 'Accident occurs on the road' },
    { title: 'Someone notices', desc: 'Relies on conscious driver or passing bystander' },
    { title: 'Someone calls', desc: 'Dialing emergency number and waiting for call-taker' },
    { title: 'Location explained', desc: 'Verbal description of street landmarks or mile markers' },
    { title: 'Ambulance dispatched', desc: 'Dispatcher relays details manually to emergency crew' },
    { title: 'Hospital contacted', desc: 'Emergency department receives minimal advance notice' },
  ];

  const ourSystemSteps = [
    { title: 'Crash', desc: 'Accident occurs on the road' },
    { title: 'Automatically detected', desc: 'Vehicle sensors detect deceleration and impact' },
    { title: 'GPS captured', desc: 'Precise coordinates locked automatically' },
    { title: 'Data secured', desc: 'Dashcam clip & crash telemetry buffered' },
    { title: 'Emergency services alerted', desc: 'Simultaneous digital notification to ambulance & police' },
    { title: 'Hospital prepares', desc: 'Trauma team receives pre-arrival telemetry and reserves bay' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
            System Comparison
          </span>
          <span className="text-xs text-slate-400 font-mono">FLOW BENCHMARK</span>
        </div>
        <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
          TRADITIONAL RESPONSE VS. OUR SYSTEM
        </h2>
        <p className="text-sm text-slate-300">
          Comparing the sequential communication flow of traditional reporting versus the vehicle-integrated response system.
        </p>
      </div>

      {/* SECTION 10: HIGHLIGHT THREE PILLARS (LESS DELAY, BETTER COORDINATION, FASTER RESPONSE) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-sm font-black text-emerald-400 uppercase tracking-wide">
            LESS DELAY
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Eliminates time spent waiting for bystanders to notice, dial emergency numbers, and explain location.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-sm font-black text-sky-400 uppercase tracking-wide">
            BETTER COORDINATION
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ambulance, police, and hospital receive identical, verified telemetry simultaneously.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-sm font-black text-indigo-400 uppercase tracking-wide">
            FASTER RESPONSE
          </div>
          <p className="text-xs text-slate-400 mt-1">
            First responders dispatch immediately with exact coordinates and crash severity data.
          </p>
        </div>
      </div>

      {/* Two Column Workflow Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Traditional Response */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-base">TRADITIONAL RESPONSE</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800">
                MANUAL REPORTING
              </span>
            </div>

            <p className="text-xs text-slate-400 my-3">
              Relies on human observation, manual dialing, and verbal description of location.
            </p>

            {/* Steps Timeline */}
            <div className="space-y-2.5 relative mt-4">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800 -z-0" />
              {traditionalSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-700 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <strong>Delay Risk:</strong> If occupants are unconscious and no bystanders are present, notification can be delayed indefinitely.
          </div>
        </div>

        {/* Column 2: Our System */}
        <div className="p-5 rounded-xl bg-slate-900 border border-emerald-900/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">OUR SYSTEM</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                AUTOMATIC COORDINATION
              </span>
            </div>

            <p className="text-xs text-slate-300 my-3">
              Existing vehicle systems detect the crash and coordinate emergency response automatically.
            </p>

            {/* Steps Timeline */}
            <div className="space-y-2.5 relative mt-4">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-emerald-900/60 -z-0" />
              {ourSystemSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div className="flex-1 p-2.5 rounded-lg bg-slate-950 border border-emerald-900/40">
                    <h4 className="text-xs font-bold text-emerald-200">{step.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/80 text-xs text-emerald-200">
            <strong>Key Benefit:</strong> The car detects the crash and starts response immediately. No phone call or bystander required.
          </div>
        </div>

      </div>

      {/* Golden Hour Impact Callout */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
          <HeartPulse className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-white text-base">EVERY SECOND MATTERS.</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            The goal of the system is to eliminate avoidable communication and coordination delays.
            Automatic detection, faster notification, better coordination, and earlier hospital preparation ensure care begins as early as possible.
          </p>
        </div>
      </div>

    </div>
  );
};
