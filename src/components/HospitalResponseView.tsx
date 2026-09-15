import React from 'react';
import {
  Hospital,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  HeartPulse,
  Activity,
  Bed,
  MapPin,
  Shield,
  Zap,
} from 'lucide-react';
import { HospitalFacility, EmergencyPacket, VehicleTelemetry } from '../types';

interface HospitalResponseViewProps {
  vehicle: VehicleTelemetry;
  stage: number;
  emergencyPacket: EmergencyPacket;
  hospitals: HospitalFacility[];
  ambulanceEta: string;
}

export const HospitalResponseView: React.FC<HospitalResponseViewProps> = ({
  vehicle,
  stage,
  emergencyPacket,
  hospitals,
  ambulanceEta,
}) => {
  const isCrashed = vehicle.status !== 'CONNECTED';
  const isHospitalAlerted = isCrashed && stage >= 11;
  const isTeamPreparing = isCrashed && stage >= 12;

  // Medical Team Members
  const medicalTeam = [
    { name: 'Dr. Evelyn Vance, MD', role: 'Emergency Physician', status: isTeamPreparing ? 'PREPARING' : 'ON DUTY' },
    { name: 'Dr. Tariq Al-Mansoor, MD', role: 'Trauma Surgeon', status: isTeamPreparing ? 'PREPARING' : 'ON DUTY' },
    { name: 'Elena Rostova, RN', role: 'Triage Nurse', status: isTeamPreparing ? 'PREPARING' : 'AVAILABLE' },
    { name: 'Dr. Jason Miller, MD', role: 'Anesthesiologist', status: isTeamPreparing ? 'PREPARING' : 'ON STANDBY' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                Hospital Reception Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">FACILITY SELECTION & ADVANCE PREPARATION</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">HOSPITAL RESPONSE</h2>
            <p className="text-sm text-slate-300">
              Emergency department receives incident telemetry before ambulance arrival so medical teams prepare in advance.
            </p>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Facility Alert Status</span>
            <span className={`font-bold font-mono ${isHospitalAlerted ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isHospitalAlerted ? 'HOSPITAL ALERT SENT' : 'STANDBY'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 6: THREE SIMPLIFIED STEPS (APPROPRIATE HOSPITAL SELECTED, ALERT SENT, TEAM PREPARING) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`p-4 rounded-xl border transition-all ${
          isCrashed && stage >= 10
            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-100'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-white">STEP 1</span>
            {isCrashed && stage >= 10 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-sm font-black mt-1">APPROPRIATE HOSPITAL SELECTED</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Algorithm matched Hospital A based on capacity & travel time.
          </p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          isHospitalAlerted
            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-100'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-white">STEP 2</span>
            {isHospitalAlerted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-sm font-black mt-1">HOSPITAL ALERT SENT</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Pre-arrival incident packet and ETA transmitted to emergency desk.
          </p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          isTeamPreparing
            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-100'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-white">STEP 3</span>
            {isTeamPreparing && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <div className="text-sm font-black mt-1">MEDICAL TEAM PREPARING</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Doctors and nurses preparing equipment before ambulance arrives.
          </p>
        </div>
      </div>

      {/* Main Grid: Hospital Selection Options & Incoming Emergency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: HOSPITAL OPTIONS (Section 6) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">HOSPITAL OPTIONS</h3>
                <p className="text-xs text-slate-400">
                  Selection algorithm evaluates Distance, Emergency capability, Current availability, and Estimated travel time.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                CRITERIA: DISTANCE • CAPABILITY • CAPACITY • ETA
              </span>
            </div>

            {/* 3 Hospital Options per User Specification */}
            <div className="space-y-3 mt-4">
              
              {/* Hospital A */}
              <div className="p-4 rounded-xl border bg-emerald-950/30 border-emerald-500/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500 flex items-center justify-center font-black text-emerald-300">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Hospital A</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Regional Emergency Center</span>
                        <span>•</span>
                        <span>Distance: 4.2 km</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-black uppercase bg-emerald-500 text-slate-950">
                      Status: SELECTED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-emerald-900/50 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">ETA</span>
                    <span className="font-mono font-bold text-white">8 min</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Emergency Capacity</span>
                    <span className="font-bold text-emerald-400">Available</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase">Rationale</span>
                    <span className="text-slate-300">Equipped for severe impact care</span>
                  </div>
                </div>
              </div>

              {/* Hospital B */}
              <div className="p-4 rounded-xl border bg-slate-950 border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-slate-400">
                      B
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-300 text-base">Hospital B</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Community Clinic</span>
                        <span>•</span>
                        <span>Distance: 2.1 km (Closer)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">
                      Status: NOT SELECTED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">ETA</span>
                    <span className="font-mono font-bold text-slate-300">6 min</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Emergency Capacity</span>
                    <span className="font-bold text-amber-400">Limited</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase">Rationale</span>
                    <span className="text-slate-400">Lacks capability for high-severity impact</span>
                  </div>
                </div>
              </div>

              {/* Hospital C */}
              <div className="p-4 rounded-xl border bg-slate-950 border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-slate-400">
                      C
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-300 text-base">Hospital C</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Metro General Hospital</span>
                        <span>•</span>
                        <span>Distance: 5.0 km</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      Status: BACKUP
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">ETA</span>
                    <span className="font-mono font-bold text-slate-300">10 min</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Emergency Capacity</span>
                    <span className="font-bold text-emerald-400">Available</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase">Rationale</span>
                    <span className="text-slate-400">Capacity available, longer travel time</span>
                  </div>
                </div>
              </div>

            </div>

            <p className="text-[11px] text-slate-500 mt-4 italic">
              * Simulated demonstration of automated hospital matching, not a real hospital routing system.
            </p>
          </div>

          {/* SECTION 9: GOLDEN HOUR MESSAGE */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                  THE GOLDEN HOUR
                </div>
                <h3 className="text-xl font-black text-white mt-0.5 tracking-tight">
                  EVERY SECOND MATTERS.
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Severe trauma outcomes correlate directly with the time between impact and definitive emergency medical care.
                  By removing manual bystander phone calls and verbal direction errors, the system reduces avoidable communication delays.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Step 1</span>
                    <span className="text-xs font-bold text-indigo-300">Automatic detection</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Step 2</span>
                    <span className="text-xs font-bold text-indigo-300">Faster notification</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Step 3</span>
                    <span className="text-xs font-bold text-indigo-300">Better coordination</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Step 4</span>
                    <span className="text-xs font-bold text-indigo-300">Earlier hospital preparation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Incoming Emergency Alert & Medical Team Status */}
        <div className="space-y-4">
          
          {/* Incoming Emergency Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">INCOMING EMERGENCY</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                isHospitalAlerted ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
              }`}>
                {isHospitalAlerted ? 'PRIORITY HIGH' : 'STANDBY'}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Incident ID:</span>
                <span className="font-bold text-white font-mono">{emergencyPacket.incidentId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Estimated Arrival:</span>
                <span className="font-mono font-bold text-sky-400">08 minutes</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Crash Severity:</span>
                <span className="font-bold text-rose-400">{isCrashed ? 'HIGH (18.4 G)' : 'NONE'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Emergency Department:</span>
                <span className="font-bold text-emerald-400">AVAILABLE</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Medical Team:</span>
                <span className={`font-bold ${isTeamPreparing ? 'text-teal-300' : 'text-slate-400'}`}>
                  {isTeamPreparing ? 'PREPARING' : 'ON DUTY'}
                </span>
              </div>
            </div>
          </div>

          {/* Medical Team Preparing */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">MEDICAL TEAM</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {isTeamPreparing ? 'PREPARING IN ADVANCE' : 'ON DUTY'}
              </span>
            </div>

            <div className="space-y-2">
              {medicalTeam.map((member, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{member.name}</div>
                    <div className="text-[11px] text-slate-400">{member.role}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isTeamPreparing
                      ? 'bg-teal-950 text-teal-300 border border-teal-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
