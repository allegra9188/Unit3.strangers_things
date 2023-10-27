import api from "../../store/api";

const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => `/posts`,
            transformResponse: (response) => response.data.posts,
            // auto update, no need to refresh
            providesTags: ["Posts"],
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: `/posts`,
                method: "POST",
                body: { post },
            }),
            // auto update, no need to refresh
            invalidatesTags: ["Posts"]
        }),
    }),
});

export const { useGetPostsQuery } = postsApi;
export const { useGetPostsQuery, useCreatePostMutation } = postsApi;