const url = window.location.host;
const socket = new WebSocket(`ws://${url}/sensors`);

const dateFormat = (date) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
};

const chartData = (payload) => {
  return {
    labels: payload.created_on.map((v) => dateFormat(v)),
    datasets: [
      {
        name: "Voltage",
        values: payload.voltage,
      },
    ],
  };
};

const chartOps = (data) => {
  return {
    title: "Sensors Val - Voltage",
    data,
    type: "line",
    height: 480,
    colors: ["#7cd6fd", "#743ee2"],
    animate: false,
    lineOptions: {
      regionFill: 1,
      spline: 1,
    },
    tooltipOptions: {
      formatTooltipY: (d) => d + "  V",
    },
  };
};

let data;
socket.onmessage = (e) => {
  const values = JSON.parse(e.data);
  if (values.data) {
    data = chartData(values.data);
  }
  const chart = new frappe.Chart("#chart", chartOps(data));
  if (values.update) {
    const { voltage, created_on } = JSON.parse(values.update);
    chart.addDataPoint(dateFormat(created_on), [voltage], 15);
    chart.removeDataPoint(0);
  }
};
