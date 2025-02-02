import { api_key, auth_base_url } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({ baseUrl: auth_base_url }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password,
                    returnSecureToken: true
                }
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: 'POST',
                body: {
                    email: credentials.email,
                    password: credentials.password,
                    returnSecureToken: true
                }
            })
        })
    })
})

export const { useSignupMutation, useLoginMutation } = authApi