import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT = "2309-FSA-ET-WEB-FT-SF"
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT}`

// Central API slice from solution code
const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default api;