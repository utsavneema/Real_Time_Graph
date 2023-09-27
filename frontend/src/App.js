import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css'; 

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/socket/data');
        // console.log(response);
        if (response.data.status) {
          const newData = {
            x: response.data.data.name,
            y1: response.data.data.value,
            y2: response.data.data.secondValue
          };
          setData((prevData) => [...prevData, newData]);
        } else {
          console.error('Error:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
    const interval = setInterval(getData, 5000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      id: 'real-time-chart',
      animations: {
        // type: 'line',
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 5000, 
        },
      },
      
    },
    xaxis: {
      type: 'category',
      categories: data.map((item) => item.x),
      labels: {
        show: true, 
      },
      axisBorder: {
        show: true, 
      },
      title: {
        text: 'Time', 
        style: {
          fontSize: '16px',
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true, 
      },
      title: {
        text: 'Numeric values', 
        style: {
          fontSize: '16px',
        },
      },
      
    },
    stroke: {
      curve: 'smooth'
    },
  };

  const series = [
    
    {
      name: '1st Value', 
      data: data.map((item) => item.y1), 
    },
    {
      name: '2nd Value', 
      data: data.map((item) => item.y2),
      color: '#00FF00' 
    },
  ];

  return (
    <div className='container' style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h2><b>Real Time Graph</b></h2>
      <ReactApexChart options={options} series={series} type='line' width={950} height={400} />
    </div>
  );
}



//         if (response.data.status) {
//           const newData = {
//              name: response.data.data.name,
//             value: response.data.data.value 
//           };
//         // console.log(newDataPoint);
//           setData(prevData => [...prevData, newData]);


//   return (
//     <div  className='container' style={{display: 'flex',flexDirection: 'column',
//       justifyContent: 'center', /* Center horizontally */
//       alignItems: 'center', height:'100vh'}}>
//         <h2><b>Real Time Graph</b></h2>
//       <LineChart
//         width={950}
//         height={400}
//         data={data}
//         // margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
//       >
//         <XAxis dataKey="name" />
//         <YAxis />
//label={{ value: 'numbers', angle: -90, position: 'insideLeft' }} 
//         <Tooltip />
//         <Legend />
//         <CartesianGrid stroke="#f5f5f5" />
//         <Line type="monotone" dataKey="value" stroke="blue" />
//       </LineChart>
//     </div>
//   );
// }

export default App;
// 