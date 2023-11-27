import Menu from '../../components/Menu/Menu.jsx';
import "./Graphs.css";

import Slider from "react-styled-carousel";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";


import React, { useContext, useEffect, useState } from "react";

import {
  getAllCribroomsWithoutDepth,
  getAllLocalities,
  handlePermissions,
  getUserHistory,
} from "../../api/salasCuna.api";

//DataGrid Import
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import AuthContext from "../../context/AuthContext";
//linechart
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';


export default function Graphs() {
  const [cribrooms, setCribrooms] = useState([]);
  const [filteredCribroom, setFilteredCribroom] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userhistory, setUserHistory] = useState([]);

//Scatter
const dato = [
  {
    id: 'data-0',
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: 'data-1',
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: 'data-2',
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
  {
    id: 'data-3',
    x1: 159.44,
    x2: 384.85,
    y1: 195.97,
    y2: 325.12,
  },
  {
    id: 'data-4',
    x1: 188.86,
    x2: 182.27,
    y1: 351.77,
    y2: 144.58,
  },
  {
    id: 'data-5',
    x1: 143.86,
    x2: 360.22,
    y1: 43.253,
    y2: 146.51,
  },
  {
    id: 'data-6',
    x1: 202.02,
    x2: 209.5,
    y1: 376.34,
    y2: 309.69,
  },
  {
    id: 'data-7',
    x1: 384.41,
    x2: 258.93,
    y1: 31.514,
    y2: 236.38,
  },
  {
    id: 'data-8',
    x1: 256.76,
    x2: 70.571,
    y1: 231.31,
    y2: 440.72,
  },
  {
    id: 'data-9',
    x1: 143.79,
    x2: 419.02,
    y1: 108.04,
    y2: 20.29,
  },
  {
    id: 'data-10',
    x1: 103.48,
    x2: 15.886,
    y1: 321.77,
    y2: 484.17,
  },
  {
    id: 'data-11',
    x1: 272.39,
    x2: 189.03,
    y1: 120.18,
    y2: 54.962,
  },
  {
    id: 'data-12',
    x1: 23.57,
    x2: 456.4,
    y1: 366.2,
    y2: 418.5,
  },
  {
    id: 'data-13',
    x1: 219.73,
    x2: 235.96,
    y1: 451.45,
    y2: 181.32,
  },
  {
    id: 'data-14',
    x1: 54.99,
    x2: 434.5,
    y1: 294.8,
    y2: 440.9,
  },
  {
    id: 'data-15',
    x1: 134.13,
    x2: 383.8,
    y1: 121.83,
    y2: 273.52,
  },
  {
    id: 'data-16',
    x1: 12.7,
    x2: 270.8,
    y1: 287.7,
    y2: 346.7,
  },
  {
    id: 'data-17',
    x1: 176.51,
    x2: 119.17,
    y1: 134.06,
    y2: 74.528,
  },
  {
    id: 'data-18',
    x1: 65.05,
    x2: 78.93,
    y1: 104.5,
    y2: 150.9,
  },
  {
    id: 'data-19',
    x1: 162.25,
    x2: 63.707,
    y1: 413.07,
    y2: 26.483,
  },
  {
    id: 'data-20',
    x1: 68.88,
    x2: 150.8,
    y1: 74.68,
    y2: 333.2,
  },
  {
    id: 'data-21',
    x1: 95.29,
    x2: 329.1,
    y1: 360.6,
    y2: 422.0,
  },
  {
    id: 'data-22',
    x1: 390.62,
    x2: 10.01,
    y1: 330.72,
    y2: 488.06,
  },
];

 function BasicScatter() {
  return (
    <ScatterChart
      width={600}
      height={300}
      series={[
        {
          label: 'Series A',
          data: dato.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
        },
        {
          label: 'Series B',
          data: dato.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
        },
      ]}
    />
  );
}
//endscatter

//bar
const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 600,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value}mm`;

 function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
//endbar

  //linechart

  const worldElectricityProduction = [
    {
      country: 'World',
      year: 1985,
      other: 0,
      bio: 0,
      solar: 0.011747475,
      wind: 0.064220205,
      hydro: 1979.2446,
      nuclear: 1488.9216,
      oil: 1110.7847,
      gas: 1426.3086,
      coal: 3748.3848,
    },
    {
      country: 'World',
      year: 1986,
      other: 0,
      bio: 0,
      solar: 0.015183838,
      wind: 0.13883132,
      hydro: 2006.0651,
      nuclear: 1594.7357,
      oil: 1168.3097,
      gas: 1432.6683,
      coal: 3839.0095,
    },
    {
      country: 'World',
      year: 1987,
      other: 0,
      bio: 0,
      solar: 0.01060303,
      wind: 0.19537677,
      hydro: 2033.1884,
      nuclear: 1734.7332,
      oil: 1183.1947,
      gas: 1516.4941,
      coal: 4058.0767,
    },
    {
      country: 'World',
      year: 1988,
      other: 0,
      bio: 0,
      solar: 0.01019596,
      wind: 0.3315798,
      hydro: 2098.3518,
      nuclear: 1891.2493,
      oil: 1256.5684,
      gas: 1540.9414,
      coal: 4200.6743,
    },
    {
      country: 'World',
      year: 1989,
      other: 0,
      bio: 0,
      solar: 0.26222324,
      wind: 2.6497767,
      hydro: 2087.588,
      nuclear: 1945.0106,
      oil: 1350.2358,
      gas: 1728.5189,
      coal: 4376.982,
    },
    {
      country: 'World',
      year: 1990,
      other: 0,
      bio: 0,
      solar: 0.38834995,
      wind: 3.6324706,
      hydro: 2158.854,
      nuclear: 2000.596,
      oil: 1364.6844,
      gas: 1789.7031,
      coal: 4460.2417,
    },
    {
      country: 'World',
      year: 1991,
      other: 0,
      bio: 0,
      solar: 0.5053229,
      wind: 4.086107,
      hydro: 2208.702,
      nuclear: 2096.3098,
      oil: 1349.9071,
      gas: 1815.2444,
      coal: 4557.0664,
    },
    {
      country: 'World',
      year: 1992,
      other: 0,
      bio: 0,
      solar: 0.4666791,
      wind: 4.732812,
      hydro: 2208.4592,
      nuclear: 2112.223,
      oil: 1328.2163,
      gas: 1829.3868,
      coal: 4649.9165,
    },
    {
      country: 'World',
      year: 1993,
      other: 0,
      bio: 0,
      solar: 0.5566775,
      wind: 5.704169,
      hydro: 2341.4597,
      nuclear: 2184.9646,
      oil: 1266.6155,
      gas: 1863.8153,
      coal: 4727.899,
    },
    {
      country: 'World',
      year: 1994,
      other: 0,
      bio: 0,
      solar: 0.5969829,
      wind: 7.13173,
      hydro: 2356.203,
      nuclear: 2225.9788,
      oil: 1302.1187,
      gas: 1925.1002,
      coal: 4891.904,
    },
    {
      country: 'World',
      year: 1995,
      other: 0,
      bio: 0,
      solar: 0.63888276,
      wind: 8.272123,
      hydro: 2483.6868,
      nuclear: 2322.5298,
      oil: 1259.9452,
      gas: 2036.3821,
      coal: 5038.9316,
    },
    {
      country: 'World',
      year: 1996,
      other: 0,
      bio: 0,
      solar: 0.69922996,
      wind: 9.215601,
      hydro: 2517.03,
      nuclear: 2406.615,
      oil: 1245.6957,
      gas: 2101.594,
      coal: 5279.661,
    },
    {
      country: 'World',
      year: 1997,
      other: 0,
      bio: 0,
      solar: 0.7496558,
      wind: 12.028216,
      hydro: 2561.359,
      nuclear: 2390.0642,
      oil: 1244.647,
      gas: 2271.0615,
      coal: 5395.626,
    },
    {
      country: 'World',
      year: 1998,
      other: 0,
      bio: 0,
      solar: 0.811852,
      wind: 15.92926,
      hydro: 2581.1204,
      nuclear: 2431.1948,
      oil: 1294.6146,
      gas: 2408.5476,
      coal: 5511.2935,
    },
    {
      country: 'World',
      year: 1999,
      other: 0,
      bio: 0,
      solar: 0.9052879,
      wind: 21.226898,
      hydro: 2600.65,
      nuclear: 2523.7056,
      oil: 1266.6599,
      gas: 2600.75,
      coal: 5630.859,
    },
    {
      country: 'World',
      year: 2000,
      other: 52.37,
      bio: 148.65,
      solar: 1.08,
      wind: 31.16,
      hydro: 2621.36,
      nuclear: 2507.43,
      oil: 1209.51,
      gas: 2681.11,
      coal: 5719.12,
    },
    {
      country: 'World',
      year: 2001,
      other: 52.6,
      bio: 143.1,
      solar: 1.35,
      wind: 38.16,
      hydro: 2561.04,
      nuclear: 2573.71,
      oil: 1197.6,
      gas: 2827.65,
      coal: 5801.14,
    },
    {
      country: 'World',
      year: 2002,
      other: 54.08,
      bio: 156.61,
      solar: 1.69,
      wind: 52.04,
      hydro: 2601.39,
      nuclear: 2601.89,
      oil: 1175.58,
      gas: 3033.78,
      coal: 6056.12,
    },
    {
      country: 'World',
      year: 2003,
      other: 56.07,
      bio: 167.91,
      solar: 2.07,
      wind: 63.43,
      hydro: 2602.33,
      nuclear: 2577.71,
      oil: 1198.2,
      gas: 3165.78,
      coal: 6458.61,
    },
    {
      country: 'World',
      year: 2004,
      other: 57.94,
      bio: 184.54,
      solar: 2.71,
      wind: 85.26,
      hydro: 2796.69,
      nuclear: 2682.73,
      oil: 1177.47,
      gas: 3408.19,
      coal: 6697.61,
    },
    {
      country: 'World',
      year: 2005,
      other: 58.74,
      bio: 208.44,
      solar: 3.78,
      wind: 103.89,
      hydro: 2895.17,
      nuclear: 2686.95,
      oil: 1186.13,
      gas: 3579.99,
      coal: 7040.85,
    },
    {
      country: 'World',
      year: 2006,
      other: 60.11,
      bio: 220.96,
      solar: 5.11,
      wind: 132.79,
      hydro: 3001.53,
      nuclear: 2721.42,
      oil: 1097.06,
      gas: 3792.38,
      coal: 7439.88,
    },
    {
      country: 'World',
      year: 2007,
      other: 62.87,
      bio: 243.14,
      solar: 6.92,
      wind: 170.91,
      hydro: 3046.18,
      nuclear: 2666.92,
      oil: 1119.39,
      gas: 4109.47,
      coal: 7931.82,
    },
    {
      country: 'World',
      year: 2008,
      other: 65.97,
      bio: 258.44,
      solar: 11.36,
      wind: 220.07,
      hydro: 3231.07,
      nuclear: 2656.04,
      oil: 1078.99,
      gas: 4210.51,
      coal: 7927.59,
    },
    {
      country: 'World',
      year: 2009,
      other: 68.02,
      bio: 279.55,
      solar: 19.19,
      wind: 275.88,
      hydro: 3229.55,
      nuclear: 2619,
      oil: 1005.12,
      gas: 4247.72,
      coal: 7817.32,
    },
    {
      country: 'World',
      year: 2010,
      other: 68.38,
      bio: 322.22,
      solar: 31.05,
      wind: 345.99,
      hydro: 3412.33,
      nuclear: 2686.44,
      oil: 1011.78,
      gas: 4701.27,
      coal: 8358.6,
    },
    {
      country: 'World',
      year: 2011,
      other: 69.67,
      bio: 342.44,
      solar: 61.85,
      wind: 440.39,
      hydro: 3479.25,
      nuclear: 2575.35,
      oil: 1103.87,
      gas: 4767.24,
      coal: 8814.17,
    },
    {
      country: 'World',
      year: 2012,
      other: 70.88,
      bio: 370.87,
      solar: 95.18,
      wind: 529.11,
      hydro: 3645.02,
      nuclear: 2403.21,
      oil: 1157.13,
      gas: 5042.66,
      coal: 8855.83,
    },
    {
      country: 'World',
      year: 2013,
      other: 72.58,
      bio: 402.92,
      solar: 131.42,
      wind: 641.17,
      hydro: 3776.88,
      nuclear: 2418.44,
      oil: 1118.61,
      gas: 4939.52,
      coal: 9306.75,
    },
    {
      country: 'World',
      year: 2014,
      other: 77.68,
      bio: 438.47,
      solar: 196.46,
      wind: 716.51,
      hydro: 3865.63,
      nuclear: 2472.7,
      oil: 1063.74,
      gas: 5096.07,
      coal: 9495.57,
    },
    {
      country: 'World',
      year: 2015,
      other: 81.57,
      bio: 475.79,
      solar: 254.87,
      wind: 828.37,
      hydro: 3870.04,
      nuclear: 2502.45,
      oil: 1068.09,
      gas: 5418.55,
      coal: 9160.63,
    },
    {
      country: 'World',
      year: 2016,
      other: 83.91,
      bio: 483.77,
      solar: 329.15,
      wind: 959.65,
      hydro: 3996.54,
      nuclear: 2540.48,
      oil: 1004.96,
      gas: 5669.08,
      coal: 9226.85,
    },
    {
      country: 'World',
      year: 2017,
      other: 86.39,
      bio: 515.07,
      solar: 444.54,
      wind: 1136.41,
      hydro: 4053.96,
      nuclear: 2566.22,
      oil: 913.07,
      gas: 5791.83,
      coal: 9518.91,
    },
    {
      country: 'World',
      year: 2018,
      other: 89.54,
      bio: 546.21,
      solar: 570.57,
      wind: 1265.29,
      hydro: 4174.81,
      nuclear: 2619.57,
      oil: 841.34,
      gas: 6015.24,
      coal: 9899.44,
    },
    {
      country: 'World',
      year: 2019,
      other: 91.15,
      bio: 575.5,
      solar: 701.19,
      wind: 1419.51,
      hydro: 4220.11,
      nuclear: 2724.08,
      oil: 776.78,
      gas: 6176.34,
      coal: 9680.92,
    },
    {
      country: 'World',
      year: 2020,
      other: 94.16,
      bio: 602.57,
      solar: 850.89,
      wind: 1587.13,
      hydro: 4341.1,
      nuclear: 2634.69,
      oil: 741,
      gas: 6132.47,
      coal: 9292.9,
    },
    {
      country: 'World',
      year: 2021,
      other: 95,
      bio: 663.78,
      solar: 1040.06,
      wind: 1849.4,
      hydro: 4244.57,
      nuclear: 2740.78,
      oil: 793.53,
      gas: 6326,
      coal: 10081.8,
    },
    {
      country: 'World',
      year: 2022,
      other: 99.74,
      bio: 677.57,
      solar: 1289.27,
      wind: 2139.23,
      hydro: 4326.76,
      nuclear: 2610.04,
      oil: 884.98,
      gas: 6309.46,
      coal: 10190.71,
    },
  ];
  
  const keyToLabel = {
    coal: 'Electricity from coal (TWh)',
    gas: 'Electricity from gas (TWh)',
    oil: 'Electricity from oil (TWh)',
    nuclear: 'Electricity from nuclear (TWh)',
    hydro: 'Electricity from hydro (TWh)',
    wind: 'Electricity from wind (TWh)',
    solar: 'Electricity from solar (TWh)',
    bio: 'Electricity from bioenergy (TWh)',
    other: 'Other renewables excluding bioenergy (TWh)',
  };
  
  const colors = {
    other: 'lightgray',
    bio: 'lightgreen',
    solar: 'yellow',
    wind: 'lightblue',
    hydro: 'blue',
    nuclear: 'orange',
    oil: 'darkgrey',
    gas: 'gray',
    coal: 'black',
  };
  
  const stackStrategy = {
    stack: 'total',
    area: true,
    stackOffset: 'none', // To stack 0 on top of others
  };
  
  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: 'descending',
  };
  
 
   function LineDataset() {
    const seriesData = Object.keys(keyToLabel).map((key) => ({
      dataKey: key,
      label: keyToLabel[key],
      color: colors[key],
      showMark: false,
      ...stackStrategy,
    }));
  
    return (
      <LineChart
    width={600}
    height={300}
        xAxis={[
          {
            dataKey: 'year',
            valueFormatter: (v) => v.toString(),
            min: 1985,
            max: 2022,
          },
        ]}
        series={seriesData}
        dataset={worldElectricityProduction}
        {...customize}
      />
    );
  }
  //endlinechart
  const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
  ];
  
  function PieActiveArc() {
    return (
      <PieChart
      width={600}
      height={300}
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
      />
    );
  }
  //Piechart


  let {authTokens} = useContext(AuthContext);

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "JWT " + authTokens.access,
    "Accept": "application/json"
}

  useEffect(() => {
    listCribroom();
    listUserHistory();
  }, []);

  const listCribroom = async () => {
    try {
      const responseLocality = await getAllLocalities(authTokens.access);
      const response = await getAllCribroomsWithoutDepth(authTokens.access);
      const localityData = responseLocality.data;
      const cribroomData = response.data;
      const updatedCribrooms = await cribroomData.map((cribroom) => {
        const matchingLocality = localityData.find(
          (locality) => locality.id === cribroom.locality
        );
        if (matchingLocality) {
          return {
            ...cribroom,
            locality: matchingLocality.locality,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
          };
        } else {
          return {
            ...cribroom,
            is_active: cribroom.is_active ? "Activo" : "Inactivo",
          };
        }
      });
      setCribrooms(updatedCribrooms);
      setFilteredCribroom(updatedCribrooms);
    } catch (error) {
      console.log("Error fetching SalasCunas:", error);
      handlePermissions(error.response.status);
    }
  };
  const [variableQuantity, setVariableQuantity] = useState(1);

  const renderVariableSelectionForms = () => {
    const forms = [];

    for (let i = 1; i <= variableQuantity; i++) {
      forms.push(
        <div key={i} className="col-md-6 mb-3">
          <h3 className="subtitulo-graph">Elegir las variables:</h3>
          <Form.Select
            aria-label={`Variable ${i}`}
            className="mt-1"
            style={{ width: '200px', padding: '5px' }}
          >
            <option>Selecciona la variable {i}</option>
            <option value="1">Variable 1</option>
            <option value="2">Variable 2</option>
            <option value="3">Variable 3</option>
          </Form.Select>
        </div>
      );
    }

    return forms;
  };

  const listUserHistory = async () => {
    try {
      const userResponse = await getUserHistory(authTokens.access);
      console.log("USER HISTORY", userResponse.data[0]);
      setUserHistory(userResponse.data);
    } catch (error) {
      console.log(`ERROR USERHISTORY`, error);
    }
  };

  const responsive = [
    { breakPoint: 1280, cardsToShow: 5 },
    { breakPoint: 760, cardsToShow: 3 },
  ];

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_name",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "last_name",
      headerName: "Apellido",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "is_active",
      headerName: "Estado",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];


  return ( 
    <body>
            <header className="mb-5">
          <Menu />
      </header>
      <h1 className="titulo-home">Gráficos Director/a</h1>
      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <div className="contenedor-row">
          <div className="columna-izq">
            <h3 className="subtitulo-graph">Elegir la cantidad de variables:</h3>
            <Form.Select
              aria-label="Cantidad de Variables"
              className="mt-1"
              style={{ width: '200px', padding: '5px' }}
              onChange={(e) => setVariableQuantity(parseInt(e.target.value, 10))}
            >
             <option>Selecciona la cantidad</option>
              <option value="1">Una</option>{/* Acá rellenar las opciones con las preguntas del socio*/}
              <option value="2">Dos</option>
              <option value="3">Tres</option>
            </Form.Select>
          
            <h3 className="subtitulo-graph">Elegir el estado del niño</h3>
            <Form.Select aria-label="Cantidad de Variables" 
            className="mt-1" 
            style={{ width: '200px', padding: "5px" }}>
              <option>Selecciona el estado</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
              <option value="3">Todos</option>
            </Form.Select>
          </div>

          <div className="columna-der">
            {renderVariableSelectionForms()}
          </div>
        </div>

        <div className="data-grid-container">
          <h2>Datos de Cribrooms</h2>
          <DataGrid
            rows={[
              { id: 1, name: 'React' },
              { id: 2, name: 'MUI' },
            ]}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            components={{
              Toolbar: GridToolbar,
            }}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>


      <div className="contenedor-linea-home">
        <hr className="linea-home"></hr>
      </div>
      <div className="DataGrid-Wrapper">
        <div>
          <h4 className="datatitle"> Salas Cuna</h4>
<BasicScatter></BasicScatter>
        </div>
        <div>
          <h4 className="datatitle"> Actividad Reciente</h4>
<BarsDataset></BarsDataset>
        </div>

      </div>
      <div className="DataGrid-Wrapper">
      <div>
          <h4 className="datatitle"> Salas Cuna</h4>
<LineDataset></LineDataset>
        </div>
        <div>
          <h4 className="datatitle"> Actividad Reciente</h4>
<PieActiveArc></PieActiveArc>
        </div>

      </div>
    </body>
  );
}
