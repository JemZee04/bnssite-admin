
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7070/api/v1/bns/'}),
  endpoints: () => ({}),
})