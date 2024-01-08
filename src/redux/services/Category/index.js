import { authApiService } from "../authService";

const createCategoryService = authApiService.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (data) => {
        let url = `/category/getAllCategory?page=${data?.page}`;
        if (data?.limit) {
          url += `&limit=${data?.limit}`;
        }
        return {
          url,
          method: "GET",
        };
      },
    }),
    createCategory: build.mutation({
      query: (data) => {
        return {
          url: "/category/add",
          method: "POST",
          body: data,
        };
      },
    }),
    updateCategory: build.mutation({
      query: (data) => {
        return {
          url: `/category/update/${data.id}`,
          method: "PATCH",
          body: { title: data.title },
        };
      },
    }),
    deleteCategories: build.mutation({
      query: (id) => {
        return {
          url: `/category/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoriesMutation,
} = createCategoryService;
export default createCategoryService;
