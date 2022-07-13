import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import TransactionIndex from "transaction/TransactionIndex";
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

const searchTransaction = (transactions: string) => {
  const inputElement = screen.getByPlaceholderText(/search name/i);
  fireEvent.change(inputElement, { target: { value: transactions } });
};

const MockTransaction = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <TransactionIndex />
  </MockedProvider>
);

describe("Transactions", () => {
  it("Renders Transaction without error", async () => {
    render(<MockTransaction />);
  });

  it("Should fetch and render transaction item", async () => {
    render(<MockTransaction />);

    const transactionElement = await screen.findByTestId(`transaction-item-0`);
    expect(transactionElement).toBeInTheDocument();
  });

  it("should be able to type into input and search by name", async () => {
    render(<MockTransaction />);

    const divElement = await screen.findByText(/Winifred/i);
    searchTransaction("Winifred");
    expect(divElement).toBeInTheDocument();
  });
});
