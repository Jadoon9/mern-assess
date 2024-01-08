import { authApiService } from "../authService";

const createCarService = authApiService.injectEndpoints({
  endpoints: (build) => ({
    createCar: build.mutation({
      query: (data) => {
        return {
          url: "/car/add",
          method: "POST",
          body: data,
        };
      },
    }),
    updateCar: build.mutation({
      query: (data) => {
        return {
          url: `/car/update/${data.id}`,
          method: "PATCH",
          body: data.data,
        };
      },
    }),

    getCars: build.query({
      query: (params) => {
        return {
          url: `/car/getAllCars?page=${params.page}`,
          method: "GET",
        };
      },
    }),

    deleteCar: build.mutation({
      query: (id) => {
        return {
          url: `/car/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = createCarService;
export default createCarService;
