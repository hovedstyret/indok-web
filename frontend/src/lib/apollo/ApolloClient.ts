import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { cookies } from "next/headers";

import { config } from "@/utils/config";

/**
 * Get an Apollo Client to be used for RSC
 */
export const { getClient } = registerApolloClient(() => {
  const cookieStore = cookies();
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      uri: config.GRAPHQL_ENDPOINT,
      fetchOptions: { cache: "no-store" },
    }),
  });
});
