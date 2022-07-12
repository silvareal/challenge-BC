import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { Box } from "@mui/system";

interface CardProps {
  date: Date;
  name: string;
  status: string;
  type: string;
}

const TransactionCard: React.FC<CardProps> = ({ date, name, status, type }) => {
  const toDate = new Date(date);

  return (
    <Card variant="outlined">
      <CardActionArea sx={{ padding: 2 }}>
        <div>
          <Typography data-testid="date">{toDate.toUTCString()}</Typography>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Box mt={1}>
            Type: <Chip label={type} size="small" /> - Status:{" "}
            <Chip label={status} size="small" />
          </Box>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default TransactionCard;
