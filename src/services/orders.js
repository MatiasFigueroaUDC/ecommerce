import { base_url } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    tagTypes: ["newOrder"],
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ({localId}) => `orders/${localId}.json`,
            transformResponse: (response) => {
                if (!response) return null
                // Convertir a entries y filtrar los valores null que a veces vienen de firebase. Retorna un array de objetos
                const data = Object.entries(response).filter(([_, value]) => value !== null).map(item => ({...item[1],id:item[0]}))
                return data
            },
            providesTags: ["newOrder"]
        }),
        postOrder: builder.mutation({
            query: ({order, localId}) => ({
                url: `orders/${localId}.json`,
                method:"POST",
                body: order
            }),
            invalidatesTags:["newOrder"]
        })
    })
})

export const { usePostOrderMutation, useGetOrdersQuery } = ordersApi