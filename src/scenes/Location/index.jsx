import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { api2 } from "state/api";
import Input from "components/Input";
import ModalStyle from "components/ModalStyle";
import GridToolbar from "components/GridToolbar";
import EditIcon from "@mui/icons-material/Edit";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const Location = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState([]);
  const [editLocation, setEditLocation] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [deleteLocation, setDeleteLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpen = (location = null) => {
    setEditLocation(location);
    setName(location ? location.name : "");
    setDescription(location ? location.description : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSearch = useCallback((searchInput) => {
    setSearch(searchInput);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editLocation && editLocation._id) {
        const response = await api2.put(`api/location/${editLocation._id}`, {
          name,
          description,
        });
        showToastSuccess(
          response.data.msg || "Localização atualizada com sucesso!"
        );
      } else {
        const response = await api2.post("api/location/", {
          name,
          description,
        });
        showToastSuccess(
          response.data.msg || "Localização cadastrada com sucesso!"
        );
      }

      setName("");
      setDescription("");
      setEditLocation(null);
      setOpen(false);
      loadData();
    } catch (error) {
      showToastError(
        error.response?.data?.error ||
          "Erro desconhecido. Entre em contato com o time de TI."
      );
    }
  };

  const loadData = async () => {
    try {
      const response = await api2.get("api/location");
      setLocation(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function handleDeleteClick() {
    try {
      const response = await api2.delete(`api/location/${deleteLocation._id}`);
      if (response.status === 200) {
        loadData();
        showToastSuccess(
          response.data.msg || "Localização deletada com sucesso!"
        );
      } else {
        showToastError(response.data?.error || "Erro ao excluir o item.");
      }
    } catch (error) {
      showToastError(
        error.response?.data?.error ||
          "Erro desconhecido. Entre em contato com o time de TI."
      );
      console.error("Erro ao excluir o item:", error);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Localização",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "Ação",
      flex: 0.3,
      renderCell: (cellValues) => (
        <>
          <Button
            variant="text"
            color="secondary"
            onClick={() => handleOpen(cellValues.row)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              setConfirmationModalOpen(true);
              setDeleteLocation(cellValues.row);
            }}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="LOCALIZAÇÃO"
          subtitle="Veja a lista das localização dos ativos."
        />
        <ModalStyle
          open={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
        >
          <Typography sx={{ mb: "30px" }}>
            Tem certeza de que deseja excluir esta localização?
          </Typography>
          <FlexBetween>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleDeleteClick();
                setConfirmationModalOpen(false);
              }}
            >
              Confirmar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmationModalOpen(false)}
            >
              Cancelar
            </Button>
          </FlexBetween>
        </ModalStyle>
        <Box>
          <Button
            onClick={handleOpen}
            startIcon={<AddLocationAltIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
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
            Nova Localização
          </Button>
          <ModalStyle open={open} onClose={handleClose}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {editLocation && editLocation._id
                ? "Editar localização"
                : "Nova localização"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} className="form">
                <Input
                  type="text"
                  label="Nome da localização"
                  value={name}
                  onChange={handleName}
                />
                <Input
                  type="text"
                  label="Descrição"
                  value={description}
                  onChange={handleDescription}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  {editLocation && editLocation._id ? "Atualizar" : "Cadastrar"}
                </Button>
              </form>
            </Typography>
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
            rows={location.filter((row) =>
              Object.values(row).some(
                (value) =>
                  value &&
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
              )
            )}
            rowsPerPageOptions={[20, 50, 100]}
            columns={columns}
            pagination
            paginationMode="client"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Location;
