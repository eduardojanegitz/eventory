import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/Layout";
import Dashboard from "scenes/Dashboard";
import Products from "scenes/Items";
import CostCenter from "scenes/CostCenter";
import Users from "scenes/Users";
import Overview from "scenes/Overview";
import Breakdown from "scenes/Breakdown";
import Tags from "scenes/Tags";
import NewItem from "scenes/NewItem";
import NewUser from "scenes/NewUser";
import AssetMovement from "scenes/AssetMovement";
import NewMovement from "scenes/NewMovement";
import Cost from "scenes/Cost";
import LoginPage from "scenes/LoginPage";
import PersistLogin from "state/auth/persistLogin";
import RequireAuth from "state/auth/requireAuth";
import { ToastContainer } from "react-toastify";
import Missing from "components/Missing";
import Unauthorized from "components/Unauthorized";
import Home from "components/Home";
import Divergences from "scenes/Divergences";
import Location from "scenes/Location";
import Depreciation from "scenes/Depreciation";
import ItemGroup from "scenes/ItemGroup";
import Inventory from "scenes/Inventory";

const ROLES = {
  Employee: "Employee",
  Manager: "Manager",
  Admin: "Admin",
};

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route path="/inventarios" element={<Inventory />} />
                <Route path="/tags" element={<Tags />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/usuarios" element={<Users />} />
                <Route path="/novo-usuario" element={<NewUser />} />
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/itens" element={<Products />} />
                <Route path="/centro-de-custo" element={<CostCenter />} />
                <Route path="/localizacao" element={<Location />} />
                <Route path="/novo-item" element={<NewItem />} />
                <Route path="/Movimentacao" element={<AssetMovement />} />
                <Route path="/new-movement" element={<NewMovement />} />
                <Route path="/depreciacao" element={<Depreciation />} />
                <Route path="/grupo-de-itens" element={<ItemGroup />} />
                <Route path="/itens-centro-de-custo" element={<Breakdown />} />
                <Route path="/itens-por-grupo" element={<Overview />} />
                <Route path="/divergencias" element={<Divergences />} />
              </Route>
              <Route path="*" element={<Missing />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
