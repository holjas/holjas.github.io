const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "01-10",
      "02-10",
      "05-10",
      "06-10",
      "07-10",
      "08-10",
      "09-10",
      "13-10",
      "14-10",
      "15-10",
      "16-10",
      "19-10",
      "20-10",
      "21-10",
    ],

    datasets: [
      {
        label: "Current # of Schools with Cases",
        backgroundColor: ["rgba(91, 192, 222, 0.2)"],
        borderColor: ["rgba(91, 192, 222, 1)"],
        data: [
          318,
          335,
          347,
          379,
          415,
          429,
          436,
          421,
          451,
          485,
          483,
          508,
          516,
          501,
        ],
        fill: false,
      },
      {
        label: "Current # of Daycare Centers with Cases",
        backgroundColor: ["rgba(240, 173, 78, 0.2)"],
        borderColor: ["rgba(240, 173, 78, 1)"],
        data: [
          68,
          76,
          88,
          101,
          101,
          107,
          107,
          119,
          129,
          127,
          122,
          128,
          133,
          135,
        ],
        fill: false,
      },
      //   {
      //     label: "Ontario Daily Cases (School days only)",
      //     backgroundColor: ["rgba(192,192,192, 0.2)"],
      //     borderColor: ["rgba(192,192,192, 1)"],
      //     data: [538, 732, 615, 548, 583, 797, 939, 746, 721, 783, 712, 704, 821],
      //     fill: false,
      //   },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
