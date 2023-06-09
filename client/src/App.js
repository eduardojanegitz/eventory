import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/Layout";
import Dashboard from "scenes/Dashboard";
import Products from "scenes/Products";
import Customers from "scenes/Customers";
import Transactions from "scenes/Transactions";
import Overview from "scenes/Overview";
import Breakdown from "scenes/Breakdown";
import Tags from "scenes/Tags";
import NewItem from "scenes/NewItem";
import NewUser from "scenes/NewUser";
import AssetMovement from "scenes/AssetMovement";
import NewMovement from "scenes/NewMovement";
import Cost from "scenes/Cost";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/itens" element={<Products />} />
              <Route path="/novo-item" element={<NewItem />} />
              <Route path="/Movimentacao" element={<AssetMovement />} />
              <Route path="/new-movement" element={<NewMovement />} />
              <Route path="/novo-usuario" element={<NewUser />} />
              <Route path="/usuarios" element={<Customers />} />
              <Route path="/inventarios" element={<Transactions />} />
              <Route path="/depreciacao" element={<Overview />} />
              <Route path="/categorias" element={<Breakdown />} />
              <Route path="/cc" element={<Cost />} />
              <Route path="/tags" element={<Tags />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
