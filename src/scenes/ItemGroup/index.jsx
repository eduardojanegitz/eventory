import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, CircularProgress, MenuItem, Typography, useTheme } from "@mui/material";
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
import LayersIcon from '@mui/icons-material/Layers';
import Dropdown from "components/Dropdown";

const ItemGroup = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");
  const [itemGroup, setItemGroup] = useState([]);
  const [depreciation, setDepreciation] = useState([])
  const [editItemGroup, setEditItemGroup] = useState(null);
  const [deleteItemGroup, setDeleteItemGroup] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = (itemGroup = null) => {
    setEditItemGroup(itemGroup);
    setName(itemGroup ? itemGroup.name : "");
    setDescription(itemGroup ? itemGroup.description : "");
    setActive(itemGroup ? itemGroup.active : "");
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
  const handleActive = (e) => {
    setActive(e.target.value);
  };
  const handleDepreciation = (e) => {
    setDepreciation(e.target.value)
  }
  const handleSearch = useCallback((searchInput) => {
    setSearch(searchInput);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editItemGroup && editItemGroup._id) {
        const response = await api2.put(`api/item-group/${editItemGroup._id}`, {
          name,
          description,
          active,
          depreciation
        });
        showToastSuccess(
          response.data.msg || "Grupo de itens atualizada com sucesso!"
        );
      } else {
        const response = await api2.post("api/item-group", {
          name,
          description,
          active,
          depreciation
        });
        showToastSuccess(
          response.data.msg || "Grupo de itens cadastrada com sucesso!"
        );
      }

      setName("");
      setDescription("");
      setActive("")
      setDepreciation("")
      setEditItemGroup(null);
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
      const response = await api2.get("api/item-group");
      setItemGroup(response.data);
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
      const response = await api2.delete(`api/item-group/${deleteItemGroup._id}`);
      if (response.status === 200) {
        loadData();
        showToastSuccess(
          response.data.msg || "Grupo de itens deletado com sucesso!"
        );
      } else {
        showToastError(response.data?.error || "Erro ao excluir o grupo de itens.");
      }
    } catch (error) {
      showToastError(
        error.response?.data?.error ||
          "Erro desconhecido. Entre em contato com o time de TI."
      );
      console.error("Erro ao excluir o grupo de itens:", error);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Grupo de itens",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "depreciation",
      headerName: "Taxa de depreciação",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Ação",
      flex: 1,
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
              setDeleteItemGroup(cellValues.row);
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
          title="GRUPO DE ITENS"
          subtitle="Veja a lista dos grupos de itens."
        />
        <ModalStyle
          open={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
        >
          <Typography sx={{ mb: "30px" }}>
            Tem certeza de que deseja excluir este grupo de itens?
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
            startIcon={<LayersIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 42px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Novo Grupo
          </Button>
          <ModalStyle open={open} onClose={handleClose}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {editItemGroup && editItemGroup._id
                ? "Editar Grupo de Itens"
                : "Novo Grupo de Itens"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} className="form">
                <Input
                  type="text"
                  label="Nome do Grupo"
                  value={name}
                  onChange={handleName}
                />
                <Input
                  type="text"
                  label="Descrição do Grupo"
                  value={description}
                  onChange={handleDescription}
                />
                <Input
                  type="text"
                  label="Taxa de depreciação"
                  value={depreciation}
                  onChange={handleDepreciation}
                />
                <Dropdown
                  type="text"
                  label="Status"
                  value={active}
                  onChange={handleActive}
                  required
                >
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                </Dropdown>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  {editItemGroup && editItemGroup._id ? "Atualizar" : "Cadastrar"}
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
            rows={itemGroup.filter((row) =>
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

export default ItemGroup;
