import {
  Box,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ContentLoading from "common/LoadingContent";
import Pagination from "common/Pagination";
import React, { useMemo, useState } from "react";
import TransactionCard from "./TransactionCard";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "./TransactionQuery";
import { useEffect } from "react";

interface TransactionItem {
  id: number;
  name: string;
  date: Date;
  status: string;
  type: string;
}

interface filterBy {
  type: string;
  name: string;
  status: string;
}

let PageSize: number = 100;

export default function TransactionIndex(): JSX.Element {
  const transactionQuery = useQuery(GET_TRANSACTIONS);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState<filterBy>({
    type: "",
    name: "",
    status: "",
  });

  const data = transactionQuery.data?.Transactions;

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return transactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, transactions]);

  const groupTransactionByDate = (transactions: TransactionItem[]) =>
    transactions.reduce((group: any, transaction: any) => {
      const { date } = transaction;
      group[date] = group[date] ?? [];
      group[date].push(transaction);
      return group;
    }, {});

  const currentDateGroupedByDate = groupTransactionByDate(currentData) || {};

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFilterBy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    let transactionData: TransactionItem[] = data ?? [];

    // Filter by transaction status, type and Name
    transactionData = transactionData?.filter(
      (val: TransactionItem) =>
        val.status?.toLowerCase().includes(filterBy.status?.toLowerCase()) &&
        val.type?.toLowerCase().includes(filterBy.type?.toLowerCase()) &&
        val.name?.toLowerCase().includes(filterBy.name?.toLowerCase())
    );

    setTransactions(transactionData);
  }, [filterBy, data]);

  return (
    <Container>
      <Container maxWidth="sm">
        <Grid item xs={12} md={4} mt={5}>
          <Box>
            <TextField
              fullWidth
              name="name"
              onChange={handleInputChange}
              value={filterBy.name}
              placeholder="search name"
              data-testid="search-input"
            />
          </Box>
        </Grid>

        <Grid container mt={1} spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="status"
              label="filter By Status"
              onChange={handleInputChange}
              value={filterBy.status}
              select
            >
              {transactionStatus?.map((val, i) => (
                <MenuItem key={i} value={val.value}>
                  {val.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="type"
              label="filter By Type"
              onChange={handleInputChange}
              value={filterBy.type}
              select
            >
              {transactionType?.map((val, i) => (
                <MenuItem key={i} value={val.value}>
                  {val.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Container>

      <ContentLoading
        error={transactionQuery.error}
        loading={transactionQuery.loading}
        onReload={transactionQuery.refetch}
        size={80}
      >
        {Object.keys(currentDateGroupedByDate)?.map(
          (transactionData: string, index: number) => (
            <Box mt={5} key={index}>
              <Typography variant="h5" fontWeight={700}>
                {new Date(transactionData).toUTCString()}
              </Typography>
              <Grid container spacing={1}>
                {currentDateGroupedByDate?.[transactionData]?.map(
                  (transaction: TransactionItem, index: number) => (
                    <Grid key={index} item xs={12} sm={6} md={3}>
                      <TransactionCard
                        date={transaction.date}
                        name={transaction.name}
                        status={transaction.status}
                        type={transaction.type}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          )
        )}
      </ContentLoading>

      <Box justifyContent={"center"} display="flex" mt={3}>
        <Pagination
          currentPage={currentPage}
          totalCount={transactionQuery.data?.Transactions?.length || 0}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </Box>
    </Container>
  );
}

const transactionStatus = [
  { title: "all", value: "" },
  { title: "pending", value: "pending" },
  { title: "success", value: "success" },
  { title: "failed", value: "failed" },
];

const transactionType = [
  { title: "all", value: "" },
  { title: "credit", value: "credit" },
  { title: "debit", value: "debit" },
];
