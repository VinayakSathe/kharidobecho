// import React from 'react';

// export default function DashboardStats({ listings }) {
//   const total = listings.length;
//   const active = listings.filter(l => l.status === 'Active').length;
//   const sold = listings.filter(l => l.status === 'Sold').length;
//   const pending = listings.filter(l => l.status === 'Pending').length;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm font-medium text-gray-500">Total Listings</p>
//         <p className="text-2xl font-semibold">{total}</p>
//       </div>
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm font-medium text-gray-500">Active Listings</p>
//         <p className="text-2xl font-semibold">{active}</p>
//       </div>
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm font-medium text-gray-500">Sold Listings</p>
//         <p className="text-2xl font-semibold">{sold}</p>
//       </div>
//       <div className="p-4 bg-white rounded shadow">
//         <p className="text-sm font-medium text-gray-500">Pending Listings</p>
//         <p className="text-2xl font-semibold">{pending}</p>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   getLaptopsByStatus,
//   getLaptopById,
//   updateLaptop,
//   deleteLaptop,
// } from "../store/services/laptopServices";

// export default function UserDashboard() {
//   const sellerId = Number(localStorage.getItem("sellerId"));
//   const [active, setActive] = useState([]);
//   const [pending, setPending] = useState([]);
//   const [sold, setSold] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedLaptop, setSelectedLaptop] = useState(null);
//   const [editData, setEditData] = useState(null);

//   // ==============================
//   // LOAD LISTINGS BY STATUS
//   // ==============================
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const activeList = await getLaptopsByStatus(sellerId, "ACTIVE");
//       const pendingList = await getLaptopsByStatus(sellerId, "PENDING");
//       const soldList = await getLaptopsByStatus(sellerId, "SOLD");

//       setActive(activeList);
//       setPending(pendingList);
//       setSold(soldList);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load listings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // =============================
//   // VIEW + EDIT LAPTOP
//   // =============================
//   const handleEdit = async (id) => {
//     try {
//       const data = await getLaptopById(id);
//       setSelectedLaptop(data);
//       setEditData(data);
//     } catch (err) {
//       toast.error("Unable to load laptop details");
//     }
//   };

//   // =============================
//   // UPDATE LAPTOP
//   // =============================
//   const saveChanges = async () => {
//     try {
//       await updateLaptop(editData.id, editData);
//       toast.success("Laptop updated successfully!");
//       setSelectedLaptop(null);
//       loadData();
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   // =============================
//   // DELETE LAPTOP
//   // =============================
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this laptop?")) return;

//     try {
//       await deleteLaptop(id);
//       toast.success("Laptop deleted");
//       loadData();
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   const total = active.length + pending.length + sold.length;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//         <StatCard title="Total Listings" value={total} />
//         <StatCard title="Active" value={active.length} />
//         <StatCard title="Pending" value={pending.length} />
//         <StatCard title="Sold" value={sold.length} />
//       </div>

//       {/* ACTIVE LISTINGS */}
//       <ListingSection
//         title="Active Listings"
//         items={active}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* PENDING LISTINGS */}
//       <ListingSection
//         title="Pending Listings"
//         items={pending}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* SOLD LISTINGS */}
//       <ListingSection
//         title="Sold Listings"
//         items={sold}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* EDIT MODAL */}
//       {selectedLaptop && (
//         <EditModal
//           data={editData}
//           setData={setEditData}
//           onClose={() => setSelectedLaptop(null)}
//           onSave={saveChanges}
//         />
//       )}
//     </div>
//   );
// }

// // ================== COMPONENTS ==================

// function StatCard({ title, value }) {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-semibold">{value}</p>
//     </div>
//   );
// }

// function ListingSection({ title, items, onEdit, onDelete }) {
//   return (
//     <div className="mb-10">
//       <h2 className="text-xl font-semibold mb-3">{title}</h2>
//       {items.length === 0 ? (
//         <p className="text-gray-500">No items found.</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Model</th>
//               <th className="p-3 text-left">Brand</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((l) => (
//               <tr key={l.id} className="border-b">
//                 <td className="p-3">{l.model}</td>
//                 <td className="p-3">{l.brand}</td>
//                 <td className="p-3">₹{l.price}</td>
//                 <td className="p-3 flex gap-3">
//                   <button
//                     onClick={() => onEdit(l.id)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => onDelete(l.id)}
//                     className="px-3 py-1 bg-red-600 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// function EditModal({ data, setData, onClose, onSave }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
//       <div className="bg-white p-6 rounded w-full max-w-2xl shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Edit Laptop</h2>

