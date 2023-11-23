import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import ModalStyle from "components/ModalStyle";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import GridToolbar from "components/GridToolbar";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

import { toast } from "react-toastify";
import { api2 } from "state/api";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const Divergences = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [divergencesId, setDivergencesId] = useState("");
  const [divergencesLocation, setDivergencesLocation] = useState("");

  const [sort, setSort] = useState({});

  const [divergences, setDivergences] = useState([]);
  const [itemsForDivergence, setItemsForDivergence] = useState([]);
  const [correctItems, setCorrectItems] = useState([]);
  const [approvedDivergence, setApprovedDivergence] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleOpenItemsModal = (row) => {
    const divergence = divergences.find((div) => div._id === row);
    setItemsForDivergence(divergence?.item || []);
    setIsItemsModalOpen(true);
  };

  const handleCloseItemsModal = () => {
    setIsItemsModalOpen(false);
  };

  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);
  };

  const handleAssetMovement = () => {
    navigate("/movimentacao");
  };

  const handleButtonClick = async (location) => {
    try {
      const response = await api2.get(`api/inventory/location/${location}`);
      setCorrectItems(response.data);
    } catch (error) {
      console.error("Erro ao obter dados do backend:", error);
      showToastError("Erro desconhecido. Entre em contato com o time de TI.");
    }
  };

  const handleApproveDivergence = async (divergenceId) => {
    try {
      const response = await axiosPrivate.post(`api/approve/${divergenceId}`);
      if (response.status === 200) {
        showToastSuccess(response.data.msg || "Divergência aprovada!");
        loadData();
        handleCloseItemsModal();
      }
    } catch (error) {
      console.error("Erro ao aprovar divergência:", error);
    }
  };

  const loadData = async () => {
    try {
      const response = await api2.get("api/divergences");
      setDivergences(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      showToastError("Erro desconhecido. Entre em contato com o time de TI.");
      setLoading(false);
    }
  };

  useEffect(() => {
    api2
      .get("api/approve")
      .then((response) => setApprovedDivergence(response.data));
    loadData();
  }, []);

  const columns = [
    {
      field: "location",
      headerName: "Localização",
      flex: 1,
    },
    // {
    //   field: "localizacao",
    //   headerName: "Localização correta",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     if (params.row.item && params.row.item.length > 0) {
    //       const localizacao = params.row.item.map((obj) => obj.localizacao);
    //       return localizacao.join(", ");
    //     } else {
    //       return "";
    //     }
    //   },
    // },
    {
      field: "user",
      headerName: "Responsável",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Data da divergência",
      flex: 1,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        return date.toLocaleString("pt-BR");
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "5px" }}
            onClick={() => {
              handleOpenItemsModal(params.row._id);
              setDivergencesId(params.row._id);
              handleButtonClick(params.row.location);
            }}
          >
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DIVERGÊNCIA DE INVENTÁRIOS"
          subtitle="Veja a lista das divergência dos ativos."
        />
        <Button
          onClick={handleOpen}
          startIcon={<AssignmentTurnedInOutlinedIcon />}
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.background.default,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 15px",
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
            },
          }}
        >
          HISTÓRICO DE APROVAÇÕES
        </Button>
        <ModalStyle open={open} onClose={handleClose}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: "1rem" }}
          >
            Histórico de Aprovações
          </Typography>
          <Box
            height="50vh"
            width="60vw"
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
              rows={approvedDivergence.map((approve, index) => ({
                ...approve,
                id: index,
              }))}
              columns={[
                { field: "location", headerName: "Localização", flex: 1 },
                { field: "user", headerName: "Usuário aprovador", flex: 1 },
                {
                  field: "createdAt",
                  headerName: "Data de aprovação",
                  flex: 1,
                  valueGetter: (params) => {
                    const date = new Date(params.row.createdAt);
                    return date.toLocaleString("pt-BR");
                  },
                },
              ]}
              pageSize={20}
              pagination
            />
          </Box>
        </ModalStyle>
      </FlexBetween>
      <ModalStyle
        open={isItemsModalOpen}
        onClose={handleCloseItemsModal}
        width="90%"
      >
        <Typography variant="h6" component="h2" sx={{ mb: "1rem" }}>
          Itens divergentes
        </Typography>
        <FlexBetween>
          <Box
            height="50vh"
            width="100%"
            sx={{
              mr: "7px",
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
              rows={itemsForDivergence.map((item, index) => ({
                ...item,
                id: index,
              }))}
              columns={[
                { field: "nome", headerName: "Item", flex: 1 },
                {
                  field: "localizacao",
                  headerName: "Localização correta",
                  flex: 1,
                },
                { field: "tag", headerName: "Patrimônio", flex: 0.4 },
              ]}
              pageSize={20}
              pagination
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
          <Box
            height="50vh"
            width="100%"
            sx={{
              "& .divergence": {
                backgroundColor: "#e10b0b91",
              },
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
              rows={correctItems.map((item, index) => ({ ...item, id: index }))}
              columns={[
                { field: "name", headerName: "Item", flex: 1 },
                { field: "tag", headerName: "Patrimônio", flex: 0.3 },
              ]}
              pageSize={20}
              pagination
              getRowClassName={(params) => {
                const correspondingItem = itemsForDivergence.find(
                  (divergentItem) =>
                    divergentItem.nome === params.row.name &&
                    divergentItem.tag === params.row.tag
                );

                const isDifferent = correspondingItem ? true : false;

                return isDifferent ? "" : "divergence";
              }}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </FlexBetween>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ThumbUpAltOutlinedIcon />}
          sx={{ mr: "5px" }}
          onClick={() => handleApproveDivergence(divergencesId)}
        >
          APROVAR A DIVERGÊNCIA
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CompareArrowsIcon />}
          onClick={handleAssetMovement}
        >
          MOVIMENTAR O ATIVO
        </Button>
      </ModalStyle>

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
            rows={divergences.filter((row) =>
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

export default Divergences;
