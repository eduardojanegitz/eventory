// import React from "react";
// import FlexBetween from "components/FlexBetween";
// import Header from "components/Header";
// import {
//   DownloadOutlined,
//   Email,
//   PointOfSale,
//   PersonAdd,
//   Traffic,
// } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Typography,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
// import StatBox from "components/StatBox";

// const Dashboard = () => {
//   const theme = useTheme();
//   const isNonMediumsScreens = useMediaQuery("(min-width: 1200px)");
//   const { data, isLoading } = useGetDashboardQuery();

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "userId",
//       headerName: "ID do usuário",
//       flex: 1,
//     },
//     {
//       field: "createdAt",
//       headerName: "Inventariado",
//       flex: 1,
//     },
//     {
//       field: "products",
//       headerName: "# dos itens",
//       flex: 0.5,
//       sortable: false,
//       renderCell: (params) => params.value.length,
//     },
//     {
//       field: "cost",
//       headerName: "Custo",
//       flex: 1,
//       renderCell: (params) => `${Number(params.value).toFixed(2)}`,
//     },
//   ];
//   return (
//     <Box m="1.5rem 2.5rem">
//       <FlexBetween>
//         <Header title="DASHBOARD" subtitle="Bem-vindo ao eventory" />

//         <Box>
//           <Button
//             sx={{
//               backgroundColor: theme.palette.secondary.light,
//               color: theme.palette.background.alt,
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             <DownloadOutlined sx={{ mr: "10px" }} />
//             Download Reports
//           </Button>
//         </Box>
//       </FlexBetween>
//       <Box
//         mt="20px"
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="160px"
//         gap="20px"
//         sx={{
//           "& > div": {
//             gridColumn: isNonMediumsScreens ? undefined : "span 12",
//           },
//         }}
//       >
//         <StatBox
//           title="Total de Clientes"
//           value={data && data.totalCustomers}
//           increase="+14%"
//           description="Desde o mês passado"
//           icon={
//             <Email
//               sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
//             />
//           }
//         />
//         <StatBox
//           title="Vendas de hoje"
//           value={data && data.todayStats.totalSales}
//           increase="+21%"
//           description="Desde o mês passado"
//           icon={
//             <PointOfSale
//               sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
//             />
//           }
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        // {
        //   field: "userId",
        //   headerName: "ID do usuário",
        //   flex: 1,
        // },
        {
          field: "createdAt",
          headerName: "Inventariado",
          flex: 1,
        },
        {
          field: "products",
          headerName: "Quantidade",
          flex: 0.5,
          sortable: false,
          renderCell: (params) => params.value.length,
        },
        // {
        //   field: "cost",
        //   headerName: "Custo",
        //   flex: 1,
        //   renderCell: (params) => `${Number(params.value).toFixed(2)}`,
        // },
      ]; 

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Bem vindo ao eventory" />

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
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
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
        {/* ROW 1 */}
        <StatBox
          title="Total de Ativos"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Desde o mês passado"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Valor total"
          // value={data && data.todayStats.totalSales}
          value="4770,98"
          increase="+21%"
          description="Desde o mês passado"
          icon={
            <PointOfSale
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
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Vida útil"
          // value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Desde o mês passado"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Alertas"
          // value={data && data.yearlySalesTotal}
          value="Veículos"
          increase="Manutenção"
          // description=""
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
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
            rows={(data && data.transactions) || []}
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
          <BreakdownChart isDashboard={true} />
          {/* <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;