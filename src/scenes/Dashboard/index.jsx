import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import { api2 } from "state/api";
import StatBox from "components/StatBox";
import TotalAssets from "components/TotalAssets";
import PieChart from "components/PieChart";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";

const Dashboard = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalByYear, setTotalByYear] = useState([]);
  const [averageAge, setAverageAge] = useState([]);

  useEffect(() => {
    api2.get("/api/inventory").then((response) => setInventory(response.data));

    api2.get("/api/item").then((response) => setItem(response.data));
    api2
      .get("/api/dashboard/item/lastmonth")
      .then((response) => setData(response.data));

    api2.get("/api/dashboard/item/total").then((response) => {
      console.log(response);
      if (response.data && response.data[0] && response.data[0].total) {
        setTotal(response.data[0].total);
      } else {
        setTotal(0);
      }
      api2.get("/api/dashboard/item/avaregeAssets").then((response) => {
        console.log(response.data.averageAge);
        if (response.data && response.data.averageAge) {
          setAverageAge(response.data.averageAge.toFixed(2));
        }
      });
    });

    api2
      .get("/api/dashboard/item/totalByYear")
      .then((response) => {
        const totalByYear =
          response.data && response.data[0] && response.data[0].total
            ? response.data[0].total
            : 0;
        setTotalByYear(totalByYear);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, []);
  const growth = ((item.length - data.length) / data.length) * 100;
  const formattedGrowth = `${growth.toFixed(1)}%`;

  const formatNumber = (value) => {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  const columns = [
    {
      field: "inventoryCode",
      headerName: "Inventário",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Inventariado",
      flex: 1,
      flex: 1,
      valueGetter: (params) => {
        const date = new Date(params.row.createdAt);
        return date.toLocaleString("pt-BR");
      },
    },
    {
      field: "user",
      headerName: "Responsável",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle="Bem vindo ao EVENTORY."
          date={today}
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total de ativos"
          value={item.length}
          increase={`+${formattedGrowth}`}
          description="Desde o mês passado"
          icon={
            <AssessmentOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <TotalAssets
          title="Valor total"
          value={`R$ ${formatNumber(total)}`}
          description="Total em R$ dos ativos"
          icon={
            <MonetizationOnOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <BreakdownChart isDashboard={true} />
        </Box>
        <StatBox
          title="Valor total no ano"
          value={`R$ ${formatNumber(totalByYear)}`}
          description="Valor total de aquisições no ano"
          icon={
            <DateRangeIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Idade média do ativo"
          value={averageAge}
          description="Idade média do ativo imobilizado"
          icon={
            <HourglassEmptyOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
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
            rows={inventory || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Itens por grupos
          </Typography>
          <PieChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
