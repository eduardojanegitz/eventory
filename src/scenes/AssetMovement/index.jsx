import React, { useState } from "react";
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
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useGetMovementQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleItem = (e) => setItem(e.target.value);
  const handleLocation = (e) => setNewLocation(e.target.value);
  const handleReason = (e) => setReason(e.target.value);
  const handleObservations = (e) => setObservations(e.target.value);

  const adicionar = async () => {
    const response = await api2.get(`api/item/${item}`);
    setId(response.data._id);
    setActualLocation(response.data.location);
    setName(response.data.name);
  };

  const showToastMessage = () => {
    toast.success("Movimentação realizada com sucesso!", {
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
      headerName: "Nova Localização",
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
    },
    {
      field: "Ação",
      flex: 1,
      renderCell: (cellValues) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "5px" }}
          >
            Editar
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
            Apagar
          </Button>
        </>
      ),
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalStyle>
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Nova movimentação do ativo
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit} className="form">
                  <Input
                    type="text"
                    placeholder="Código do item"
                    value={item}
                    onChange={handleItem}
                    onBlur={adicionar}
                  />
                  {/* <Input 
                     type="text"
                     placeholder="Nome"
                     value={item}
                     onChange={(e) => setItem(e.target.value)}
                     // className="input"
                     onBlur={adicionar}
                  /> */}
                  {/* <TextField
          required
          id="filled-basic"
          label="Nome"
        /> */}
                  <Input
                    type="text"
                    placeholder="Nome do item *"
                    value={name}
                    readOnly={true}
                  />
                  <Input
                    type="text"
                    placeholder="Localização Atual *"
                    value={actualLocation}
                    readOnly={true}
                  />
                  <Input
                    type="text"
                    placeholder="Nova localização"
                    value={newLocation}
                    onChange={handleLocation}
                  />
                  <Input
                    type="text"
                    placeholder="Motivo"
                    value={reason}
                    onChange={handleReason}
                  />
                  <Input
                    type="text"
                    placeholder="Observações"
                    value={observations}
                    onChange={handleObservations}
                  />
                  <p>
                    Registros marcados com * são preenchidos automaticamente
                  </p>
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
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
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

export default AssetMovement;
