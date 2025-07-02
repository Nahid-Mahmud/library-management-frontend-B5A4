import { baseApi } from "@/redux/api/baseApi";

const borrowBooksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow-books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BorrowBooks", "Books"],
    }),
    borrowBooksSummary: builder.query({
      query: () => ({
        url: "/borrow-books/summary",
        method: "GET",
      }),
      providesTags: ["BorrowBooks"],
    }),
  }),
});

export const { useBorrowBookMutation, useBorrowBooksSummaryQuery } = borrowBooksApi;
