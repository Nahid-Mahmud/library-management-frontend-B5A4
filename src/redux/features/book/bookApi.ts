import { baseApi } from "@/redux/api/baseApi";

const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    getAllBooks: builder.query({
      query: ({ page = 1, limit = 0 }: { page: number; limit: number }) => ({
        url: "/books",
        params: { page, limit },
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    getGenre: builder.query({
      query: () => ({
        url: "/books/genres",
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetGenreQuery,
} = booksApi;
