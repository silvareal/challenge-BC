import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { GET_TRANSACTIONS } from "transaction/TransactionQuery";

const mocks = [
  {
    request: {
      query: GET_TRANSACTIONS,
      variables: {},
    },

    result: {
      data: {
        Transactions: [
          {
            id: "NjA5Mzg3NDEzMw==",
            name: "Winifred",
            status: "pending",
            type: "debit",
            date: "2017-07-27",
          },
          {
            id: "MTMyNjM1MjU1MQ==",
            name: "Aida",
            status: "failed",
            type: "debit",
            date: "2017-09-27",
          },
        ],
      },
    },
  },
];

const MockApp = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <App />
  </MockedProvider>
);

test("renders App", () => {
  render(<MockApp />);
});
