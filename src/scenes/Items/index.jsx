import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  MenuItem,
  Grid,
} from "@mui/material";
import Header from "components/Header";
import { api2 } from "state/api";
import FlexBetween from "components/FlexBetween";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import ModalStyle from "components/ModalStyle";
import Input from "components/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import Dropdown from "components/Dropdown";
import GridToolbar from "components/GridToolbar";

const Items = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [writeOffDate, setWriteOffDate] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tag, setTag] = useState("");
  const [depreciation, setDepreciation] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [locationSelect, setLocationSelect] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleOpen = (item = null) => {
    setEditItem(item);
    setName(item ? item.name : "");
    setDescription(item ? item.description : "");
    setValue(item ? item.value : "");
    setSupplier(item ? item.supplier : "");
    setSerialNumber(item ? item.serialNumber : "");
    setTag(item ? item.tag : "");
    setBranch(item ? item.branch : "");
    setDepreciation(item ? item.depreciation : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBranch = (e) => {
    setBranch(e.target.value);
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
  const handleAcquisitionDate = (e) => {
    setAcquisitionDate(e.target.value);
  };
  const handleWriteOffDate = (e) => {
    setWriteOffDate(e.target.value);
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
  const handleDepreciation = (e) => {
    setDepreciation(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleCostCenter = (e) => {
    setCostCenter(e.target.value);
  };
  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  const [item, setItem] = useState([]);

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
        branch,
        name,
        description,
        value,
        supplier,
        serialNumber,
        tag,
        acquisitionDate,
        writeOffDate,
        depreciation,
      });
      showToastSuccess("Item atualizado com sucesso!");
    } else {
      await api2.post("api/item/", {
        branch,
        name,
        description,
        value,
        location,
        supplier,
        serialNumber,
        tag,
        acquisitionDate,
        writeOffDate,
        depreciation,
      });
      showToastSuccess("Item cadastrado com sucesso!");
    }

    setEditItem(null);
    setOpen(false);
    loadData();
  };

  async function handleDeleteClick() {
    try {
      const response = await api2.delete(`api/item/${deleteItem._id}`);
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
          title="ITENS ATIVOS"
          subtitle="Veja a lista dos itens ativos."
        />
        <ModalStyle
          open={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
        >
          <Typography sx={{ mb: "30px" }}>
            Tem certeza de que deseja excluir este item?
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
              padding: "10px 20px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Novo item
          </Button>
          <ModalStyle
            maxHeight="90%"
            width="90%"
            open={open}
            onClose={handleClose}
          >
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {editItem && editItem._id ? "Edição de item" : "Cadastro de item"}
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
                      label="Nome do ativo"
                      value={name}
                      onChange={handleName}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="text"
                      label="Descrição do ativo"
                      value={description}
                      onChange={handleDescription}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="number"
                      label="Valor do ativo"
                      value={value}
                      onChange={handleValue}
                    />
                  </Grid>
                  {(!editItem || (editItem && !editItem.acquisitionDate)) && (
                    <Grid item xs={4}>
                      <Input
                        type="date"
                        value={acquisitionDate}
                        onChange={handleAcquisitionDate}
                      />
                    </Grid>
                  )}
                  {(!editItem || (editItem && !editItem.writeOffDate)) && (
                    <Grid item xs={4}>
                      <Input
                        type="date"
                        value={writeOffDate}
                        onChange={handleWriteOffDate}
                      />
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Fornecedor"
                      value={supplier}
                      onChange={handleSupplier}
                    />
                  </Grid>
                  {(!editItem || (editItem && !editItem.location)) && (
                    <Grid item xs={4}>
                      <Dropdown
                        value={location}
                        onChange={handleLocation}
                        label="Localização"
                        id="location-select"
                      >
                        {locationSelect.map((location) => (
                          <MenuItem key={location._id} value={location.name}>
                            {location.name}
                          </MenuItem>
                        ))}
                      </Dropdown>
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Número de série"
                      value={serialNumber}
                      onChange={handleSerialNumber}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Número da tag"
                      value={tag}
                      onChange={handleTag}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="text"
                      label="Filial"
                      value={branch}
                      onChange={handleBranch}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="number"
                      label="Taxa de depreciação %"
                      value={depreciation}
                      onChange={handleDepreciation}
                    />
                  </Grid>
                  {/* <Grid item xs={8}>
                      <Input
                        type="text"
                        label="Centro de custo"
                        value={costCenter}
                        onChange={handleCostCenter}
                      />
                    </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
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
          // rows={item || []}
          rowsPerOptions={[20, 50, 100]}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          rows={item.filter((row) =>
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
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Items;
