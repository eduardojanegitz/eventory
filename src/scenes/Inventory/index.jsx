import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { api2 } from "state/api";
import Header from "components/Header";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import ModalStyle from "components/ModalStyle";
import { toast } from "react-toastify";
import GridToolbar from "components/GridToolbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Dropdown from "components/Dropdown";

const Inventory = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [itemsForInventory, setItemsForInventory] = useState([]);
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const [locationSelect, setLocationSelect] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenItemsModal = (row) => {
    setItemsForInventory(row.item);
    setIsItemsModalOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseItemsModal = () => {
    setIsItemsModalOpen(false);
  };
  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);
  };

  const showToastWarning = () => {
    toast.warning("Primeiro selecione uma localização!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    api2
      .get("/api/inventory")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da tabela", error);
        setLoading(false);
      });
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
        const date = new Date(params.row.createdAt);
        return date.toLocaleString("pt-BR");
      },
    },
    {
      field: "location", 
      headerName: "Localização",
      flex: 1
    },
    {
      field: "user",
      headerName: "Responsável",
      flex: 0.5,
    },
    {
      field: "Ação",
      flex: 0.5,
      renderCell: (cellValues) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "5px" }}
            onClick={() => handleOpenItemsModal(cellValues.row)}
          >
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
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
        <ModalStyle
          open={isItemsModalOpen}
          onClose={handleCloseItemsModal}
          width="90%"
        >
          <Typography variant="h6" component="h2" sx={{ mb: "1rem" }}>
            Itens do Inventário
          </Typography>
          <Box
            height="50vh"
            width="100%"
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
                overflowY: "auto",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#b3b0b0",
                  borderRadius: "20px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
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
              rows={itemsForInventory.map((item, index) => ({
                ...item,
                id: index,
              }))}
              columns={[
                { field: "nome", headerName: "Nome", flex: 1 },
                { field: "descricao", headerName: "Descrição", flex: 1 },
                { field: "localizacao", headerName: "Localização", flex: 1 },
                { field: "serial", headerName: "Número de série", flex: 1 },
                { field: "tag", headerName: "Tag", flex: 1 },
              ]}
              pageSize={20}
              pagination
            />
          </Box>
        </ModalStyle>
        <Box>
          <Button
            onClick={handleOpen}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.default,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            NOVO INVENTÁRIO
          </Button>
          <ModalStyle open={open} onClose={handleClose}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: "1rem" }}
            >
              Sala que está realizando o inventário
            </Typography>
              <Dropdown
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
              </Dropdown>

            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              onClick={() => handleNewInventory(selectedLocation)}
            >
              Avançar
            </Button>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </ModalStyle>
        </Box>
      </FlexBetween>
      <DataGridCustomToolbar
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
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
              overflowY: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#b3b0b0",
                borderRadius: "20px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
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
            getRowId={(row) => row._id}
            rows={data.filter((row) =>
              Object.values(row).some(
                (value) =>
                  value &&
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
              )
            )}
            rowsPerOptions={[20, 50, 100]}
            columns={columns}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="client"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Inventory;
