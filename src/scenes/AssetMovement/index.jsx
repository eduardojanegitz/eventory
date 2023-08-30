import React, { useState } from "react";
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
import { useGetItemQuery, useGetMovementQuery } from "state/api";
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

const AssetMovement = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetMovementQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "name",
      headerName: "Nome do ativo",
      flex: 1,
    },
    {
      field: "actualLocation",
      headerName: "Localização atual",
      flex: 1,
    },
    {
      field: "newLocation",
      headerName: "Nova Localização",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Motivo",
      flex: 1,
    },
    {
      field: "obeservations",
      headerName: "Obeservações",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="MOVIMENTAÇÃO DOS ATIVOS"
          subtitle="Veja a lista das movimentações dos ativos."
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
            <Link to="/new-movement/" className="btn-new">
              <AddOutlinedIcon sx={{ mr: "10px" }} />
              Nova Movimentação
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
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
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default AssetMovement;
