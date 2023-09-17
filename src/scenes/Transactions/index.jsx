// Transactions

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetInventoryQuery } from "state/api";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "components/Input";
import ModalStyle from "components/ModalStyle";

const Transactions = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetInventoryQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const columns = [
    {
      field: "_id",
      headerName: "Número do inventário",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Data do inventário",
      flex: 1,
      valueGetter: (params) => {
        // Formate a data para o formato brasileiro (dd/mm/yyyy)
        const date = new Date(params.row.createdAt);
        return date.toLocaleDateString('pt-BR');
      },
    },
    {
      field: "user",
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
  const handleLocation = (e) => setLocation(e.target.value);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="INVENTÁRIOS"
          subtitle="Veja a lista de inventários realizados"
        />
        <Box>
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.default,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "background-color 0.3s ease, color 0.3s ease", // Adiciona uma transição suave
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Define a cor quando o mouse passa por cima
                color: theme.palette.primary.main,
              },
            }}
          >
            NOVO INVENTÁRIO
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalStyle>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sala que está realizando o inventário
              </Typography>
              <Input
                type="text"
                value={location}
                onChange={handleLocation}
                readOnly={false}
              />
              <Button variant="contained" color="secondary">
                <Link to={`/tags?location=${location}`}>
                  <AddIcon sx={{ mr: "10px" }} />
                  Novo inventário
                </Link>
              </Button>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </ModalStyle>
          </Modal>
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
          rows={data || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          // rowCount={(data && data[80].item) || 0}
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
