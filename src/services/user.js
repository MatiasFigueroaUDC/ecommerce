import { base_url } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// clase 62900 - 14/01 - Device Features: Location MIN 01:23:13
export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["User", "Location"], 
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        patchImageProfile: builder.mutation({
            query: ({localId, image}) => ({
                url: `users/${localId}.json`,
                method: 'PATCH',
                body: {
                    image: image
                }
            }),
            invalidatesTags: ["User"] // Sirve para que cuando se ejecute el mutation, se recargue la data de la query getUser. Si updateo la BDD redux sabe que tiene que actualizar.
        }),   
        getUser: builder.query({
            query: (localId) => `users/${localId}.json`,
            providesTags: ["User", "Location"] // Sirve para que cuando se ejecute el mutation, se recargue la data de la query getUser
        }),
        patchLocation: builder.mutation({
            query: ({localId, location, address}) => ({
                url: `users/${localId}.json`,
                method: 'PATCH',
                body: {
                    location: location,
                    address: address
                }
            }),
            invalidatesTags: ["Location"]
        }),
    })
})

export const {usePatchImageProfileMutation , useGetUserQuery, usePatchLocationMutation } = userApi