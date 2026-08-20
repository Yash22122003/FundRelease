# FundRelease — Disaster Relief & DTN Mesh Command Center

**FundRelease** is an emergency disaster relief command center and resource logistics platform built for mission-critical operations in disconnected, high-hazard mountain environments. It couples real-time incident management, resource logistics, and fund allocation with **Delay-Tolerant Networking (DTN)** store-carry-forward capabilities to operate effectively even during severe cellular blackout and infrastructure collapse.

---

## 🌟 Key Capabilities

### 1. Incident Command Dashboard
- **Executive Metrics**: Real-time counters for active relief requests, resource fulfillment rates, and connected DTN field nodes.
- **Priority Situation Sectors**: Instant triage cards for high-hazard zones (e.g. Village A & Village B) with immediate aid deployment workflows.
- **Live Activity Feed**: Audited timeline tracking field requests, treasury dispatches, and cryptographic ledger updates.

### 2. Relief Request Lifecycle & Verification
- **Multi-Resource Demand Breakdown**: Track specific village needs across drinking water (L), food rations (MREs), emergency medical kits, and thermal blankets.
- **Milestone Stepper**: 6-stage lifecycle progression (`Created` ➔ `Received` ➔ `Verified` ➔ `Allocated` ➔ `Dispatched` ➔ `Delivered`).
- **DTN Transmission Metadata**: Complete protocol inspectability showing source node IDs, message hashes, hop counts, and custody acknowledgments.

### 3. Resource Inventory & Logistics Pipeline
- **Multi-Tier Supply Pipeline**: Visual breakdown of supply states across *Available*, *Reserved*, *Allocated*, *Dispatched*, and *Delivered*.
- **Inbound Consignment Logging**: Modal interface to register new supply shipments into central warehouse bays.
- **Stock Depletion Safeguards**: Automated alerts for critical supply thresholds.

### 4. Fund Allocation & Cryptographic Ledger
- **Relief Corpus Visualizer**: Transparent overview of Total Corpus (`₹50,00,000`), Released allocations, Pending disbursements, and Remaining reserves.
- **Blockchain Audit Trail**: Tamper-evident transaction logs signed with cryptographic SHA-256 block hashes.
- **Multi-Agency Disbursements**: Direct tracking of allocations to agencies like SDRF, Border Roads Task Force, Jal Sansthan, and Red Cross.

### 5. Fleet Distribution & Convoy Tracking
- **Real-Time GPS & Mesh Telemetry**: Live sector coordinate tracking (e.g. `30.4128° N, 79.3242° E`) across mountain supply convoys.
- **Offline Sync Indicators**: Visual flags for convoy units operating beyond base station coverage with sync-pending states.
- **Field Operative Comms**: Tactical modals supporting Satellite Radio links and DTN SMS bundle dispatching.

### 6. Delay-Tolerant Networking (DTN) Engine
- **Store-Carry-Forward Protocol**: Visual 4-step simulator (`Store` ➔ `Carry` ➔ `Forward` ➔ `Deliver`) illustrating physical packet carriage across terrain.
- **Nearby Mesh Node Inspector**: Monitor signal strength, distances, and queued bundle transfers across connected smartphones, tablets, and drone relays.
- **Terminal Daemon Stream**: Real-time console logs displaying packet receipt, custody transfers, and beacon acknowledgments.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Material Symbols Outlined](https://fonts.google.com/icons) & [Lucide Icons](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Persistence**: LocalStorage with automatic baseline hydration and fallback state resets

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone or open the project repository
cd fundrelease

# Install project dependencies
npm install
```

### Running Locally

```bash
# Launch the Vite development server (port 3000)
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build & Verification

```bash
# Validate TypeScript type safety
npm run lint

# Compile optimized static bundle
npm run build
```

---

## 📂 Project Structure

```
├── metadata.json                 # Application metadata & permissions
├── package.json                  # Dependencies & scripts
├── index.html                    # Application HTML shell
├── src/
│   ├── main.tsx                  # React DOM entry point
│   ├── App.tsx                   # Main state orchestrator & view router
│   ├── types.ts                  # TypeScript interfaces (Requests, Nodes, Allocations, etc.)
│   ├── data/
│   │   └── initialData.ts        # Seed data for emergency relief simulation
│   └── components/
│       ├── Header.tsx            # Mission banner, connectivity & DTN sync controls
│       ├── Navigation.tsx        # Desktop sidebar & mobile bottom navigation
│       ├── LoginView.tsx         # Dual-mode authentication (Cloud / Offline field mode)
│       ├── DashboardView.tsx     # Incident command overview & situation areas
│       ├── ReliefRequestsView.tsx# Request inspector & lifecycle progression
│       ├── ResourceInventoryView.tsx # Logistics pipelines & shipment tracking
│       ├── FundAllocationView.tsx# Treasury corpus & cryptographic audit ledger
│       ├── DistributionView.tsx  # Convoy fleet tracking & field communications
│       ├── DTNNetworkView.tsx    # Store-Carry-Forward protocol & node telemetry
│       ├── SettingsView.tsx      # Disaster parameters & cryptographic settings
│       └── Modals.tsx            # Tactical map, allocations, shipments, & operative modals
```

---

## 📡 Delay-Tolerant Networking (DTN) Philosophy

In catastrophic flood or earthquake scenarios, terrestrial cell towers and fiber backhauls are frequently destroyed. FundRelease leverages **Delay-Tolerant Networking (DTN)** principles:
1. **Local Enclave Storage**: Requests and funds are signed and stored locally in persistent device memory.
2. **Physical Data Mules**: Moving vehicles, relief workers, and aerial drones act as physical packet carriers across disconnected valleys.
3. **Opportunistic Forwarding**: When two nodes encounter each other via Bluetooth LE or Wi-Fi Direct, data bundles are automatically exchanged and verified.
4. **Cryptographic Integrity**: Every bundle contains a cryptographic signature ensuring zero tampering while in transit across untrusted relays.
