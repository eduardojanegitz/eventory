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

  // const { data, isLoading } = useGetMovementQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const loadData = async () => {
    try {
      const response = await api2.get("api/location");
      setLocation(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToastMessage = () => {
    toast.success("Localização cadastrada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastDelete = () => {
    toast.success("Localização deletada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function handleDeleteClick(id) {
    try {
      const response = await api2.delete(`api/location/${id}`);
      if (response.status === 200) {
        loadData();
        showToastDelete();
      } else {
        console.error("Erro ao excluir o item.");
      }
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api2.post("api/location/", {
      name,
      description,
    });
    setName("");
    setDescription("");
    showToastMessage();
    loadData();
  };

  const columns = [
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
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
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(cellValues.row._id)}
          >
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
          title="LOCALIZAÇÃO"
          subtitle="Veja a lista das localização dos ativos."
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
            Nova Localização
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalStyle>
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Nova localização
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit} className="form">
                  <Input
                    type="text"
                    placeholder="Nome da localização"
                    value={name}
                    onChange={handleName}
                  />
                  <Input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={handleDescription}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<SendIcon />}
                  >
                    Cadastrar
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
          // loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={location || []}
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
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
    </Box>
  );
};

export default Location;
