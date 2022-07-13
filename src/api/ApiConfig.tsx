import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:9002/graphql", // explicitly added the baseURL for easier testing, Environment variable is a much more better option i.e process.env.REACT_APP_API_BASE_URL,
  cache: new InMemoryCache(),
});

export default client;
