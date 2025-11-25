// import { useState } from "react";
// import { toast } from "react-toastify";

// import {
//   useAddLaptopMutation,
//   useUploadLaptopPhotoMutation,
// } from "../store/services/laptopApi";

// export default function SellLaptopForm() {
//   const [addLaptop, { isLoading: addLoading }] = useAddLaptopMutation();
//   const [uploadPhoto, { isLoading: photoLoading }] =
//     useUploadLaptopPhotoMutation();

//   // Get sellerId from login
//   const sellerId = Number(localStorage.getItem("sellerId"));

//   const [formData, setFormData] = useState({
//     serialNumber: "",
//     dealer: "",
//     model: "",
//     brand: "",
//     price: "",
//     warrantyInYear: 1,
//     processor: "",
//     processorBrand: "",
//     memoryType: "",
//     screenSize: "",
//     colour: "",
//     ram: "",
//     storage: "",
//     battery: "",
//     batteryLife: "",
//     graphicsCard: "",
//     graphicBrand: "",
//     weight: "",
//     manufacturer: "",
//     usbPorts: "",
//     status: "ACTIVE",
//   });

//   const [photoFile, setPhotoFile] = useState(null);
//   const [createdLaptopId, setCreatedLaptopId] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLaptopSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId) {
//       toast.error("Seller ID missing. Please login again.");
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         price: Number(formData.price),
//         usbPorts: Number(formData.usbPorts),
//         warrantyInYear: Number(formData.warrantyInYear),

//         // Backend expects sellerId, not seller object
//         sellerId: sellerId,
//       };

//       console.log("PAYLOAD SENT:", payload);

//       const res = await addLaptop(payload).unwrap();

//       toast.success(res.message || "Laptop created successfully!");

//       const newId =
//         res?.data?.id ||
//         res?.id ||
//         res?.laptopId ||
//         res?.message?.match(/id (\d+)/)?.[1];

//       setCreatedLaptopId(newId);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add laptop");
//     }
//   };

//   const handlePhotoUpload = async () => {
//     if (!photoFile) return toast.error("Select a photo first");
//     if (!createdLaptopId) return toast.error("Create laptop first");

//     const form = new FormData();
//     form.append("files", photoFile);
//     form.append("laptopId", createdLaptopId); // backend expects laptopId

//     try {
//       const res = await uploadPhoto({
//         body: form,
//       }).unwrap();

//       toast.success(res.message || "Photo uploaded!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Photo upload failed");
//     }
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Add Laptop</h1>

//       <form
//         onSubmit={handleLaptopSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {Object.keys(formData).map((key) =>
//           key !== "status" ? (
//             <div key={key} className="flex flex-col">
//               <label className="font-semibold mb-1 capitalize">{key}</label>
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </div>
//           ) : null
//         )}

//         <button
//           type="submit"
//           disabled={addLoading}
//           className="col-span-2 bg-blue-600 text-white py-3 rounded mt-4"
//         >
//           {addLoading ? "Creating..." : "Create Laptop"}
//         </button>
//       </form>

//       {createdLaptopId && (
//         <div className="mt-10 border-t pt-6">
//           <h2 className="text-xl font-bold mb-4">
//             Upload Laptop Photo (ID: {createdLaptopId})
//           </h2>

//           <input
//             type="file"
//             onChange={(e) => setPhotoFile(e.target.files[0])}
//             className="mb-4"
//           />

//           <button
//             onClick={handlePhotoUpload}
//             disabled={photoLoading}
//             className="bg-green-600 text-white py-2 px-6 rounded"
//           >
//             {photoLoading ? "Uploading..." : "Upload Photo"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddLaptopMutation,
  useUploadLaptopPhotoMutation,
} from "../store/services/laptopApi";

export default function SellLaptopForm() {
  const [addLaptop, { isLoading: addLoading }] = useAddLaptopMutation();
  const [uploadPhoto, { isLoading: photoLoading }] =
    useUploadLaptopPhotoMutation();

  // Get seller ID from login
  const sellerId = Number(localStorage.getItem("sellerId"));

  const [formData, setFormData] = useState({
    serialNumber: "",
    dealer: "",
    model: "",
    brand: "",
    price: "",
    warrantyInYear: 1,
    processor: "",
    processorBrand: "",
    memoryType: "",
    screenSize: "",
    colour: "",
    ram: "",
    storage: "",
    battery: "",
    batteryLife: "",
    graphicsCard: "",
    graphicBrand: "",
    weight: "",
    manufacturer: "",
    usbPorts: "",
    status: "ACTIVE",
  });

  const [photoFiles, setPhotoFiles] = useState([]);
  const [createdLaptopId, setCreatedLaptopId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ============================
  //   ADD LAPTOP
  // ============================
  const handleLaptopSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      toast.error("Seller ID missing. Please login again.");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        usbPorts: Number(formData.usbPorts),
        warrantyInYear: Number(formData.warrantyInYear),
        sellerId: sellerId, // backend expects sellerId
      };

      console.log("PAYLOAD SENT:", payload);

      const res = await addLaptop(payload).unwrap();
      toast.success(res.message || "Laptop created successfully!");

      const newId =
        res?.data?.id ||
        res?.id ||
        res?.laptopId ||
        res?.message?.match(/id (\d+)/)?.[1];

      setCreatedLaptopId(newId);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to add laptop");
    }
  };

  // ============================
  //   MULTIPLE PHOTO UPLOAD
  // ============================
  const handlePhotoUpload = async () => {
    if (photoFiles.length === 0)
      return toast.error("Select at least one photo");

    if (!createdLaptopId) return toast.error("Create laptop first");

    try {
      for (let file of photoFiles) {
        const form = new FormData();
        form.append("files", file);
        form.append("laptopId", createdLaptopId);

        await uploadPhoto({ body: form }).unwrap();
      }

      toast.success("All photos uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Photo upload failed");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Laptop</h1>

      {/* ADD LAPTOP FORM */}
      <form
        onSubmit={handleLaptopSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(formData).map((key) =>
          key !== "status" ? (
            <div key={key} className="flex flex-col">
              <label className="font-semibold mb-1 capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
          ) : null
        )}

        <button
          type="submit"
          disabled={addLoading}
          className="col-span-2 bg-blue-600 text-white py-3 rounded mt-4"
        >
          {addLoading ? "Creating..." : "Create Laptop"}
        </button>
      </form>

      {/* MULTIPLE PHOTO UPLOAD */}
      {createdLaptopId && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">
            Upload Laptop Photos (ID: {createdLaptopId})
          </h2>

          <input
            type="file"
            multiple
            onChange={(e) => setPhotoFiles([...e.target.files])}
            className="mb-4"
          />

          {/* PREVIEW */}
          {photoFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {photoFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded shadow"
                />
              ))}
            </div>
          )}

          <button
            onClick={handlePhotoUpload}
            disabled={photoLoading}
            className="bg-green-600 text-white py-2 px-6 rounded"
          >
            {photoLoading ? "Uploading..." : "Upload Photos"}
          </button>
        </div>
      )}
    </div>
  );
}
