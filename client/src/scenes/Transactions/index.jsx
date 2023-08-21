import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const Transactions = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    // {
    //   field: "userId",
    //   headerName: "ID do usuário",
    //   flex: 1,
    // },
    {
      field: "item",
      headerName: "Nome do item",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Data do inventário",
      flex: 1,
    },
    {
      field: "responsable",
      headerName: "Responsável",
      flex: 0.5,
      // sortable: false,
      // renderCell: (params) => params.value.length,
    },
    // {
    //   field: "cost",
    //   headerName: "Custo",
    //   flex: 1,
    //   renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    // },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="INVENTÁRIOS"
          subtitle="Veja a lista de inventários realizados"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Link to="/tags" className="btn-new">
              <AddIcon sx={{ mr: "10px" }} />
              Novo inventário
            </Link>
          </Button>
        </Box>
      </FlexBetween>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-FooterContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.response) || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
