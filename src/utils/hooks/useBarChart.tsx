const useBarChart = () => {
  //   const [chartData, setChartData] = useState<object>(chartInfo);

  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Conference calls",
        data: [12, 19, 3, 5, 2, 3, 3],
        backgroundColor: "#7895FF",
      },
      {
        label: "Calls",
        data: [2, 3, 20, 5, 1, 4, 2],
        backgroundColor: "#FF92AE",
      },
      {
        label: "Chats",
        data: [3, 10, 13, 15, 22, 30, 6],
        backgroundColor: "#FFD18B",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return [data, options];
};

export default useBarChart;
