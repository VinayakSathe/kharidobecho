// import { baseApi } from "./baseApi";

// export const laptopApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // =============================
//     // 1. ADD LAPTOP (POST)
//     // Backend: POST /api/laptops/create
//     // =============================
//     addLaptop: builder.mutation({
//       query: (body) => ({
//         url: "/api/laptops/create",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Laptops"],
//     }),

//     // =============================
//     // 2. UPLOAD LAPTOP PHOTO (POST)
//     // Backend: POST /api/photo/upload?laptopid={id}
//     // =============================
//     uploadLaptopPhoto: builder.mutation({
//       query: ({ id, body }) => ({
//         url: `/api/photo/upload?laptopid=${id}`,
//         method: "POST",
//         body, // MUST be FormData
//       }),
//       invalidatesTags: ["LaptopPhotos"],
//     }),
//   }),

//   overrideExisting: false,
// });

// export const { useAddLaptopMutation, useUploadLaptopPhotoMutation } = laptopApi;
import { baseApi } from "./baseApi";

export const laptopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ========================================
    // ADD LAPTOP
    // POST /api/laptops/create
    // ========================================
    addLaptop: builder.mutation({
      query: (body) => ({
        url: "/api/laptops/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Laptops"],
    }),

    // ========================================
    // UPLOAD LAPTOP PHOTO
    // POST /api/laptop-photo/upload
    // Body: FormData(files, laptopId)
    // ========================================
    uploadLaptopPhoto: builder.mutation({
      query: ({ body }) => ({
        url: "/api/laptop-photo/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LaptopPhotos"],
    }),
  }),

  overrideExisting: false,
});

export const { useAddLaptopMutation, useUploadLaptopPhotoMutation } = laptopApi;
