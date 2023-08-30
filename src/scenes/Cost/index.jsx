import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetCustomersQuery, useGetUserQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Link } from "react-router-dom";



const Cost = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUserQuery();
  // console.log("data", data);

  const columns = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 0.5,
    },
    {
      field: "department",
      headerName: "Departamento",
      flex: 1,
    },
    // {
    //     field: "phoneNumber",
    //     headerName: "Número de telefone",
    //     flex: 0.5,
    //     renderCell: (params) => {
    //         return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //     }
    //   },
    //   {
    //     field: "country",
    //     headerName: "País",
    //     flex: 0.4,
    //   },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 0.5,
    // },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Header title="USUÁRIOS" subtitle="Lista de usuários" />
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
            <Link to="/novo-usuario/" className="btn-new"> 
              <PersonAddOutlinedIcon sx={{ mr: "10px" }} />
              Novo usuário
            </Link>
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="40px"
        height="90vh"
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
          isLoading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Cost;
