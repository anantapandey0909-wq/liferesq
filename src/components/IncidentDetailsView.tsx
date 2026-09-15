import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Radio,
  MapPin,
  Video,
  ShieldCheck,
  Ambulance,
  Shield,
  Hospital,
  Activity,
  Layers,
} from 'lucide-react';
import { EmergencyPacket, VehicleTelemetry } from '../types';

interface IncidentDetailsViewProps {
  vehicle: VehicleTelemetry;
  stage: number;
  packet: EmergencyPacket;
}

export const IncidentDetailsView: React.FC<IncidentDetailsViewProps> = ({
  vehicle,
  stage,
  packet,
}) => {
  const [copied, setCopied] = useState(false);
  const isCrashed = vehicle.status !== 'CONNECTED';

  // Clean, realistic JSON summary without unnecessary cryptography or hash bloat
  const cleanPacketJSON = JSON.stringify(
    {
      incidentId: packet.incidentId,
      timestamp: packet.timestamp,
      vehicleId: packet.vehicleId,
      model: vehicle.model,
      gpsLocation: {
        latitude: packet.gpsLocation.lat,
        longitude: packet.gpsLocation.lng,
        corridor: packet.gpsLocation.address,
      },
      crashSeverity: isCrashed ? packet.crashSeverity : 'NONE',
      impactInformation: isCrashed ? packet.estimatedImpact : 'Nominal',
      airbagStatus: vehicle.airbagStatus,
      dashcamFootage: packet.dashcamStatus,
      sosStatus: isCrashed && stage >= 6 ? 'SENT' : 'STANDBY',
      packetStatus: isCrashed && stage >= 6 ? 'TRANSMITTED' : 'PENDING',
      respondersNotified: {
        ambulance: stage >= 8,
        police: stage >= 9,
        hospital: stage >= 11,
      },
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanPacketJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                Automated Incident Record
              </span>
              <span className="text-xs text-slate-400 font-mono">FILE: {packet.incidentId}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
              INCIDENT DETAILS & EMERGENCY PACKET
            </h2>
            <p className="text-sm text-slate-300">
              The standardized digital payload compiled automatically upon crash detection and routed to emergency responders.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied Packet JSON' : 'Copy Packet Data'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Clean Emergency Information Packet & Captured Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 5: ONE CLEAN EMERGENCY PACKET CARD */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">EMERGENCY INFORMATION PACKET</h3>
                  <span className="text-xs text-slate-400 font-mono">Standardized Dispatch Record</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase font-mono tracking-wide ${
                isCrashed && stage >= 6
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                STATUS: {isCrashed && stage >= 6 ? 'TRANSMITTED' : 'STANDBY'}
              </span>
            </div>

            {/* Packet Contents per User Specification */}
            <div className="mt-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Incident ID</span>
                <span className="font-bold text-white">{packet.incidentId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Timestamp</span>
                <span className="text-slate-200">{packet.timestamp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">GPS Location</span>
                <span className="text-sky-400 font-semibold">{vehicle.gps.formatted}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Crash Severity</span>
                <span className="text-rose-400 font-black">{isCrashed ? packet.crashSeverity : 'NOMINAL'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Impact Information</span>
                <span className="text-slate-200">{isCrashed ? packet.estimatedImpact : '0.1 G Nominal'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Airbag Status</span>
                <span className={vehicle.airbagStatus === 'DEPLOYED' ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                  {vehicle.airbagStatus}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">Dashcam Footage</span>
                <span className="text-amber-300 font-semibold">{packet.dashcamStatus}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400 font-sans font-medium">SOS Status</span>
                <span className="text-emerald-400 font-bold">
                  {isCrashed && stage >= 6 ? 'SENT' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>

          {/* Responders Notification Status */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Responders Notified Directly
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className={`p-3 rounded-lg border font-bold ${
                stage >= 8
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                AMBULANCE {stage >= 8 ? '✓' : ''}
              </div>
              <div className={`p-3 rounded-lg border font-bold ${
                stage >= 9
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                POLICE {stage >= 9 ? '✓' : ''}
              </div>
              <div className={`p-3 rounded-lg border font-bold ${
                stage >= 11
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                HOSPITAL {stage >= 11 ? '✓' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SECTION 4 AUTOMATIC DATA CAPTURE SIGNALS */}
        <div className="space-y-4">
          
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-black text-white text-base">AUTOMATIC DATA CAPTURE</h3>
                <p className="text-xs text-slate-400">
                  Signals captured simultaneously without relying on human reporting.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase bg-emerald-950 border border-emerald-600 text-emerald-300">
                NO DRIVER ACTION REQUIRED
              </span>
            </div>

            <div className="space-y-3 mt-4">
              
              {/* Signal 1: GPS Location */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-sky-950 text-sky-400 flex items-center justify-center font-bold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">GPS LOCATION</div>
                    <div className="text-[11px] text-slate-400">Precise satellite coordinate snapshot (28.6139° N, 77.2090° E)</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-black text-base">✓</span>
              </div>

              {/* Signal 2: Last 2 Minutes Dashcam */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-amber-950 text-amber-400 flex items-center justify-center font-bold text-xs">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">LAST 2 MINUTES DASHCAM</div>
                    <div className="text-[11px] text-slate-400">Pre-impact driving & collision moment video buffer</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-black text-base">✓</span>
              </div>

              {/* Signal 3: Crash Data */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-rose-950 text-rose-400 flex items-center justify-center font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">CRASH DATA</div>
                    <div className="text-[11px] text-slate-400">18.4 G peak impact force vector & airbag deployment confirmation</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-black text-base">✓</span>
              </div>

              {/* Signal 4: SOS */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">SOS</div>
                    <div className="text-[11px] text-slate-400">Automated emergency transmission packet broadcast</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-black text-base">✓</span>
              </div>

            </div>

            {/* Clear Driver Action Notice */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 text-center">
              <strong>Notice:</strong> No phone call made. No SOS button pressed. The system detects the crash and starts response automatically.
            </div>
          </div>

          {/* Machine-Readable JSON Viewer */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">MACHINE-READABLE PACKET (JSON)</span>
              <span className="text-[10px] text-slate-500 font-mono">CAD INTERFACE PAYLOAD</span>
            </div>
            <pre className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 scrollbar-thin">
              {cleanPacketJSON}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
