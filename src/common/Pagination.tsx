import React from "react";
import usePagination from "hooks/usePaginate";
import { DOTS } from "common/utils";
import { Box, Icon, IconButton, Typography } from "@mui/material";

interface PaginationProps {
  onPageChange: (id: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Box display={"flex"} alignItems={"center"}>
      {/* Left navigation arrow */}
      <IconButton disabled={currentPage === 1} onClick={onPrevious}>
        <Icon>chevron_left</Icon>
      </IconButton>
      {paginationRange?.map((pageNumber: any) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <div>&#8230;</div>;
        }
        // Render our Page Pills
        return (
          <IconButton
            aria-selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            <Typography>{pageNumber}</Typography>
          </IconButton>
        );
      })}

      {/*  Right Navigation arrow */}
      <IconButton disabled={currentPage === lastPage} onClick={onNext}>
        <Icon>chevron_right</Icon>
      </IconButton>
    </Box>
  );
};

export default Pagination;
