import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const api2 = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Costumers",
    "Transactions",
    "Items",
    "Dashboard",
    "Item",
    "Movement",
    "Inventory"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `api/user`,
      providesTags: ["User"],
    }),
    // USUÁRIO SETADO PARA APARECER O NOME
    // getUserById: build.query({
    //   query: (id) => `api/user/${id}`,
    //   providesTags: ["User"],
    // }),
    getItemByTag: build.query({
      query: (tag) => `api/inventory/item/${tag}`,
      providesTags: ["Item"],
    }),
    getItem: build.query({
      query: () => `api/item`,
      providesTags: ["Item"],
    }),
    getCountItem: build.query({
      query: () => `api/item/count`,
      providesTags: ["Item"],
    }),
    getCountItemValue: build.query({
      query: () => `api/item/count-value`,
      providesTags: ["Item"],
    }),
    getMovement: build.query({
      query: () => `api/movement`,
      providesTags: ["Movement"],
    }),
    getProducts: build.query({
      query: () => "client/itens",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/usuarios",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: () => ({
        url: "client/inventarios",
        method: "GET",
        //{ page, pageSize, sort, search }
        // params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getInventory: build.query({
      query: () => ({
        url: "api/inventory",
        method: "GET",
        //{ page, pageSize, sort, search }
        // params: { page, pageSize, sort, search },
      }),
      providesTags: ["Inventory"],
    }),
    getItems: build.query({
      query: () => "items/items",
      providesTags: ["Items"],
    }),
    getNewItems: build.query({
      query: () => "items/newitem",
      providesTags: ["NewItem"],
    }),
    getDashboard: build.query({
      query: () => "api/dashboard",
      providesTags: ["Dashboard"],
    }),
    getTag: build.query({
      query: () => "tags/tags",
      providesTags: ["Tags"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetItemQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetItemsQuery,
  useGetNewItemsQuery,
  useGetDashboardQuery,
  useGetItemByTagQuery,
  useGetCountItemQuery,
  useGetCountItemValueQuery,
  useGetMovementQuery,
  useGetInventoryQuery
} = api;
