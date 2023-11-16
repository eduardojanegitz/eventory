import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ModalStyle from "components/ModalStyle";
import Input from "components/Input";
import GridToolbar from "components/GridToolbar";

import { api2 } from "state/api";
import Dropdown from "components/Dropdown";

const CostCenter = () => {
  const ACTIVE = ["Ativo", "Inativo"];

  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [costCenter, setCostCenter] = useState([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpen = (item = null) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleActive = (e) => {
    setActive(e.target.value);
  };

  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  const [searchInput, setSearchInput] = useState("");

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastDelete = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const loadData = async () => {
    try {
      const response = await api2.get("api/cost");
      setCostCenter(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItem && editItem._id) {
      const response = await api2.put(`api/cost/${editItem._id}`, {
        description,
        active,
      });
      showToastSuccess(
        response.data.msg || "Centro de custo atualizado com sucesso! "
      );
    } else {
      const response = await api2.post("api/cost/", {
        code,
        description,
        active,
      });
      showToastSuccess(
        response.data.msg || "Centro de custo criado com sucesso!"
      );
    }

    setCode("");
    setDescription("");
    setActive("");

    setEditItem(null);
    setOpen(false);
    loadData();
  };

  async function handleDeleteClick() {
    try {
      const response = await api2.delete(`api/cost/${deleteItem._id}`);
      if (response.status === 200) {
        loadData();
        showToastDelete(
          response.data.msg || "Centro de custo deletado com sucesso! "
        );
      } else {
        console.error("Erro ao excluir o centro de custo.");
      }
    } catch (error) {
      console.error("Erro ao excluir o centro custo:", error);
      showToastDelete(
        "Erro desconhecido. Entre em contato com a equipe de TI."
      );
    }
  }

  const columns = [
    {
      field: "code",
      headerName: "Código",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Ativo",
      flex: 1,
    },

    {
      field: "Ação",
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
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
              // onClick={() => handleDeleteClick(cellValues.row._id)}
              onClick={() => {
                setConfirmationModalOpen(true);
                setDeleteItem(cellValues.row);
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="CENTRO DE CUSTO"
          subtitle="Veja a lista dos Centros de Custos."
        />
        <ModalStyle
          open={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
        >
          <Typography sx={{ mb: "30px" }}>
            Tem certeza de que deseja excluir este custo?
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
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            NOVO CENTRO DE CUSTO
          </Button>
          <ModalStyle
            maxHeight="90%"
            open={open}
            onClose={handleClose}
          >
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {editItem && editItem._id
                ? "Edição de centro de custo"
                : "Cadastro de centro de custo"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form component="form" onSubmit={handleSubmit}>
                <Grid
                  container
                  rowSpacing={{ md: 5 }}
                  columnSpacing={{ md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Código"
                      value={code}
                      onChange={handleCode}
                      required
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="text"
                      label="Descrição do centro de custo"
                      value={description}
                      onChange={handleDescription}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Dropdown
                      label="Status"
                      value={active}
                      onChange={handleActive}
                    >
                      {ACTIVE.map((active) => (
                        <MenuItem key={active} value={active}>
                          {active}
                        </MenuItem>
                      ))}
                    </Dropdown>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                  sx={{ mr: 5 }}
                >
                  {editItem && editItem._id ? "Atualizar" : "Cadastrar"}
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
            rowsPerOptions={[20, 50, 100]}
            columns={columns}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="client"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            rows={costCenter.filter((row) =>
              Object.values(row).some(
                (value) =>
                  value &&
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
              )
            )}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CostCenter;
