export type TabType = 'home' | 'requests' | 'dtn' | 'resources' | 'allocations' | 'deliveries' | 'settings';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type RequestStatus = 'Created' | 'Received' | 'Verified' | 'Allocated' | 'Dispatched' | 'Delivered';

export interface ReliefRequest {
  id: string;
  location: string;
  affectedPopulation: number;
  priority: PriorityLevel;
  status: RequestStatus;
  urgencyReason?: string;
  resources: {
    water: number;       // Liters
    food: number;        // Rations
    medical: number;     // Kits
    blankets: number;    // Units
    shelter?: number;    // Tents/Kits
  };
  fulfillmentPercentage: number;
  timeline: {
    step: string;
    time: string;
    completed: boolean;
    active: boolean;
  }[];
  dtnMetadata: {
    sourceNode: string;
    transportProtocol: string;
    messageId: string;
    hopCount: number;
    secured: boolean;
    lastSync: string;
  };
}

export interface ResourceItem {
  id: string;
  name: string;
  sku: string;
  priorityLabel: string;
  unit: string;
  icon: string;
  available: number;
  reserved: number;
  allocated: number;
  dispatched: number;
  delivered: number;
  totalManaged: number;
  isCritical: boolean;
  zone: string;
}

export interface FundAllocation {
  id: string;
  requestRef: string;
  purpose: string;
  amount: number;
  amountFormatted: string;
  status: 'Released' | 'Pending Transfer' | 'Under Review';
  auditStatus: 'Blockchain Verified' | 'Awaiting Verification' | 'DTN Synced';
  timestamp: string;
  recipientOrg: string;
  blockHash: string;
}

export interface Delivery {
  id: string;
  refRequest: string;
  route: {
    from: string;
    to: string;
  };
  status: 'In Transit' | 'Sync Pending' | 'Delivered' | 'Allocated' | 'Dispatched';
  assignedTo: string;
  vehicle: string;
  items: string[];
  lastKnownLocation: string;
  estArrival: string;
  isOfflineSyncPending?: boolean;
  timeline: {
    step: string;
    time: string;
    location: string;
    completed: boolean;
    active: boolean;
  }[];
}

export interface DTNNode {
  id: string;
  name: string;
  role: 'Field Device' | 'Relay Node' | 'Destination' | 'Mobile Ferry' | 'Base Command';
  icon: string;
  messagesQueued: number;
  status: 'Connected' | 'Offline' | 'Syncing';
  signal: number; // 0-100
  battery: number; // 0-100
  lastSync: string;
  distance?: string;
  isRelayActive?: boolean;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  timestamp: string;
  source: string;
  type: 'verification' | 'allocation' | 'blockchain' | 'dtn' | 'logistics';
  iconColor: string;
}

export interface DisasterMeta {
  title: string;
  region: string;
  year: number;
  activeRequestsCount: number;
  resourcesAllocatedPercentage: number;
  connectedDTNNodesCount: number;
  isOnline: boolean;
  dtnMeshActive: boolean;
  totalReliefCorpus: number;
  allocatedAmount: number;
  releasedAmount: number;
  pendingAmount: number;
  remainingAmount: number;
}