//         <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
//           {Object.keys(data).map((key) =>
//             typeof data[key] !== "object" && key !== "deletedAt" ? (
//               <div key={key} className="flex flex-col">
//                 <label className="capitalize text-sm">{key}</label>
//                 <input
//                   className="border p-2 rounded"
//                   value={data[key]}
//                   onChange={(e) => setData({ ...data, [key]: e.target.value })}
//                 />
//               </div>
//             ) : null
//           )}
//         </div>

//         <div className="flex justify-end mt-5 gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-400 text-white rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getLaptopsByStatus,
  getLaptopById,
  updateLaptop,
  deleteLaptop,
} from "../store/services/laptopServices";

export default function UserDashboard() {
  const sellerId = Number(localStorage.getItem("sellerId"));

  const [active, setActive] = useState([]);
  const [pending, setPending] = useState([]);
  const [sold, setSold] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [editData, setEditData] = useState(null);

  // ------------------------------
  // Load Data on Page Load
  // ------------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const activeList = await getLaptopsByStatus(sellerId, "ACTIVE");
      const pendingList = await getLaptopsByStatus(sellerId, "PENDING");
      const soldList = await getLaptopsByStatus(sellerId, "SOLD");

      setActive(activeList);
      setPending(pendingList);
      setSold(soldList);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ------------------------------
  // Open Edit Modal
  // ------------------------------
  const handleEdit = async (id) => {
    try {
      const data = await getLaptopById(id);
      setSelectedLaptop(data);
      setEditData(data);
    } catch (err) {
      toast.error("Unable to load laptop details");
    }
  };

  // ------------------------------
  // SAVE UPDATED LAPTOP
  // ------------------------------
  const saveChanges = async () => {
    try {
      const allowedFields = [
        "serialNumber",
        "dealer",
        "model",
        "brand",
        "price",
        "warrantyInYear",
        "processor",
        "processorBrand",
        "memoryType",
        "screenSize",
        "colour",
        "ram",
        "storage",
        "battery",
        "batteryLife",
        "graphicsCard",
        "graphicBrand",
        "weight",
        "manufacturer",
        "usbPorts",
        "status",
        "sellerId",
      ];

      const payload = {};
      allowedFields.forEach((key) => {
        if (editData[key] !== undefined) {
          payload[key] = editData[key];
        }
      });

      payload.sellerId = sellerId;

      await updateLaptop(editData.id, payload);

      toast.success("Laptop updated successfully!");
      setSelectedLaptop(null);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // ------------------------------
  // DELETE LAPTOP
  // ------------------------------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this laptop?")) return;

    try {
      await deleteLaptop(id);
      toast.success("Laptop deleted");
      loadData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const total = active.length + pending.length + sold.length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Listings" value={total} />
        <StatCard title="Active" value={active.length} />
        <StatCard title="Pending" value={pending.length} />
        <StatCard title="Sold" value={sold.length} />
      </div>

      <ListingSection
        title="Active Listings"
        items={active}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ListingSection
        title="Pending Listings"
        items={pending}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ListingSection
        title="Sold Listings"
        items={sold}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedLaptop && (
        <EditModal
          data={editData}
          setData={setEditData}
          onClose={() => setSelectedLaptop(null)}
          onSave={saveChanges}
        />
      )}
    </div>
  );
}

// ------------------ UI COMPONENTS ------------------

function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ListingSection({ title, items, onEdit, onDelete }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="p-3">{l.model}</td>
                <td className="p-3">{l.brand}</td>
                <td className="p-3">₹{l.price}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => onEdit(l.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(l.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function EditModal({ data, setData, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded w-full max-w-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Laptop</h2>

        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {Object.keys(data).map(
            (key) =>
              typeof data[key] !== "object" &&
              key !== "deletedAt" &&
              key !== "id" && (
                <div key={key} className="flex flex-col">
                  <label className="capitalize text-sm">{key}</label>
                  <input
                    className="border p-2 rounded"
                    value={data[key]}
                    onChange={(e) =>
                      setData({ ...data, [key]: e.target.value })
                    }
                  />
                </div>
              )
          )}
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
