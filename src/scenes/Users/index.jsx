import React, { useCallback, useState } from "react";
import { Box, Button, Grid, MenuItem, useTheme } from "@mui/material";
import { api2, useGetCustomersQuery, useGetUserQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalStyle from "components/ModalStyle";
import Input from "components/Input";
import Dropdown from "components/Dropdown";
import { useEffect } from "react";
import GridToolbar from "components/GridToolbar";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Users = () => {
  const ROLES = ["Admin", "Employee", "Manager"];
  const ACTIVE = ["Ativo", "Inativo"];

  const theme = useTheme();
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [editUser, setEditUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const handleOpen = (user = null) => {
    setEditUser(user);
    setUsername(user ? user.username : "");
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
    setDepartment(user ? user.department : "");
    setRoles(user ? user.roles : "");
    setActive(user ? user.active : "");
    setOpen(true);
  };

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [roles, setRoles] = useState("");
  const [active, setActive] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };
  const handleRoles = (e) => {
    setRoles(e.target.value);
  };
  const handleActive = (e) => {
    setActive(e.target.value);
  };
  const handleSearch = useCallback((searchInput) => {
    setSearch(searchInput);
  }, []);

  const loadData = async () => {
    try {
      const response = await api2.get("api/user");
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados da tabela:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editUser && editUser._id) {
        await api2.put(`api/user/${editUser._id}`, {
          username,
          password,
          name,
          email,
          department,
          roles,
          active,
        });
        showToastSuccess("Usuário atualizado com sucesso!");
      } else {
        const response = await api2.post("api/user", {
          username,
          name,
          email,
          password,
          department,
          roles,
          active,
        });
        showToastSuccess(
          response.data.msg || "Usuário cadastrado com sucesso!"
        );
      }

      setEditUser(null);
      setOpen(false);
      loadData();
    } catch (error) {
      showToastError(error.response?.data?.error || "Erro desconhecido");
    }
  }
  const columns = [
    {
      field: "username",
      headerName: "Nome de usuário",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nome Completo",
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
    {
      field: "roles",
      headerName: "Nível de Acesso",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Ação",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                handleOpen(cellValues.row);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="text"
              color="error"
              // onClick={(event) => {
              //   handleClick(event, cellValues)
              // }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

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
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="USUÁRIOS" subtitle="Veja a lista de usuários." />
        <Box>
          <Button
            onClick={handleOpen}
            startIcon={<PersonAddOutlinedIcon />}
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
            Novo usuário
          </Button>
          <ModalStyle
            maxHeight="90%"
            width="90%"
            open={open}
            onClose={handleClose}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastro de novo usuário
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
                      label="Usuário"
                      value={username}
                      onChange={handleUsername}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="text"
                      label="Nome"
                      value={name}
                      onChange={handleName}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="email"
                      label="E-mail"
                      value={email}
                      onChange={handleEmail}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="password"
                      label="Senha"
                      value={password}
                      onChange={handlePassword}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      type="text"
                      label="Departamento"
                      value={department}
                      onChange={handleDepartment}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Dropdown
                      label="Nível de Acesso"
                      value={roles}
                      onChange={handleRoles}
                    >
                      {ROLES.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Dropdown>
                  </Grid>
                  <Grid item xs={4}>
                    <Dropdown
                      label="Status"
                      value={active}
                      onChange={handleActive}
                    >
                      {ACTIVE.map((active) => (
                        <MenuItem key={active} value={active}>
                          {active}
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
                >
                  {editUser && editUser._id ? "Atualizar" : "Cadastrar"}
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
        mt="20px"
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
          rows={user.filter((row) =>
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
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
