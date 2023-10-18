import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  AddLocationAltOutlined
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TableViewIcon from '@mui/icons-material/TableView';
import InventoryIcon from '@mui/icons-material/Inventory';
import RuleIcon from '@mui/icons-material/Rule';
import BarChartIcon from '@mui/icons-material/BarChart';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import CategoryIcon from '@mui/icons-material/Category';

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    nav: "dashboard"
  },
  // {
  //   text: "Consulta",
  //   icon: null,
  // },
  {
    text: "Itens",
    icon: <ManageSearchIcon />,
    nav: "itens"
  },
  {
    text: "Grupo de Itens",
    icon: <CategoryIcon />,
    nav: "grupo-de-itens"
  },
  {
    text: "Usuários",
    icon: <Groups2Outlined />,
    nav: "usuarios"
  },
  {
    text: "Localização",
    icon: <AddLocationAltOutlined />,
    nav: "localizacao"
  },
  {
    text: "Movimentação",
    icon: <TransferWithinAStationIcon />,
    nav: "movimentacao"
  },
  // {
  //   text: "CC",
  //   icon: <TableViewIcon />,
  // },
  {
    text: "Inventários",
    icon: <InventoryIcon   />,
    nav: "inventarios"
  },
  {
    text: "Divergências",
    icon: <RuleIcon   />,
    nav: "divergencias"
  },
  {
    text: "Gráficos",
    icon: null,
  },
  {
    text: "Depreciação",
    icon: <BarChartIcon />,
    nav: "depreciacao"
  },
  {
    text: "Categorias",
    icon: <PieChartOutlined />,
    nav: "categorias"
  },
  // {
  //   text: "Leitura de etiquetas",
  //   icon: null,
  // },
  // {
  //   text: "Tags",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
];
const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItem="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    EVENTORY
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, nav }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem " }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText =
                  text.toLowerCase() &&
                  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${nav}`);
                        setActive(nav);
                      }}
                      sx={{
                        backgroundColor:
                          active === nav
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === nav
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === nav
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === nav  && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.department}
                  </Typography>
                  <SettingsOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  />
                </Box>
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
