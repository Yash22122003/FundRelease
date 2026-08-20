import React, { useState, useEffect } from 'react';
import {
  TabType,
  ReliefRequest,
  ResourceItem,
  FundAllocation,
  Delivery,
  DTNNode,
  ActivityFeedItem,
  DisasterMeta,
  RequestStatus,
} from './types';
import {
  INITIAL_DISASTER_META,
  INITIAL_REQUESTS,
  INITIAL_RESOURCES,
  INITIAL_ALLOCATIONS,
  INITIAL_DELIVERIES,
  INITIAL_DTN_NODES,
  INITIAL_ACTIVITY_FEED,
} from './data/initialData';
import { Header } from './components/Header';
import { DesktopSidebar, MobileBottomNav } from './components/Navigation';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { ReliefRequestsView } from './components/ReliefRequestsView';
import { ResourceInventoryView } from './components/ResourceInventoryView';
import { FundAllocationView } from './components/FundAllocationView';
import { DistributionView } from './components/DistributionView';
import { DTNNetworkView } from './components/DTNNetworkView';
import { SettingsView } from './components/SettingsView';
import {
  RequestModal,
  AllocationModal,
  LogShipmentModal,
  TacticalMapModal,
  ContactFieldModal,
} from './components/Modals';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('coordinator@agency.gov');

  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Core Data State (with localStorage persistence)
  const [meta, setMeta] = useState<DisasterMeta>(() => {
    const saved = localStorage.getItem('fundrelease_meta');
    return saved ? JSON.parse(saved) : INITIAL_DISASTER_META;
  });

  const [requests, setRequests] = useState<ReliefRequest[]>(() => {
    const saved = localStorage.getItem('fundrelease_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [selectedRequestId, setSelectedRequestId] = useState<string>('REQ-1042');

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('fundrelease_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [allocations, setAllocations] = useState<FundAllocation[]>(() => {
    const saved = localStorage.getItem('fundrelease_allocations');
    return saved ? JSON.parse(saved) : INITIAL_ALLOCATIONS;
  });

  const [deliveries, setDeliveries] = useState<Delivery[]>(() => {
    const saved = localStorage.getItem('fundrelease_deliveries');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
  });

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('DL-208');

  const [nodes, setNodes] = useState<DTNNode[]>(() => {
    const saved = localStorage.getItem('fundrelease_nodes');
    return saved ? JSON.parse(saved) : INITIAL_DTN_NODES;
  });

  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(() => {
    const saved = localStorage.getItem('fundrelease_activity');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_FEED;
  });

  // Modal States
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<ReliefRequest | null>(null);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [isLogShipmentModalOpen, setIsLogShipmentModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapLocationTarget, setMapLocationTarget] = useState('Uttarakhand Sector');
  const [contactDeliveryTarget, setContactDeliveryTarget] = useState<Delivery | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('fundrelease_meta', JSON.stringify(meta));
  }, [meta]);

  useEffect(() => {
    localStorage.setItem('fundrelease_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('fundrelease_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('fundrelease_allocations', JSON.stringify(allocations));
  }, [allocations]);

  useEffect(() => {
    localStorage.setItem('fundrelease_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('fundrelease_nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('fundrelease_activity', JSON.stringify(activityFeed));
  }, [activityFeed]);

  // Handlers
  const handleLogin = (mode: 'online' | 'offline', email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setMeta((prev) => ({ ...prev, isOnline: mode === 'online' }));
    showToast(
      mode === 'online'
        ? `Logged in as ${email} (Connected to Cloud Enclave)`
        : `Field Operator mode active (DTN Store-Carry-Forward Enabled)`
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Signed out of command center.');
  };

  const handleToggleOnline = () => {
    setMeta((prev) => {
      const nextOnline = !prev.isOnline;
      showToast(
        nextOnline
          ? 'Cloud Connectivity Restored: Synced with National Relief Hub'
          : 'Offline Mode: Routing all traffic via DTN Store-Carry-Forward mesh'
      );
      return { ...prev, isOnline: nextOnline };
    });
  };

  const handleTriggerDTNSync = () => {
    showToast('DTN Mesh Packet Exchange Completed: 4 bundles verified.');
    setActivityFeed((prev) => [
      {
        id: `act-${Date.now()}`,
        title: 'DTN Mesh synchronized with nearby nodes',
        timestamp: 'Just now',
        source: 'P2P Mesh Ferry',
        type: 'dtn',
        iconColor: '#f59e0b',
      },
      ...prev,
    ]);
  };

  const handleDeployAid = (village: string, reqId: string) => {
    setSelectedRequestId(reqId);
    setCurrentTab('deliveries');
    showToast(`Aid deployment workflow initialized for ${village} (${reqId}).`);
  };

  const handleOpenMap = (locationName = 'Uttarakhand Flood Response 2026') => {
    setMapLocationTarget(locationName);
    setIsMapModalOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updatedTimeline = r.timeline.map((step) => {
            if (step.step.toLowerCase() === newStatus.toLowerCase()) {
              return { ...step, completed: true, active: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            }
            return { ...step, active: false };
          });

          return {
            ...r,
            status: newStatus,
            timeline: updatedTimeline,
            fulfillmentPercentage:
              newStatus === 'Delivered'
                ? 100
                : newStatus === 'Dispatched'
                ? 80
                : newStatus === 'Allocated'
                ? 60
                : newStatus === 'Verified'
                ? 40
                : r.fulfillmentPercentage,
          };
        }
        return r;
      })
    );

    setActivityFeed((prev) => [
      {
        id: `act-${Date.now()}`,
        title: `Request ${id} status updated to ${newStatus}`,
        timestamp: 'Just now',
        source: 'Relief Coordinator',
        type: 'verification',
        iconColor: '#5caf81',
      },
      ...prev,
    ]);

    showToast(`Request ${id} transitioned to ${newStatus}`);
  };

  const handleSaveRequest = (reqData: Partial<ReliefRequest>) => {
    if (editingRequest) {
      setRequests((prev) =>
        prev.map((r) => (r.id === editingRequest.id ? { ...r, ...reqData } as ReliefRequest : r))
      );
      showToast(`Request ${editingRequest.id} updated.`);
    } else {
      const nextNum = requests.length + 1045;
      const newId = `REQ-${nextNum}`;
      const newReq: ReliefRequest = {
        id: newId,
        location: reqData.location || 'Sector 5 Outpost',
        affectedPopulation: reqData.affectedPopulation || 150,
        priority: reqData.priority || 'High',
        status: 'Created',
        urgencyReason: reqData.urgencyReason || 'Emergency field dispatch.',
        resources: reqData.resources || { water: 500, food: 200, medical: 40, blankets: 80 },
        fulfillmentPercentage: 10,
        timeline: [
          { step: 'Created', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, active: true },
          { step: 'Received', time: 'Pending', completed: false, active: false },
          { step: 'Verified', time: 'Pending', completed: false, active: false },
          { step: 'Allocated', time: 'Pending', completed: false, active: false },
          { step: 'Dispatched', time: 'Pending', completed: false, active: false },
          { step: 'Delivered', time: 'Pending', completed: false, active: false },
        ],
        dtnMetadata: {
          sourceNode: 'tablet-A',
          transportProtocol: 'DTN (Delay-Tolerant)',
          messageId: `msg-${Math.floor(100000 + Math.random() * 900000)}`,
          hopCount: 1,
          secured: true,
          lastSync: 'Just now',
        },
      };

      setRequests((prev) => [newReq, ...prev]);
      setSelectedRequestId(newId);
      setMeta((prev) => ({ ...prev, activeRequestsCount: prev.activeRequestsCount + 1 }));
      showToast(`New Request ${newId} logged and broadcast via DTN!`);
    }
    setEditingRequest(null);
  };

  const handleSaveAllocation = (allocData: Partial<FundAllocation>) => {
    const nextNum = allocations.length + 1;
    const allocId = `ALLOC-2026-00${nextNum}`;
    const newAlloc: FundAllocation = {
      id: allocId,
      requestRef: allocData.requestRef || 'REQ-1042',
      purpose: allocData.purpose || 'Relief supply mobilization',
      amount: allocData.amount || 250000,
      amountFormatted: allocData.amountFormatted || `₹${(allocData.amount || 250000).toLocaleString('en-IN')}`,
      status: 'Released',
      auditStatus: 'Blockchain Verified',
      timestamp: 'Today, Just now',
      recipientOrg: allocData.recipientOrg || 'State Disaster Response Force (SDRF)',
      blockHash: allocData.blockHash || `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    };

    setAllocations((prev) => [newAlloc, ...prev]);
    setMeta((prev) => {
      const added = newAlloc.amount;
      return {
        ...prev,
        allocatedAmount: prev.allocatedAmount + added,
        releasedAmount: prev.releasedAmount + added,
        remainingAmount: Math.max(0, prev.remainingAmount - added),
      };
    });

    setActivityFeed((prev) => [
      {
        id: `act-${Date.now()}`,
        title: `Fund Allocation ${allocId} authorized (${newAlloc.amountFormatted})`,
        timestamp: 'Just now',
        source: 'Treasury Enclave',
        type: 'blockchain',
        iconColor: '#5caf81',
      },
      ...prev,
    ]);

    showToast(`Allocation ${allocId} created with cryptographic signature!`);
  };

  const handleLogShipment = (itemKey: string, quantity: number) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === itemKey) {
          const newAvail = r.available + quantity;
          const newTotal = (r.totalManaged || 5000) + quantity;
          return {
            ...r,
            available: newAvail,
            totalManaged: newTotal,
            isCritical: newAvail < 1000,
          };
        }
        return r;
      })
    );

    setActivityFeed((prev) => [
      {
        id: `act-${Date.now()}`,
        title: `Shipment logged: +${quantity.toLocaleString()} units inbound to inventory`,
        timestamp: 'Just now',
        source: 'Central Warehouse Logistics',
        type: 'logistics',
        iconColor: '#1a365d',
      },
      ...prev,
    ]);

    showToast(`Inventory replenished: +${quantity.toLocaleString()} units registered.`);
  };

  const handleAdvanceDelivery = (deliveryId: string) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          const steps = d.timeline;
          const activeIndex = steps.findIndex((s) => s.active);
          if (activeIndex >= 0 && activeIndex < steps.length - 1) {
            const nextIndex = activeIndex + 1;
            const updatedSteps = steps.map((s, idx) => {
              if (idx <= activeIndex) return { ...s, completed: true, active: false };
              if (idx === nextIndex) return { ...s, completed: false, active: true, time: 'Just now' };
              return s;
            });
            const nextStatus = updatedSteps[nextIndex].step as Delivery['status'];
            return {
              ...d,
              status: nextStatus === 'Delivered' ? 'Delivered' : 'In Transit',
              timeline: updatedSteps,
            };
          }
        }
        return d;
      })
    );
    showToast(`Delivery ${deliveryId} milestone progressed.`);
  };

  const handleResetData = () => {
    localStorage.clear();
    setMeta(INITIAL_DISASTER_META);
    setRequests(INITIAL_REQUESTS);
    setSelectedRequestId('REQ-1042');
    setResources(INITIAL_RESOURCES);
    setAllocations(INITIAL_ALLOCATIONS);
    setDeliveries(INITIAL_DELIVERIES);
    setSelectedDeliveryId('DL-208');
    setNodes(INITIAL_DTN_NODES);
    setActivityFeed(INITIAL_ACTIVITY_FEED);
    showToast('Baseline disaster simulation state restored.');
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const isDTNView = currentTab === 'dtn';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row antialiased ${isDTNView ? 'bg-[#002045] text-[#d6e3ff]' : 'bg-[#f8f9ff] text-[#0d1c2e]'}`}>
      {/* Desktop Navigation Drawer */}
      <DesktopSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isDarkTheme={isDTNView}
        onLogout={handleLogout}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          meta={meta}
          onToggleOnline={handleToggleOnline}
          onOpenDTNSyncModal={handleTriggerDTNSync}
          isDarkTheme={isDTNView}
          onOpenProfile={() => setCurrentTab('settings')}
        />

        {/* Dynamic Canvas Views */}
        {currentTab === 'home' && (
          <DashboardView
            meta={meta}
            requests={requests}
            activityFeed={activityFeed}
            onSelectRequest={(reqId) => {
              setSelectedRequestId(reqId);
              setCurrentTab('requests');
            }}
            onDeployAid={handleDeployAid}
            onOpenMap={() => handleOpenMap('Uttarakhand Critical Sectors')}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'requests' && (
          <ReliefRequestsView
            requests={requests}
            selectedRequestId={selectedRequestId}
            onSelectRequestId={setSelectedRequestId}
            onUpdateStatus={handleUpdateStatus}
            onOpenNewRequestModal={() => {
              setEditingRequest(null);
              setIsRequestModalOpen(true);
            }}
            onOpenMapModal={(loc) => handleOpenMap(loc)}
            onExport={() => showToast('Exporting Relief Requests manifest (CSV/JSON)...')}
            onEditRequest={(req) => {
              setEditingRequest(req);
              setIsRequestModalOpen(true);
            }}
          />
        )}

        {currentTab === 'resources' && (
          <ResourceInventoryView
            resources={resources}
            onOpenLogShipmentModal={() => setIsLogShipmentModalOpen(true)}
            onExportData={() => showToast('Exporting supply inventory report (CSV)...')}
          />
        )}

        {currentTab === 'allocations' && (
          <FundAllocationView
            meta={meta}
            allocations={allocations}
            onOpenNewAllocationModal={() => setIsAllocationModalOpen(true)}
            onFilterOrExport={() => showToast('Exporting blockchain allocation ledger (CSV)...')}
          />
        )}

        {currentTab === 'deliveries' && (
          <DistributionView
            deliveries={deliveries}
            selectedDeliveryId={selectedDeliveryId}
            onSelectDelivery={setSelectedDeliveryId}
            onAdvanceDelivery={handleAdvanceDelivery}
            onContactField={(del) => setContactDeliveryTarget(del)}
            onExportLog={() => showToast('Exporting fleet telemetry log...')}
          />
        )}

        {currentTab === 'dtn' && (
          <DTNNetworkView
            nodes={nodes}
            onTriggerSync={handleTriggerDTNSync}
            onSimulatePacket={(src, dest) => {
              showToast(`Transmitting DTN bundle from ${src} to ${dest}...`);
            }}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            meta={meta}
            onResetData={handleResetData}
            onUpdateMeta={(updated) => setMeta((prev) => ({ ...prev, ...updated }))}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isDarkTheme={isDTNView}
      />

      {/* Interactive Modals */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setEditingRequest(null);
        }}
        onSubmit={handleSaveRequest}
        initialData={editingRequest}
      />

      <AllocationModal
        isOpen={isAllocationModalOpen}
        onClose={() => setIsAllocationModalOpen(false)}
        onSubmit={handleSaveAllocation}
      />

      <LogShipmentModal
        isOpen={isLogShipmentModalOpen}
        onClose={() => setIsLogShipmentModalOpen(false)}
        onLogShipment={handleLogShipment}
      />

      <TacticalMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        locationName={mapLocationTarget}
      />

      <ContactFieldModal
        isOpen={Boolean(contactDeliveryTarget)}
        onClose={() => setContactDeliveryTarget(null)}
        delivery={contactDeliveryTarget}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#002045] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2.5 text-xs font-semibold animate-slide-up">
          <span className="material-symbols-outlined text-[#adc7f7] text-[20px]">
            info
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-2"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
