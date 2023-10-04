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
} from "@mui/material";
import Header from "components/Header";
import { api2, useGetItemQuery } from "state/api";
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
import DeleteIcon from '@mui/icons-material/Delete';
import { SettingsRemote } from "@mui/icons-material";
import { toast } from "react-toastify";

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  // const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [item, setItem] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  // const { data, isLoading } = useGetItemQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  const showToastMessage = () => {
    toast.success("Item excluído com sucesso!", {
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
    loadData();
  }, [])

  async function handleDeleteClick(id) {
    try {
      const response = await api2.delete(`api/item/${id}`);
      if (response.status === 200) {
        loadData();
        showToastMessage();
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
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
          
          <Button
          variant="contained"
          color="secondary" 
          sx={{ marginRight: '5px'}}
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
        )
      }
    }
   
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
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
        
          >
            <Link to="/novo-item/" className="btn-new">
              <AddOutlinedIcon sx={{ mr: "10px" }} />
              Novo Item
            </Link>
          </Button>
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
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
      {/* {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Carregando...</>
      )} */}
    </Box>
  );
};

export default Products;
