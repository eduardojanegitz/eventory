import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  useTheme,
  InputBase,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { api2, useGetMovementQuery } from "state/api";
// import { Input } from "@mui/base";
import Input from "components/Input";
import ModalStyle from "components/ModalStyle";
import GridToolbar from "components/GridToolbar";

const AssetMovement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [list2, setList2] = useState("");
  const [actualLocation, setActualLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
    setName("");
    setItem("");
    setActualLocation("");
    setNewLocation("");
    setReason("");
    setObservations("");
  };
  const handleItem = (e) => setItem(e.target.value);
  const handleLocation = (e) => setNewLocation(e.target.value);
  const handleReason = (e) => setReason(e.target.value);
  const handleObservations = (e) => setObservations(e.target.value);
  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  useEffect(() => {
    api2.get("/api/movement").then((response) => setData(response.data));
  }, []);

  const showToastMessage = () => {
    toast.success("Movimentação realizada com sucesso!", {
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

    await axiosPrivate.post("api/movement/", {
      id,
      name,
      actualLocation,
      newLocation,
      reason,
      observations,
    });
    setId("");
    setName("");
    setActualLocation("");
    setNewLocation("");
    setReason("");
    setObservations("");
    showToastMessage();
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
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "actualLocation",
      headerName: "Localização antiga",
      flex: 1,
    },
    {
      field: "newLocation",
      headerName: "Nova localização",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Motivo",
      flex: 1,
    },
    {
      field: "observations",
      headerName: "Observações",
      flex: 1,
    },
    {
      field: "user",
      headerName: "Responsável",
      flex: 1,
    },
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
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
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
                <Input
                  type="text"
                  label="Nova localização"
                  value={newLocation}
                  onChange={handleLocation}
                />
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
                <Typography color="darkgray" sx={{mb: "15px"}}>
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
          // loading={isLoading || !data}
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
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
          pagination
          // page={page}
          // pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default AssetMovement;
