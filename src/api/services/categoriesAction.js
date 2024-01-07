import { authApiService } from "./authService";

const createCategoryService = authApiService.injectEndpoints({
  endpoints: (build) => ({
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
        console.log(data, "0909090");
        return {
          url: `/category/update/${data.id}`,
          method: "PATCH",
          body: { title: data.title },
        };
      },
    }),

    getCategories: build.query({
      query: () => {
        return {
          url: `/category/getAllCategory`,
          method: "GET",
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
