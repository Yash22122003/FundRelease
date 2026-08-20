import React, { useState } from 'react';
import { ReliefRequest, FundAllocation, Delivery, PriorityLevel } from '../types';

/* -------------------------------------------------------------
 * 1. New / Edit Relief Request Modal
 * ------------------------------------------------------------- */
interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (req: Partial<ReliefRequest>) => void;
  initialData?: ReliefRequest | null;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [location, setLocation] = useState(initialData?.location || 'Village C (Highland)');
  const [affectedPopulation, setAffectedPopulation] = useState(
    initialData?.affectedPopulation || 280
  );
  const [priority, setPriority] = useState<PriorityLevel>(
    initialData?.priority || 'High'
  );
  const [water, setWater] = useState(initialData?.resources.water || 600);
  const [food, setFood] = useState(initialData?.resources.food || 280);
  const [medical, setMedical] = useState(initialData?.resources.medical || 50);
  const [blankets, setBlankets] = useState(initialData?.resources.blankets || 120);
  const [notes, setNotes] = useState(
    initialData?.urgencyReason || 'Bridge access severed. Potable water and essential infant antibiotics urgently requested.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      location,
      affectedPopulation: Number(affectedPopulation),
      priority,
      urgencyReason: notes,
      resources: {
        water: Number(water),
        food: Number(food),
        medical: Number(medical),
        blankets: Number(blankets),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c4c6cf] relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1a365d] text-[24px]">
              assignment_add
            </span>
            <h3 className="text-lg font-bold text-[#002045]">
              {initialData ? `Edit Request ${initialData.id}` : 'Log New Relief Request'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#74777f] hover:text-[#002045] p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Location / Village Sector
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-medium"
              placeholder="e.g. Village C, Rudraprayag Sector"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
                Affected Population
              </label>
              <input
                type="number"
                required
                min="1"
                value={affectedPopulation}
                onChange={(e) => setAffectedPopulation(Number(e.target.value))}
                className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-sm font-bold text-[#002045]"
              >
                <option value="Critical">Critical (Immediate Hazard)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Requested Resources
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 border rounded-lg bg-[#e5eeff]">
                <span className="block text-[10px] text-[#43474e] font-bold">Water (L)</span>
                <input
                  type="number"
                  min="0"
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="w-full mt-1 p-1 bg-white border rounded font-mono font-bold"
                />
              </div>
              <div className="p-2 border rounded-lg bg-[#e5eeff]">
                <span className="block text-[10px] text-[#43474e] font-bold">Food (Rations)</span>
                <input
                  type="number"
                  min="0"
                  value={food}
                  onChange={(e) => setFood(Number(e.target.value))}
                  className="w-full mt-1 p-1 bg-white border rounded font-mono font-bold"
                />
              </div>
              <div className="p-2 border rounded-lg bg-[#e5eeff]">
                <span className="block text-[10px] text-[#43474e] font-bold">Medical Kits</span>
                <input
                  type="number"
                  min="0"
                  value={medical}
                  onChange={(e) => setMedical(Number(e.target.value))}
                  className="w-full mt-1 p-1 bg-white border rounded font-mono font-bold"
                />
              </div>
              <div className="p-2 border rounded-lg bg-[#e5eeff]">
                <span className="block text-[10px] text-[#43474e] font-bold">Blankets</span>
                <input
                  type="number"
                  min="0"
                  value={blankets}
                  onChange={(e) => setBlankets(Number(e.target.value))}
                  className="w-full mt-1 p-1 bg-white border rounded font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Field Situation & Dispatch Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 border rounded-lg bg-[#f8f9ff] text-xs"
              placeholder="Describe access conditions, helicopter LZ availability, medical complications..."
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-[#43474e] hover:bg-gray-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1a365d] text-white rounded-lg font-bold hover:bg-[#002045] shadow-sm"
            >
              {initialData ? 'Save Changes' : 'Broadcast via DTN Mesh'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. New Fund Allocation Modal
 * ------------------------------------------------------------- */
interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alloc: Partial<FundAllocation>) => void;
}

export const AllocationModal: React.FC<AllocationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [requestRef, setRequestRef] = useState('REQ-1042');
  const [purpose, setPurpose] = useState('Helicopter Fuel & Life Rafts Deployment');
  const [amount, setAmount] = useState<number>(350000);
  const [recipientOrg, setRecipientOrg] = useState('State Disaster Response Force (SDRF)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      requestRef,
      purpose,
      amount,
      recipientOrg,
      amountFormatted: `₹${amount.toLocaleString('en-IN')}`,
      status: 'Released',
      auditStatus: 'Blockchain Verified',
      blockHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c6cf]">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b51822] text-[24px]">
              account_balance_wallet
            </span>
            <h3 className="text-lg font-bold text-[#002045]">
              Authorize New Relief Allocation
            </h3>
          </div>
          <button onClick={onClose} className="text-[#74777f] hover:text-[#002045]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Target Relief Request Ref
            </label>
            <input
              type="text"
              required
              value={requestRef}
              onChange={(e) => setRequestRef(e.target.value)}
              className="w-full p-2.5 border rounded-lg font-mono font-bold text-sm bg-[#f8f9ff]"
              placeholder="e.g. REQ-1042"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Relief Purpose / Expenditure Item
            </label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-sm bg-[#f8f9ff]"
              placeholder="e.g. Emergency water filtration pods"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Allocation Amount (INR ₹)
            </label>
            <input
              type="number"
              required
              min="1000"
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2.5 border rounded-lg font-mono text-base font-black text-[#002045] bg-[#eff4ff]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Authorized Recipient Agency / NGO
            </label>
            <select
              value={recipientOrg}
              onChange={(e) => setRecipientOrg(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-xs font-semibold bg-[#f8f9ff]"
            >
              <option value="State Disaster Response Force (SDRF)">
                State Disaster Response Force (SDRF)
              </option>
              <option value="Jal Sansthan Emergency Wing">
                Jal Sansthan Emergency Wing
              </option>
              <option value="Border Roads Task Force">
                Border Roads Task Force
              </option>
              <option value="Red Cross Himalayan Division">
                Red Cross Himalayan Division
              </option>
              <option value="Civil Aviation Relief Unit">
                Civil Aviation Relief Unit
              </option>
            </select>
          </div>

          <div className="p-3 bg-[#e5eeff] rounded-xl border border-[#c4c6cf]/60 text-[11px] text-[#43474e]">
            <span className="font-bold text-[#002045] block">
              Cryptographic Enclave:
            </span>
            Transaction will be hashed into the DTN offline ledger and synchronized automatically with State treasury nodes upon network uplink.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-[#43474e] hover:bg-gray-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#b51822] text-white rounded-lg font-bold hover:bg-[#930013] shadow-sm"
            >
              Confirm & Release Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Log Shipment / Inventory Replenishment Modal
 * ------------------------------------------------------------- */
interface LogShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogShipment: (itemKey: string, amount: number) => void;
}

export const LogShipmentModal: React.FC<LogShipmentModalProps> = ({
  isOpen,
  onClose,
  onLogShipment,
}) => {
  const [selectedItem, setSelectedItem] = useState('res-water');
  const [quantity, setQuantity] = useState(1500);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogShipment(selectedItem, Number(quantity));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c6cf]">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1a365d] text-[24px]">
              local_shipping
            </span>
            <h3 className="text-lg font-bold text-[#002045]">
              Log Supply Shipment Inbound
            </h3>
          </div>
          <button onClick={onClose} className="text-[#74777f] hover:text-[#002045]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Select Supply Category
            </label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full p-2.5 border rounded-lg font-bold text-sm bg-[#f8f9ff]"
            >
              <option value="res-water">Drinking Water (Liters)</option>
              <option value="res-food">Food Rations (MREs)</option>
              <option value="res-medical">Emergency Medical Kits</option>
              <option value="res-blankets">Thermal Blankets & Tents</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#0d1c2e] uppercase mb-1">
              Quantity Received at Central Bay
            </label>
            <input
              type="number"
              required
              min="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2.5 border rounded-lg font-mono text-base font-black text-[#002045] bg-[#eff4ff]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-[#43474e] hover:bg-gray-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1a365d] text-white rounded-lg font-bold hover:bg-[#002045] shadow-sm"
            >
              Register Inbound Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. Tactical Map Modal
 * ------------------------------------------------------------- */
interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName?: string;
}

export const TacticalMapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  locationName = 'Uttarakhand Disaster Zone',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-[#c4c6cf] relative">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div>
            <h3 className="text-lg font-bold text-[#002045] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b51822]">
                satellite_alt
              </span>
              Tactical Field Map • {locationName}
            </h3>
            <p className="text-xs text-[#74777f] font-mono">
              30.4128° N, 79.3242° E • Topographic Relief View
            </p>
          </div>
          <button onClick={onClose} className="text-[#74777f] hover:text-[#002045]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Map Visualizer with Pins */}
        <div className="h-96 rounded-xl overflow-hidden relative border border-[#c4c6cf] bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFLAS_M9IXGeJa7sWB37YuZYDO9kf46MoAsS4XZB-zY_-o_iokmFWImlJCiyGn2_sOwKk_GQxiQDgpIyNtb5SmlJ51ywem-mLWnM6x2cUPQ70iO7tb10bR-5b5dwUD1wQXfgmjzTK8muvU6cHt9U_GmEV4zUnuNBg7isivs4IAVTJELsD_G1B8zXqMqSz4mvNgJJW7-SYADe-5uFH32ircGTMEDiRxLajbKeEfbD9XHiQ1kZ91VjzmxQ')` }}>
          {/* Pin 1: Village A */}
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <span className="px-2 py-1 bg-[#b51822] text-white text-[10px] font-bold rounded shadow">
              Village A (Critical)
            </span>
            <span className="material-symbols-outlined text-[#b51822] text-[28px] drop-shadow">
              location_on
            </span>
          </div>

          {/* Pin 2: Base Warehouse */}
          <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
            <span className="px-2 py-1 bg-[#1a365d] text-white text-[10px] font-bold rounded shadow">
              Warehouse A
            </span>
            <span className="material-symbols-outlined text-[#1a365d] text-[28px] drop-shadow">
              home
            </span>
          </div>

          {/* Pin 3: Vehicle Unit 4 */}
          <div className="absolute top-1/2 left-1/2 flex flex-col items-center animate-pulse">
            <span className="px-2 py-1 bg-[#002045] text-[#adc7f7] text-[10px] font-bold rounded shadow">
              TATA-407 (In Transit)
            </span>
            <span className="material-symbols-outlined text-[#002045] text-[28px] drop-shadow">
              local_shipping
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-white/90 p-2.5 rounded-lg border text-[11px] font-mono shadow backdrop-blur">
            <div className="font-bold text-[#002045] mb-1">Legend:</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-red-600" /> Active Relief Request
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-900" /> Supply Hub
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1a365d] text-white rounded-lg font-bold text-xs hover:bg-[#002045]"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. Contact Field Driver Modal
 * ------------------------------------------------------------- */
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
}

export const ContactFieldModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  delivery,
}) => {
  const [callStatus, setCallStatus] = useState<string>('Ready to dispatch voice ping');

  if (!isOpen || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c6cf]">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1a365d] text-[24px]">
              call
            </span>
            <h3 className="text-lg font-bold text-[#002045]">
              Contact Field Operative
            </h3>
          </div>
          <button onClick={onClose} className="text-[#74777f] hover:text-[#002045]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#c4c6cf]/60">
            <div className="text-sm font-bold text-[#0d1c2e] mb-1">
              {delivery.assignedTo}
            </div>
            <div className="font-mono text-xs text-[#43474e]">
              Vehicle: {delivery.vehicle}
            </div>
            <div className="text-xs text-[#74777f] mt-1">
              Destination: {delivery.route.to}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCallStatus('Satellite Radio Link Established (CH-4 SDRF)...')}
              className="p-3 border rounded-xl bg-[#f8f9ff] hover:bg-[#d4e4fc] font-bold text-center flex flex-col items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[#1a365d] text-[22px]">
                radio
              </span>
              <span>Satellite Radio</span>
            </button>
            <button
              onClick={() => setCallStatus('DTN SMS packet queued on nearest drone ferry...')}
              className="p-3 border rounded-xl bg-[#f8f9ff] hover:bg-[#d4e4fc] font-bold text-center flex flex-col items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[#1a365d] text-[22px]">
                chat
              </span>
              <span>DTN Message</span>
            </button>
          </div>

          <div className="p-3 bg-[#f8f9ff] rounded-lg border text-xs font-mono text-[#002045]">
            <strong>Status:</strong> {callStatus}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1a365d] text-white rounded-lg font-bold hover:bg-[#002045]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
