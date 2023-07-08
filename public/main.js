const url = window.location.host;
const socket = new WebSocket(`wss://${url}/sensors`);
const $canvas = document.getElementById("chart");

const dateFormat = (date) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
};

const chartData = (payload) => {
  return {
    labels: payload.created_on.reverse().map((v) => dateFormat(v)),
    datasets: [
      {
        label: "Voltage",
        data: payload.voltage.reverse(),
        backgroundColor: "rgb(97 148 254 / 40%)",
        borderColor: "#6194FE",
        borderWidth: 3,
        tension: 0.4,
        fill: "start",
      },
    ],
  };
};

const chartOps = (data) => {
  return {
    type: "line",
    data: data,
    options: {
      responsive: true,
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
          },
        },
      ],
      scales: {
        x: {
          title: {
            display: true,
            text: "Tiempo",
            color: "#233050",
            font: {
              size: 20,
              weight: "bold",
            },
            padding: { top: 10, left: 0, right: 0, bottom: 0 },
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Voltage",
            color: "#233050",
            font: {
              size: 20,
              weight: "bold",
            },
            padding: { top: 10, left: 0, right: 0, bottom: 0 },
          },
        },
      },
    },
  };
};

let data;
let chart;
socket.onmessage = (e) => {
  const values = JSON.parse(e.data);
  if (values.data) {
    data = chartData(values.data);
    chart = new Chart($canvas, chartOps(data));
  }
  if (values.update) {
    const { voltage, created_on } = JSON.parse(values.update);
    chart.data.labels.push(dateFormat(created_on));
    chart.data.datasets[0].data.push(voltage);
    chart.update();
  }
};
