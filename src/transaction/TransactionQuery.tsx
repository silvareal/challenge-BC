import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    Transactions {
      id
      name
      status
      type
      date
    }
  }
`;
