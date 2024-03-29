import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { api2 } from "state/api";
import ModalStyle from "components/ModalStyle";
import GridToolbar from "components/GridToolbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ResponsiveBar } from "@nivo/bar";

const Depreciation = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [item, setItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(1);
  const [loading, setLoading] = useState(true);

  const formatMonth = (date) => {
    if (!date) return "N/A";

    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month}/${year}`;
  };

  const prepareDataForChart = () => {
    const dataForChart = [];

    if (selectedItem) {
      const value = selectedItem.value || 0;
      const depreciation = selectedItem.depreciation || 0;

      let updateValue = value;

      for (let i = 0; i < selectedTimePeriod * 12; i++) {
        const date = new Date(selectedItem.acquisitionDate);
        date.setMonth(date.getMonth() + i + 1);

        const depreciationValuePerMonth =
          (updateValue * (depreciation / 100)) / 12;

        const month = formatMonth(date);

        const depreciatedValue = (
          updateValue - depreciationValuePerMonth
        ).toFixed(2);

        dataForChart.push({
          month,
          depreciatedValue: parseFloat(depreciatedValue),
        });
        updateValue -= depreciationValuePerMonth;
      }
    }

    return dataForChart;
  };

  const handleOpen = (selectedRow) => {
    setSelectedItem(selectedRow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Valor (R$)",
      flex: 1,
    },
    {
      field: "depreciation",
      headerName: "Taxa de depreciação (%)",
      flex: 1,
    },
    // {
    //   field: "depreciationRate1",
    //   headerName: "Valor depreciado (R$)",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     const valor = params.row.value || 0;
    //     const depreciacao = params.row.depreciation || 0;
    //     const depreciationValue = valor - (valor *(depreciacao /100) /12).toFixed(2)
    //     return depreciationValue;
    //   },
    // },
    {
      field: "depreciationRate",
      headerName: "Valor depreciado por mês (R$)",
      flex: 1,
      valueGetter: (params) => {
        const updateValue = params.row.value || 0;
        const depreciation = params.row.depreciation || 0;
        const depreciationValue = (
          (updateValue * (depreciation / 100)) /
          12
        ).toFixed(2);
        return depreciationValue;
      },
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
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    api2
      .get("api/item")
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DEPRECIAÇÃO"
          subtitle="Veja a lista da depreciação dos ativos."
        />
        <ModalStyle open={open} onClose={handleClose} width="95%">
          <Typography id="modal-modal-title" variant="h5" component="h1">
            {selectedTimePeriod === 1
              ? "Valor residual por mês durante 1 ano"
              : selectedTimePeriod === 2
              ? "Valor residual por mês durante 2 anos"
              : "Valor residual por mês durante 3 anos"}
          </Typography>

          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Período de tempo:
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                color={selectedTimePeriod === 1 ? "secondary" : "inherit"}
                onClick={() => setSelectedTimePeriod(1)}
              >
                1 Ano
              </Button>
              <Button
                color={selectedTimePeriod === 2 ? "secondary" : "inherit"}
                onClick={() => setSelectedTimePeriod(2)}
              >
                2 Anos
              </Button>
              <Button
                color={selectedTimePeriod === 3 ? "secondary" : "inherit"}
                onClick={() => setSelectedTimePeriod(3)}
              >
                3 Anos
              </Button>
            </ButtonGroup>
          </Box>
          {selectedItem && (
            <Box sx={{ height: "29rem", width: "auto", maxWidth: "100%" }}>
              <ResponsiveBar
                data={prepareDataForChart(selectedItem)}
                keys={["depreciatedValue"]}
                layout="horizontal"
                indexBy="month"
                margin={{ top: 20, right: 40, bottom: 20, left: 60 }}
                padding={selectedTimePeriod === 3 ? 0.5 : 0.15}
                colors={{ scheme: "category10" }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  // tickRotation: selectedTimePeriod === 3 ? 10 : 0,
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                enableGridY={false}
                labelTextColor={theme.palette.background.alt}
                label={(d) =>
                  selectedTimePeriod === 1
                    ? d.value
                    : selectedTimePeriod === 2
                    ? d.value
                    : ""
                }
              />
            </Box>
          )}
        </ModalStyle>
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
            rowsPerPageOptions={[20, 50, 100]}
            columns={columns}
            pagination
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

export default Depreciation;
