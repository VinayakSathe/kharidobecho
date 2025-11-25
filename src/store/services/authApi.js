// import { baseApi } from "./baseApi";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Login API
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/jwt/login",
//         method: "POST",
//         body: credentials,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     // Register API
//     register: builder.mutation({
//       query: (userData) => ({
//         url: "/api/v1/users/register",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     // Fetch Buyer Info
//     getBuyerInfo: builder.query({
//       query: (userId) => ({
//         url: `/buyers/${userId}`,
//         method: "GET",
//       }),
//       providesTags: ["UserInfo"],
//     }),

//     // Fetch Seller Info
//     getSellerInfo: builder.query({
//       query: (userId) => ({
//         url: `/sellers/${userId}`,
//         method: "GET",
//       }),
//       providesTags: ["UserInfo"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useLoginMutation,
//   useRegisterMutation,

//   // ❌ These cause INVALID HOOK CALL inside submit
//   useGetBuyerInfoQuery,
//   useGetSellerInfoQuery,

//   // ✅ These are for calling API INSIDE handleSubmit
//   useLazyGetBuyerInfoQuery,
//   useLazyGetSellerInfoQuery,
// } = authApi;

import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================
    // LOGIN
    // ============================
    login: builder.mutation({
      query: (credentials) => ({
        url: "/jwt/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ============================
    // REGISTER
    // ============================
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ============================
    // GET BUYER INFO
    // Backend route: /api/v1/buyers/{userId}
    // ============================
    getBuyerInfo: builder.query({
      query: (userId) => ({
        url: `/api/v1/buyers/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),

    // ============================
    // GET SELLER INFO
    // Backend route: /api/v1/sellers/{userId}
    // ============================
    getSellerInfo: builder.query({
      query: (userId) => ({
        url: `/api/v1/sellers/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserInfo"],
    }),
  }),

  overrideExisting: false,
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,

  // Normal queries (won’t be used inside submit)
  useGetBuyerInfoQuery,
  useGetSellerInfoQuery,

  // Lazy versions (recommended for login)
  useLazyGetBuyerInfoQuery,
  useLazyGetSellerInfoQuery,
} = authApi;
