// current # of locations with cases
const totalctx = document.getElementById("totalChart").getContext("2d");
const totalChart = new Chart(totalctx, {
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
      "22-10",
      "23-10",
      "26-10",
      "27-10",
      "28-10",
      "29-10",
      "30-10",
      "02-11",
      "03-11",
      "04-11",
      "05-11",
      "06-11",
      "09-11",
      "10-11",
      "11-11",
    ],

    datasets: [
      {
        label: "Current # of Schools with Cases",
        backgroundColor: ["rgba(91, 192, 222, 0.2)"],
        borderColor: ["rgba(91, 192, 222, 1)"],
        data: [
          306,
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
          514,
          548,
          593,
          595,
          581,
          551,
          558,
          578,
          581,
          580,
          582,
          565,
          601,
          654,
        ],
        fill: false,
      },
      {
        label: "Current # of Daycare Centers with Cases",
        backgroundColor: ["rgba(240, 173, 78, 0.2)"],
        borderColor: ["rgba(240, 173, 78, 1)"],
        data: [
          59,
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
          133,
          131,
          137,
          139,
          135,
          131,
          125,
          122,
          115,
          118,
          118,
          120,
          120,
          126,
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
// daily new case counts
const dailyctx = document.getElementById("dailyChart").getContext("2d");
const dailyChart = new Chart(dailyctx, {
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
      "22-10",
      "23-10",
      "26-10",
      "27-10",
      "28-10",
      "29-10",
      "30-10",
      "02-11",
      "03-11",
      "04-11",
      "05-11",
      "06-11",
      "09-11",
      "10-11",
      "11-11",
    ],

    datasets: [
      {
        label: "New Total School Related Cases",
        backgroundColor: ["rgba(222,91,192, 0.2)"],
        borderColor: ["rgba(222,91,192, 1)"],
        data: [
          64,
          36,
          56,
          74,
          111,
          100,
          56,
          72,
          96,
          109,
          98,
          74,
          121,
          144,
          74,
          72,
          72,
          144,
          92,
          99,
          61,
          69,
          134,
          116,
          68,
          85,
          79,
          159,
          198,
        ],
        fill: false,
      },
      {
        label: "New Total Child Care Related Cases",
        backgroundColor: ["rgba(192,222,91,0.2)"],
        borderColor: ["rgba(192,222,91, 1)"],
        data: [
          8,
          12,
          14,
          17,
          23,
          6,
          20,
          10,
          15,
          20,
          11,
          10,
          21,
          19,
          7,
          8,
          9,
          26,
          9,
          16,
          9,
          6,
          23,
          16,
          20,
          8,
          10,
          22,
          19,
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
// 7 day rolling average
function dateArray() {
  return totalChart.data.labels.reverse();
}

function chunkArray(myArray) {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];
  let chunk_size = 7;

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
}

console.log(chunkArray([1, 2, 3]));
console.log(chunkArray(dateArray()));

function calculateSevenAverage() {}
console.log(calculateSevenAverage());
