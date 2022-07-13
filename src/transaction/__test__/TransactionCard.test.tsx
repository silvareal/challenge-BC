import { render, screen } from "@testing-library/react";
import "transaction/TransactionCard";
import TransactionCard from "transaction/TransactionCard";

describe("Transaction Card", () => {
  test("Should render transaction card items", async () => {
    render(
      <TransactionCard
        date={new Date("2022-05-27")}
        name="transaction1"
        status="failed"
        type="credit"
      />
    );

    const dateElement = screen.getByText(
      `${new Date("2022-05-27").toUTCString()}`
    );
    const nameElement = screen.getByText(/transaction1/i);
    const statusElement = screen.getByText(/failed/i);
    const typeElement = screen.getByText(/credit/i);

    expect(dateElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
  });
});
