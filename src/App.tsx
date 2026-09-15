import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { VehicleSimulator } from './components/VehicleSimulator';
import { EmergencyDashboard } from './components/EmergencyDashboard';
import { HospitalResponseView } from './components/HospitalResponseView';
import { IncidentDetailsView } from './components/IncidentDetailsView';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { PrivacyArchitecture } from './components/PrivacyArchitecture';
import {
  INITIAL_VEHICLE_STATE,
  INITIAL_EMERGENCY_PACKET,
  HOSPITALS_DATA,
  INITIAL_RESPONDERS,
} from './data/mockData';
import { VehicleTelemetry, EmergencyPacket, ResponderUnit, HospitalFacility } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('vehicle');
  const [vehicle, setVehicle] = useState<VehicleTelemetry>(INITIAL_VEHICLE_STATE);
  const [emergencyPacket, setEmergencyPacket] = useState<EmergencyPacket>(INITIAL_EMERGENCY_PACKET);
  const [hospitals, setHospitals] = useState<HospitalFacility[]>(HOSPITALS_DATA);
  const [responders, setResponders] = useState<ResponderUnit[]>(INITIAL_RESPONDERS);
  
  // Simulation progression
  const [stage, setStage] = useState<number>(0); // 0 = normal drive, 1..13 = emergency pipeline
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [ambulanceProgress, setAmbulanceProgress] = useState<number>(0); // 0 to 100
  const [autoNavNotice, setAutoNavNotice] = useState<string | null>(null);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Update responder status when stage changes
  useEffect(() => {
    if (stage >= 8) {
      setResponders((prev) =>
        prev.map((r) => {
          if (r.type === 'AMBULANCE') {
            return {
              ...r,
              status: stage >= 13 ? 'ON_SCENE' : 'DISPATCHED',
              assignedIncident: 'INC-2026-0915-001',
              currentEta:
                stage >= 13
                  ? '00:00 (ON SCENE)'
                  : stage >= 11
                  ? '01:45'
                  : stage >= 9
                  ? '03:10'
                  : '04:32',
            };
          }
          if (r.type === 'POLICE') {
            return {
              ...r,
              status: stage >= 9 ? 'DISPATCHED' : 'IDLE',
              assignedIncident: stage >= 9 ? 'INC-2026-0915-001' : null,
              currentEta: stage >= 12 ? 'ON SCENE' : '02:30',
            };
          }
          return r;
        })
      );
    }
  }, [stage]);

  // Animate ambulance moving along the route towards crash site once dispatched (stage >= 8)
  useEffect(() => {
    let animInterval: NodeJS.Timeout | null = null;
    if (stage >= 8 && ambulanceProgress < 100) {
      const stepInterval = 140 / simSpeed;
      animInterval = setInterval(() => {
        setAmbulanceProgress((prev) => {
          if (prev >= 100) {
            if (animInterval) clearInterval(animInterval);
            return 100;
          }
          return prev + 2.5;
        });
      }, stepInterval);
    } else if (stage < 8) {
      setAmbulanceProgress(0);
    }

    return () => {
      if (animInterval) clearInterval(animInterval);
    };
  }, [stage, simSpeed, ambulanceProgress]);

  // Main Crash Simulation Runner (Sequential Timeline)
  const handleSimulateCrash = () => {
    clearAllTimeouts();
    setIsSimulating(true);
    setAutoNavNotice(null);

    // Initial Crash Trigger (Step 1)
    setStage(1);
    setVehicle({
      ...INITIAL_VEHICLE_STATE,
      status: 'CRASH_DETECTED',
      speed: 0,
      airbagStatus: 'DEPLOYED',
      impactForceG: 18.4,
      impactZone: 'Front-Left',
      emergencySystem: 'ACTIVATED',
      connectivity: 'EMERGENCY_UPLINK',
    });

    const stepDelay = 950 / simSpeed;

    // Sequential 13-stage timeline execution
    const scheduledSteps = [
      {
        st: 2,
        delay: stepDelay * 1,
        action: () => {},
      },
      {
        st: 3,
        delay: stepDelay * 2,
        action: () => {
          setVehicle((v) => ({ ...v, emergencySystem: 'ACTIVATED' }));
        },
      },
      {
        st: 4,
        delay: stepDelay * 3,
        action: () => {},
      },
      {
        st: 5,
        delay: stepDelay * 4,
        action: () => {
          setVehicle((v) => ({
            ...v,
            dashcamStatus: 'BUFFER_LOCKED_SAVED',
          }));
        },
      },
      {
        st: 6,
        delay: stepDelay * 5,
        action: () => {
          setEmergencyPacket((p) => ({ ...p, sosStatus: 'SENT' }));
        },
      },
      {
        st: 7,
        delay: stepDelay * 6,
        action: () => {
          setVehicle((v) => ({ ...v, emergencySystem: 'PACKET_SENT' }));
          // Seamlessly transition to the central Incident Command view if user started from Vehicle
          setActiveTab('dashboard');
          setAutoNavNotice('Transferred to Incident Command to display connected emergency network.');
        },
      },
      {
        st: 8,
        delay: stepDelay * 7,
        action: () => {},
      },
      {
        st: 9,
        delay: stepDelay * 8,
        action: () => {},
      },
      {
        st: 10,
        delay: stepDelay * 9,
        action: () => {},
      },
      {
        st: 11,
        delay: stepDelay * 10,
        action: () => {},
      },
      {
        st: 12,
        delay: stepDelay * 11,
        action: () => {},
      },
      {
        st: 13,
        delay: stepDelay * 13,
        action: () => {
          setIsSimulating(false);
        },
      },
    ];

    scheduledSteps.forEach(({ st, delay, action }) => {
      const timer = setTimeout(() => {
        setStage(st);
        action();
      }, delay);
      timeoutsRef.current.push(timer);
    });
  };

  // Normal Drive
  const handleSimulateNormal = () => {
    clearAllTimeouts();
    setIsSimulating(false);
    setAutoNavNotice(null);
    setStage(0);
    setAmbulanceProgress(0);
    setVehicle(INITIAL_VEHICLE_STATE);
    setEmergencyPacket(INITIAL_EMERGENCY_PACKET);
    setResponders(INITIAL_RESPONDERS);
  };

  // Reset to Baseline
  const handleReset = () => {
    handleSimulateNormal();
  };

  // Step Forward for Presentation
  const handleStepForward = () => {
    if (stage < 13) {
      setStage((prev) => prev + 1);
    }
  };

  const currentAmbulanceEta =
    stage >= 13 ? '00:00 (ON SCENE)' : stage >= 11 ? '01:45' : stage >= 9 ? '03:10' : '04:32';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-900 selection:text-white">
      {/* Header with full presentation controls & live sequence area */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vehicle={vehicle}
        stage={stage}
        isSimulating={isSimulating}
        simSpeed={simSpeed}
        setSimSpeed={setSimSpeed}
        onSimulateCrash={handleSimulateCrash}
        onSimulateNormal={handleSimulateNormal}
        onReset={handleReset}
        onStepForward={handleStepForward}
      />

      {/* Optional Auto-Nav Notice */}
      {autoNavNotice && (
        <div className="max-w-7xl mx-auto px-4 pt-3 w-full">
          <div className="bg-indigo-950/80 border border-indigo-500/50 px-4 py-2 rounded-lg flex items-center justify-between text-xs text-indigo-200">
            <span>{autoNavNotice}</span>
            <button
              onClick={() => setAutoNavNotice(null)}
              className="text-slate-400 hover:text-white font-bold ml-3"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'vehicle' && (
          <VehicleSimulator
            vehicle={vehicle}
            stage={stage}
            emergencyPacket={emergencyPacket}
            onSimulateCrash={handleSimulateCrash}
            onSimulateNormal={handleSimulateNormal}
            onReset={handleReset}
            onViewIncident={() => setActiveTab('incident')}
            isSimulating={isSimulating}
          />
        )}

        {activeTab === 'dashboard' && (
          <EmergencyDashboard
            vehicle={vehicle}
            stage={stage}
            emergencyPacket={emergencyPacket}
            hospitals={hospitals}
            responders={responders}
            ambulanceProgress={ambulanceProgress}
            onViewIncidentDetails={() => setActiveTab('incident')}
            onViewHospitalResponse={() => setActiveTab('hospital')}
          />
        )}

        {activeTab === 'hospital' && (
          <HospitalResponseView
            vehicle={vehicle}
            stage={stage}
            emergencyPacket={emergencyPacket}
            hospitals={hospitals}
            ambulanceEta={currentAmbulanceEta}
          />
        )}

        {activeTab === 'incident' && (
          <IncidentDetailsView
            vehicle={vehicle}
            stage={stage}
            packet={emergencyPacket}
          />
        )}

        {activeTab === 'comparison' && <BeforeAfterComparison />}

        {activeTab === 'privacy' && <PrivacyArchitecture />}
      </main>

      {/* Competition Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-3.5 px-4 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="font-bold text-slate-300">REAL-TIME VEHICLE EMERGENCY RESPONSE SYSTEM</span>
            <span className="mx-2 text-slate-700">•</span>
            <span className="text-slate-400">A SYSTEM THAT RESPONDS.</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            FUTURE CITY INNOVATION COMPETITION • PROTOTYPE
          </div>
        </div>
      </footer>
    </div>
  );
}
