// Transactions

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { api2, useGetInventoryQuery } from "state/api";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalStyle from "components/ModalStyle";
import { toast } from "react-toastify";

const Transactions = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const [location, setLocation] = useState("");
  const [locationSelect, setLocationSelect] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  // const { data, isLoading } = useGetInventoryQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const showToastWarning = () => {
    toast.warning("Primeiro selecione uma localização!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    api2.get("/api/inventory").then((response) => setData(response.data));
  }, []);

  useEffect(() => {
    api2
      .get("api/location")
      .then((response) => setLocationSelect(response.data));
  }, []);

  const columns = [
    {
      field: "inventoryCode",
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
        return date.toLocaleString("pt-BR");
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

  const handleNewInventory = (location) => {
    if (location) {
      navigate(`/tags?location=${location}`);
    } else {
      showToastWarning();
    }
  };

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
            <ModalStyle
             open={open}
             onClose={handleClose}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: "1rem" }}
              >
                Sala que está realizando o inventário
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel htmlFor="location-select">
                  Selecione a localização
                </InputLabel>
                <Select
                  // variant="solid"
                  sx={{
                    width: "25rem",
                    mb: "1rem",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  label="Selecione a localização"
                  id="location-select"
                >
                  {locationSelect.map((location) => (
                    <MenuItem key={location._id} value={location.name}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNewInventory(selectedLocation)}
              >
                <AddIcon sx={{ mr: "10px" }} />
                Novo inventário
              </Button>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              ></Typography>
            </ModalStyle>
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
          // loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          // rowCount={(data && data[80].item) || 0}
          pagination
          // page={page}
          // pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
