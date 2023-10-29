import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SendIcon from "@mui/icons-material/Send";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { api2 } from "state/api";
import Input from "components/Input";
import ModalStyle from "components/ModalStyle";
import Dropdown from "components/Dropdown";
import GridToolbar from "components/GridToolbar";

const AssetMovement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [actualLocation, setActualLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const [id, setId] = useState("");
  const [movement, setMovement] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };
  const handleItem = (e) => setItem(e.target.value);
  const handleLocation = (e) => setNewLocation(e.target.value);
  const handleReason = (e) => setReason(e.target.value);
  const handleObservations = (e) => setObservations(e.target.value);
  const handleSearch = (searchInput) => setSearch(searchInput);

  const loadData = async () => {
    try {
      const response = await api2.get("/api/movement");
      setMovement(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      setLoading(false);
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setItem("");
    setActualLocation("");
    setNewLocation("");
    setReason("");
    setObservations("");
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    api2.get("/api/location").then((response) => setLocation(response.data));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("api/movement/", {
        id,
        name,
        actualLocation,
        newLocation,
        reason,
        observations,
      });

      showToastSuccess(
        response.data.msg || "Movimentação realizada com sucesso!"
      );

      handleClose();
      loadData();
    } catch (error) {
      if (error.response.status === 401) {
        showToastError("Acesso expirado. Faça o login novamente.");
        navigate("/");
      } else {
        showToastError(
          error.response?.data?.error ||
            "Erro desconhecido. Entre em contato com o time de TI."
        );
      }
    }
  };

  const handleTagBlur = async () => {
    if (!item.trim()) {
      showToastError("Informe a tag do ativo antes de sair do campo.");
    } else {
      const response = await api2.get(`api/movement/item/${item}`);
      if (!response.data) {
        showToastError("Não existe essa tag cadastrada na plataforma.");
      } else {
        setId(response.data._id);
        setActualLocation(response.data.location);
        setName(response.data.name);
      }
    }
  };

  const columns = [
    { field: "name", headerName: "Nome do ativo", flex: 1 },
    { field: "actualLocation", headerName: "Localização antiga", flex: 1 },
    { field: "newLocation", headerName: "Nova localização", flex: 1 },
    { field: "reason", headerName: "Motivo", flex: 1 },
    { field: "observations", headerName: "Observações", flex: 1 },
    { field: "user", headerName: "Responsável", flex: 1 },
    {
      field: "createdAt",
      headerName: "Data",
      flex: 1,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        return date.toLocaleString("pt-BR");
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="MOVIMENTAÇÃO DOS ATIVOS"
          subtitle="Veja a lista das movimentações dos ativos."
        />
        <Box>
          <Button
            onClick={handleOpen}
            startIcon={<CompareArrowsIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 7px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Nova Movimentação
          </Button>
          <ModalStyle open={open} onClose={handleClose}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Nova movimentação do ativo
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} className="form">
                <Input
                  type="text"
                  label="Tag do ativo"
                  value={item}
                  onChange={handleItem}
                  onBlur={handleTagBlur}
                  color="error"
                />
                <Input
                  type="text"
                  label="Nome do item"
                  value={name}
                  disabled={true}
                />
                <Input
                  type="text"
                  label="Localização Atual"
                  value={actualLocation}
                  disabled={true}
                  color="error"
                />
                <Dropdown
                  label="Nova localização"
                  value={newLocation}
                  onChange={handleLocation}
                >
                  {location.map((loc) => (
                    <MenuItem key={loc.name} value={loc.name}>
                      {loc.name}
                    </MenuItem>
                  ))}
                </Dropdown>
                <Input
                  type="text"
                  label="Motivo"
                  value={reason}
                  onChange={handleReason}
                />
                <Input
                  type="text"
                  label="Observações"
                  value={observations}
                  onChange={handleObservations}
                />
                <Typography color="darkgray" sx={{ mb: "15px" }}>
                  Os campos Nome do Item e Localização Atual são preenchidos
                  automaticamente, basta informar o número da tag do ativo.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  Confirmar movimentação
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
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
              overflowY: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": { width: "3px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#b3b0b0",
                borderRadius: "20px",
              },
              "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
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
            rows={movement.filter((row) =>
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
            page={page}
            pageSize={pageSize}
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

export default AssetMovement;
