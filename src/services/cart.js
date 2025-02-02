import {base_url} from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

//PROBAR QUE EL LOGIN Y REGISTER FUNCIONEN BIEN - MIRAR lA SEGUNDA MITAD DE LA CLASE 16/01 donde hace unas cosas con el login y navigator
export const cartApi = createApi({
    reducerPath: "cartApi",
    tagTypes: ["addCart", "deleteProduct"],
    baseQuery: fetchBaseQuery({baseUrl:base_url}),
    endpoints: (builder)=> ({
        getCart: builder.query({
            query: ({localId}) => `cart/${localId}.json`,
            transformResponse: (response) => {
                if (!response) return null
                // Convertir a entries y filtrar los valores null que a veces vienen de firebase. Retorna un array de objetos
                const data = Object.entries(response).filter(([_, value]) => value !== null).map(item => ({...item[1],id:item[0]}))
                return data
            },
            providesTags: ["addCart", "deleteProduct"]
        }),
        getProductCart:builder.query({
            query: ({localId, productId}) => `cart/${localId}/${productId}.json`,
            providesTags: ["addCart", "deleteProduct"]
        }),
        updateProductCart: builder.mutation({
            query: ({localId, cartProduct}) => ({
                url: `cart/${localId}/${cartProduct.id}.json`,
                method: 'PATCH',
                body: {
                    quantity: cartProduct.quantity,
                    total: cartProduct.quantity * cartProduct.price
                }
            }),
            invalidatesTags: ["addCart"]
        }),
        postCart: builder.mutation({
            query: ({localId, cartProduct}) => ({
                url: `cart/${localId}/${cartProduct.id}.json`,
                method: 'PUT',
                body: cartProduct
            }),
            invalidatesTags: ["addCart"]
        }),
        deleteCartProduct: builder.mutation({
            query:({localId, productId}) => ({
                url: `cart/${localId}/${productId}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: ["deleteProduct"]
        }),
        deleteCart: builder.mutation({
            query:({localId}) => ({
                url: `cart/${localId}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: ["deleteProduct"]
        })
    })
})

export const { 
    useGetCartQuery, 
    useGetProductCartQuery, 
    usePostCartMutation, 
    useUpdateProductCartMutation,
    useDeleteCartProductMutation, 
    useDeleteCartMutation 
} = cartApi