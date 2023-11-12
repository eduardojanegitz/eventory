import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  MenuItem,
  Grid,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { toast } from "react-toastify";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ModalStyle from "components/ModalStyle";
import Input from "components/Input";
import Dropdown from "components/Dropdown";
import GridToolbar from "components/GridToolbar";

import { api2 } from "state/api";

const Items = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [item, setItem] = useState([]);
  const [locationSelect, setLocationSelect] = useState([]);
  const [itemGroupData, setItemGroupData] = useState([]);
  const [costCenterData, setCostCenterData] = useState([]);

  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [writeOffDate, setWriteOffDate] = useState("");
  const [value, setValue] = useState("");
  const [responsable, setResponsable] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tag, setTag] = useState("");
  const [depreciation, setDepreciation] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [itemGroup, setItemGroup] = useState("");
  const [invoice, setInvoice] = useState("");

  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openWritteOff, setOpenWritteOff] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [itemImage, setItemImage] = useState(null);

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

  const handleOpenWritteOff = () => setOpenWritteOff(true);
  const handleCloseWritteOff = () => setOpenWritteOff(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setItemImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
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
  const handleResponsable = (e) => {
    setResponsable(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleCostCenter = (e) => {
    setCostCenter(e.target.value);
  };
  const handleItemGroup = (e) => {
    const selectedItemGroup = e.target.value;
    setItemGroup(selectedItemGroup);
    updateDepreciation(selectedItemGroup);
  };
  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  const updateDepreciation = (selectedItemGroup) => {
    const selectedGroup = itemGroupData.find(
      (group) => group.name === selectedItemGroup
    );
    if (selectedGroup) {
      setDepreciation(selectedGroup.depreciation);
    } else {
      setDepreciation("");
    }
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
      const response = await api2.get("api/item");
      setItem(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    api2
      .get("api/location")
      .then((response) => setLocationSelect(response.data));
  }, []);
  useEffect(() => {
    api2
      .get("api/item-group")
      .then((response) => setItemGroupData(response.data));
  }, []);
  useEffect(() => {
    api2.get("api/cost").then((response) => setCostCenterData(response.data));
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
        responsable,
        location,
        supplier,
        serialNumber,
        tag,
        acquisitionDate,
        depreciation,
        itemGroup,
        invoice,
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
      field: "branch",
      headerName: "Filial",
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Item",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Valor (R$)",
      flex: 0.7,
    },
    {
      field: "responsable",
      headerName: "Responsável",
      flex: 0.7,
    },
    {
      field: "location",
      headerName: "Localização",
      flex: 0.5,
    },
    {
      field: "supplier",
      headerName: "Fornecedor",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Nº de série",
      flex: 0.5,
    },
    {
      field: "tag",
      headerName: "Patrimônio",
      flex: 0.6,
    },
    {
      field: "acquisitionDate",
      headerName: "Data",
      flex: 0.7,
      valueGetter: (params) => {
        const date = new Date(params.row.acquisitionDate);
        return date.toLocaleDateString("pt-BR");
      },
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
              padding: "10px 50px",
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
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Button
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  bgcolor: "lightgray",
                  marginRight: "20px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <InputLabel htmlFor="imageInput">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    id="imageInput"
                  />
                  {itemImage ? (
                    <img
                      src={itemImage}
                      alt="Imagem do ativo"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <PhotoCameraIcon fontSize="large" color="secondary" />
                  )}
                </InputLabel>
              </Button>
            </Box>
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
                      label="Item"
                      value={name}
                      onChange={handleName}
                      required
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="text"
                      label="Descrição do item"
                      value={description}
                      onChange={handleDescription}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="number"
                      label="Valor do ativo"
                      value={value}
                      onChange={handleValue}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="date"
                      value={acquisitionDate}
                      onChange={handleAcquisitionDate}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Fornecedor"
                      value={supplier}
                      onChange={handleSupplier}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Usuário responsável"
                      value={responsable}
                      onChange={handleResponsable}
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
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Número de patrimônio"
                      value={tag}
                      onChange={handleTag}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Nota fiscal"
                      value={invoice}
                      onChange={(e) => setInvoice(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Filial"
                      value={branch}
                      onChange={handleBranch}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Dropdown
                      type="text"
                      label="Grupo de itens"
                      value={itemGroup}
                      onChange={handleItemGroup}
                      required
                    >
                      {itemGroupData.map((data) => (
                        <MenuItem key={data.name} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))}
                    </Dropdown>
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="number"
                      placeholder="Taxa de depreciação %"
                      value={depreciation}
                      onChange={handleDepreciation}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Dropdown
                      type="text"
                      label="Centro de Custo"
                      value={costCenter}
                      onChange={handleCostCenter}
                    >
                      {costCenterData.map((data) => (
                        <MenuItem key={data.description} value={data.description}>
                          {data.description}
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
                <Button
                  onClick={handleOpenWritteOff}
                  endIcon={<BookmarkRemoveOutlinedIcon />}
                  variant="contained"
                  color="error"
                >
                  Dar baixa
                </Button>
                <ModalStyle open={openWritteOff} onClose={handleCloseWritteOff}>
                  <Typography>Dar baixa no item</Typography>
                  <Grid item xs={4}>
                    <Input
                      type="date"
                      value={writeOffDate}
                      onChange={handleWriteOffDate}
                    />
                  </Grid>
                </ModalStyle>
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
          />
        </Box>
      )}
    </Box>
  );
};

export default Items;
