// import React, { useMemo } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { useTheme } from "@mui/material";
// import { useGetItemsQuery } from "state/api";
// import { ResponsiveBar } from "@nivo/bar";

// const OverviewChart = ({ isDashboard = false, view }) => {
//   const theme = useTheme();
//   const { data, isLoading } = useGetItemsQuery();

//   const [totalSalesLine, totalUnitsLine] = useMemo(() => {
//     if (!data) return [];

//     const { monthlyData } = data;
//     const totalSalesLine = {
//       id: "totalSales",
//       color: theme.palette.secondary.main,
//       data: [],
//     };
//     const totalUnitsLine = {
//       id: "totalUnits",
//       color: theme.palette.secondary[600],
//       data: [],
//     };

//     Object.values(monthlyData).reduce(
//       (acc, { month, totalSales, totalUnits }) => {
//         const curSales = acc.sales + totalSales;
//         const curUnits = acc.units + totalUnits;

//         totalSalesLine.data = [
//           ...totalSalesLine.data,
//           {
//             x: month,
//             y: curSales,
//           },
//         ];
//         totalUnitsLine.data = [
//           ...totalUnitsLine.data,
//           {
//             x: month,
//             y: curUnits,
//           },
//         ];

//         return { sales: curSales, units: curUnits };
//       },
//       { sales: 0, units: 0 }
//     );
//     return [[totalSalesLine], [totalUnitsLine]];
//   }, [data]);

//   if (!data || isLoading) return "Carregando...";

//   return (
//     <ResponsiveBar
//       data={view === "items" ? totalSalesLine : totalUnitsLine}
//       theme={{
//         axis: {
//           domain: {
//             line: {
//               stroke: theme.palette.secondary[200],
//             },
//           },
//           legend: {
//             text: {
//               fill: theme.palette.secondary[200],
//             },
//           },
//           ticks: {
//             line: {
//               stroke: theme.palette.secondary[200],
//               strokeWidth: 1,
//             },
//             text: {
//               fill: theme.palette.secondary[200],
//             },
//           },
//         },
//         legends: {
//           text: {
//             fill: theme.palette.secondary[200],
//           },
//         },
//         tooltip: {
//           container: {
//             color: theme.palette.primary.main,
//           },
//         },
//       }}
//       // margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
//       // groupMode="grouped"
//       // layout="horizontal"
//       // valueScale={{ type: 'linear' }}
//       // indexScale={{ type: 'band', round: true }}
//       // colors={{ scheme: 'nivo' }}
//       // defs={[
//       //     {
//       //         id: 'dots',
//       //         type: 'patternDots',
//       //         background: 'inherit',
//       //         color: '#38bcb2',
//       //         size: 4,
//       //         padding: 1,
//       //         stagger: true
//       //     },
//       //     {
//       //         id: 'lines',
//       //         type: 'patternLines',
//       //         background: 'inherit',
//       //         color: '#eed312',
//       //         rotation: -45,
//       //         lineWidth: 6,
//       //         spacing: 10
//       //     }
//       // ]}
//       // fill={[
//       //     {
//       //         match: {
//       //             id: 'fries'
//       //         },
//       //         id: 'dots'
//       //     },
//       //     {
//       //         match: {
//       //             id: 'sandwich'
//       //         },
//       //         id: 'lines'
//       //     }
//       // ]}
//       // borderColor={{
//       //     from: 'color',
//       //     modifiers: [
//       //         [
//       //             'darker',
//       //             1.6
//       //         ]
//       //     ]
//       // }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'country',
//           legendPosition: 'middle',
//           legendOffset: 32
//       }}
//       axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'food',
//           legendPosition: 'middle',
//           legendOffset: -40
//       }}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{
//           from: 'color',
//           modifiers: [
//               [
//                   'darker',
//                   1.6
//               ]
//           ]
//       }}
//       legends={[
//           {
//               dataFrom: 'keys',
//               anchor: 'bottom-right',
//               direction: 'column',
//               justify: false,
//               translateX: 120,
//               translateY: 0,
//               itemsSpacing: 2,
//               itemWidth: 100,
//               itemHeight: 20,
//               itemDirection: 'left-to-right',
//               itemOpacity: 0.85,
//               symbolSize: 20,
//               effects: [
//                   {
//                       on: 'hover',
//                       style: {
//                           itemOpacity: 1
//                       }
//                   }
//               ]
//           }
//       ]}
//       role="application"
//       ariaLabel="Nivo bar chart demo"
//       barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}


//       xScale={{ type: "point" }}
//       yScale={{
//         type: "linear",
//         min: "auto",
//         max: "auto",
//         stacked: false,
//         reverse: false,
//       }}
//       yFormat=" >-.2f"
//       curve="catmullRom"
//       enableArea={isDashboard}
//       // axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         format: (v) => {
//           if (isDashboard) return v.slice(0, 3);
//           return v;
//         },
//         orient: "bottom",
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? "" : "Month",
//         legendOffset: 36,
//         legendPosition: "middle",
//       }}
//       axisLeft={{
//         orient: "left",
//         tickValues: 5,
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard
//           ? ""
//           : `Total ${view === "items" ? "Revenue" : "Units"} for Year`,
//         legendOffset: -60,
//         legendPosition: "middle",
//       }}
//       enableGridX={false}
//       enableGridY={false}
//       pointSize={10}
//       pointColor={{ theme: "background" }}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: "serieColor" }}
//       pointLabelYOffset={-12}
//       useMesh={true}
//       legends={
//         !isDashboard
//           ? [
//               {
//                 anchor: "bottom-right",
//                 direction: "column",
//                 justify: false,
//                 translateX: 30,
//                 translateY: -40,
//                 itemsSpacing: 0,
//                 itemDirection: "left-to-right",
//                 itemWidth: 80,
//                 itemHeight: 20,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: "circle",
//                 symbolBorderColor: "rgba(0, 0, 0, .5)",
//                 effects: [
//                   {
//                     on: "hover",
//                     style: {
//                       itemBackground: "rgba(0, 0, 0, .03)",
//                       itemOpacity: 1,
//                     },
//                   },
//                 ],
//               },
//             ]
//           : undefined
//       }
//     />
//   );
// };

// export default OverviewChart;

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetDashboardQuery } from "state/api";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetDashboardQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
