import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
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
import { api2 } from "state/api";
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
  const [editLocation, setEditLocation] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editLocation && editLocation._id) {
      await api2.put(`api/location/${editLocation._id}`, {
        name,
        description,
      });
      showToastSuccess("Localização atualizada com sucesso!");
    } else {
      await api2.post("api/location/", {
        name,
        description,
      });
      showToastSuccess("Localização cadastrada com sucesso!");
    }

    setName("");
    setDescription("");
    setEditLocation(null);
    setOpen(false);
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
            onClick={() => handleOpen(cellValues.row)}
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

  const showToastSuccess = (message) => {
    toast.success(message , {
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
                {editLocation && editLocation._id ? "Editar localização" : "Nova localização"}
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
                    {editLocation && editLocation._id ? "Atualizar" : "Cadastrar"}
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
          getRowId={(row) => row._id}
          rows={location || []}
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
          pagination
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

export default Location;
