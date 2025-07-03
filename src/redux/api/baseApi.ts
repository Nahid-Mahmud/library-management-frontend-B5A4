import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-backend-b5-a4.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["Books", "BorrowBooks"],
});
