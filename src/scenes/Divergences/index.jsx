import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { api2, useGetItemByTagQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const Divergences = () => {
    const theme = useTheme();
    const [sort, setSort] = useState({});
  const [divergences, setDivergences] = useState([]);

  const showToastMessage = () => {
    toast.success("Divergência aprovada", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const loadData = async () => {
    try {
      const response = await api2.get("api/divergences");
      setDivergences(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
    }
  };

  useEffect(() => {
 
    // Carregue os dados da tabela quando o componente for montado
    loadData();
  }, [])

  async function handleDeleteClick(id) {
    try {
      const response = await api2.delete(`api/divergences/${id}`);
      if (response.status === 200) {
        // Atualize a lista de divergências após a exclusão bem-sucedida
        // setDivergences((prevDivergences) =>
        //   prevDivergences.filter((divergence) => divergence._id !== id)
        // );
        loadData();
        showToastMessage();
        // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
      } else {
        // Exiba uma mensagem de erro ou trate qualquer erro que ocorra
        console.error("Erro ao excluir o item.");
      }
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    }
  }

  const columns = [
    {
      field: "location",
      headerName: "Localização",
      flex: 1
    },
    {
      field: "localizacao",
      headerName: "Localização correta",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.item && params.row.item.length > 0) {
          const localizacao = params.row.item.map((obj) => obj.localizacao);
          return localizacao.join(', ');
        } else {
          return '';
        }
      },
    },
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
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteClick(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
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
