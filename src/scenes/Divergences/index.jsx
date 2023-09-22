import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { api2, useGetItemByTagQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Divergences = () => {
    const theme = useTheme();
    const [sort, setSort] = useState({});
  const [divergences, setDivergences] = useState([]);

  useEffect(() => {
     api2.get("api/divergences").then((response) => setDivergences(response.data))
    

    
  }, []);

  const columns = [
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.item && params.row.item.length > 0) {
          const descricao = params.row.item.map((obj) => obj.descricao);
          return descricao.join(', ');
        } else {
          return '';
        }
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.item && params.row.item.length > 0) {
          const nome = params.row.item.map((obj) => obj.nome);
          return nome.join(', ');
        } else {
          return '';
        }
      },
    },
    {
      field: "serial",
      headerName: "Número de série",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.item && params.row.item.length > 0) {
          const serial = params.row.item.map((obj) => obj.serial);
          return serial.join(', ');
        } else {
          return '';
        }
      },
    },
    {
      field: "user",
      headerName: "Responsável",
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "Data",
      flex: 1,
      valueGetter: (params) => {
        // Formate a data para o formato brasileiro (dd/mm/yyyy)
        const date = new Date(params.row.createdAt);
        return date.toLocaleString('pt-BR');
      },
    }
  ];
  

  return (
    <Box m="1.5rem 2.5rem">
    <FlexBetween>
      <Header
        title="DIVERGÊNCIA DE INVENTÁRIOS"
        subtitle="Veja a lista das divergência dos ativos."
      />
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
        rows={divergences || []}
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

export default Divergences;
