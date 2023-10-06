import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  ListItemButton,
  Modal,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import Header from "components/Header";
import { api, api2, useGetItemQuery } from "state/api";
import FlexBetween from "components/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Link,
  Navigate,
  Route,
  Router,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import NewItem from "scenes/NewItem";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { SettingsRemote } from "@mui/icons-material";
import { toast } from "react-toastify";
import ModalStyle from "components/ModalStyle";
import Input from "components/Input";
import InputGrid from "components/InputGrid";

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  // const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tag, setTag] = useState("");
  const [locationSelect, setLocationSelect] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (item = null) => {
    setEditItem(item);
    setName(item ? item.name : "");
    setDescription(item ? item.description : "");
    setValue(item ? item.value : "");
    setSupplier(item ? item.supplier : "");
    setSerialNumber(item ? item.serialNumber : "");
    setTag(item ? item.setTag : "");
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
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  const handleSupplier = (e) => {
    setSupplier(e.target.value);
  };
  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };
  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const [item, setItem] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  // const { data, isLoading } = useGetItemQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

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
      const response = await api2.get("api/item");
      setItem(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
    }
  };

  useEffect(() => {
    api2
      .get("api/location")
      .then((response) => setLocationSelect(response.data));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItem && editItem._id) {
      await api2.put(`api/item/${editItem._id}`, {
        name,
        description,
        value,
        supplier,
        serialNumber,
        tag,
      });
      showToastSuccess("Item atualizado com sucesso!");
    } else {
      await api2.post("api/item/", {
        name,
        description,
        value,
        location,
        supplier,
        serialNumber,
        tag,
      });
      showToastSuccess("Item cadastrado com sucesso!");
    }

    setEditItem(null);
    setOpen(false);
    loadData();
  };

  async function handleDeleteClick(id) {
    try {
      const response = await api2.delete(`api/item/${id}`);
      if (response.status === 200) {
        loadData();
        showToastDelete("Item deletado com sucesso");
      } else {
        console.error("Erro ao excluir o item.");
      }
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição do item",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Localidade",
      flex: 1,
    },
    {
      field: "supplier",
      headerName: "Fornecedor",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Número de série",
      flex: 1,
    },
    {
      field: "tag",
      headerName: "Tag",
      flex: 1,
    },
    {
      field: "Ação",
      flex: 1.2,
      renderCell: (cellValues) => {
        return (
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
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="ITENS ATIVOS"
          subtitle="Veja a lista dos itens ativos."
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
            Novo item
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalStyle>
              <Typography id="modal-modal-title" variant="h5" component="h1">
                {editItem && editItem._id
                  ? "Editar localização"
                  : "Nova localização"}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit} className="form">
                  <Input
                    type="text"
                    placeholder="Nome do ativo"
                    value={name}
                    onChange={handleName}
                  />
                  <Input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={handleDescription}
                  />
                  <Input
                    type="text"
                    placeholder="Valor do ativo"
                    value={value}
                    onChange={handleValue}
                  />
                  <Input
                    type="text"
                    placeholder="Fornecedor"
                    value={supplier}
                    onChange={handleSupplier}
                  />
                  <Input
                    type="text"
                    placeholder="Número de série"
                    value={serialNumber}
                    onChange={handleSerialNumber}
                  />
                  <Input
                    type="text"
                    placeholder="Número da tag"
                    value={tag}
                    onChange={handleTag}
                  />
                  <InputLabel htmlFor="location-select">
                    Selecione a localização
                  </InputLabel>
                  <Select
                    // variant="solid"
                    sx={{
                      width: "30rem",
                      mb: "1rem",
                      borderRadius: "35px",
                      padding: "4px",
                    }}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    label="Selecione a localização"
                    id="location-select"
                  >
                    {locationSelect.map((location) => (
                      <MenuItem key={location._id} value={location.name}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    // endIcon={<SendIcon />}
                  >
                    {editItem && editItem._id ? "Atualizar" : "Cadastrar"}
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
          rows={item || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          pagination
          // page={page}
          // pageSize={pageSize}
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

export default Products;
