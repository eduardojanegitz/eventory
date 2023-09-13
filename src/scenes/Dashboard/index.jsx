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
import React, { useState } from "react";
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
import { useGetDashboardQuery, useGetProductsQuery } from "state/api";
import StatBox from "components/StatBox";
import TotalAssets from "components/TotalAssets";
import PieChart from "components/PieChart";
import SummarizeIcon from '@mui/icons-material/Summarize';
import ErrorIcon from '@mui/icons-material/Error';
import DateRangeIcon from '@mui/icons-material/DateRange';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
};

const Dashboard = () => {

  const date = new Date();
  const today = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  // const { data, isLoading } = useGetProductsQuery();

  const itensAnterior = 100;
  const itensAtuais = 120;

  const crescimento = ((itensAtuais - itensAnterior) / itensAnterior) * 100;

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
      {/* {data.map(
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
            ))
} */}
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Bem vindo ao EVENTORY." date={today}/>

        {/* <Box>
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
        </Box> */}
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
          title="Total de ativos"
          // value={data && data.totalCustomers}
          // value={data && data.}s
          value="2"
          increase="+20%"
          description="Desde o mês passado"
          icon={
            <SummarizeIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <TotalAssets
          title="Valor total"
          // value={data && data.todayStats.totalSales}
          // value={data[0].price + data[1].price}
          // value="4770,98"
          value="7000"
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
          {/* <OverviewChart view="sales" isDashboard={true} /> */}
          <BreakdownChart isDashboard={true} />
        </Box>
        <StatBox
          title="Idade média do ativo"
          // value={data }
          value="4"
          increase="+5%"
          description="Desde o mês passado"
          icon={
            <DateRangeIcon
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
            <ErrorIcon
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
            // loading={isLoading || !data}
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
          {/* <BreakdownChart isDashboard={true} /> */}
          <PieChart isDashboard={true}/>

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
