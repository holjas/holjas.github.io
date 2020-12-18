import { schooldata } from "./datafiles/schooldata.js";
import { schooldatasummary } from "./datafiles/schooldatasummary.js";
// import { lccdata } from "./lccdata";
import { lccdatasummary } from "./datafiles/lccdatasummary.js";

const spantotalschoolcases = document.getElementById("spantotalschoolcases");
const spantotalschoolpercentage = document.getElementById(
  "spantotalschoolpercentage"
);
let schoolBoardctxLabels = [];
let schoolBoardctxData = [];
//these are the functions that pull out the data. Then are assigned to the chart functions.
let labelsData = collectedDates(schooldatasummary);
let currentSchoolLocationsWithCasesData = currentSchoolLocationsWithCases(
  schooldatasummary
);
let currentLCCLocationsWithCasesData = currentLCCLocationsWithCases(
  lccdatasummary
);
let newSchoolRelatedCasesData = newSchoolRelatedCases(schooldatasummary);
let newLCCRelatedCasesData = newLCCRelatedCases(lccdatasummary);
let countSchoolBoardData = countSchoolBoard(schooldata);

//these are the charts with the data(as processed above) fed into them
numberOfLocationChart(
  labelsData,
  currentSchoolLocationsWithCasesData,
  currentLCCLocationsWithCasesData
);
numberOfNewCasesChart(
  labelsData,
  newSchoolRelatedCasesData,
  newLCCRelatedCasesData
);
casesBySchoolBoard(schoolBoardctxLabels, schoolBoardctxData);
// dates
function collectedDates(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].reported_date.slice(5, 10));
  }
  return results;
}
// NUMBER OF LOCATIONS WITH CASES
// current # of school locations
function currentSchoolLocationsWithCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].current_schools_w_cases);
  }
  spantotalschoolcases.textContent = results[results.length - 1];
  spantotalschoolpercentage.textContent =
    ((results[results.length - 1] / 4828) * 100).toFixed(2) + "%";
  return results;
}
// current # of LCC locations
function currentLCCLocationsWithCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].current_lcc_centres_w_cases);
  }
  return results;
}
// CHART current # of locations
function numberOfLocationChart(labels, schools, lcc) {
  const totalctx = document
    .getElementById("schoolsTotalChart")
    .getContext("2d");
  const totalChart = new Chart(totalctx, {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          label: "Elementary & Secondary Schools",
          backgroundColor: ["rgba(91, 192, 222, 0.2)"],
          borderColor: ["rgba(91, 192, 222, 1)"],
          data: schools,
          fill: false,
        },
        {
          label: "Licensed Child Care Settings",
          backgroundColor: ["rgba(240, 173, 78, 0.2)"],
          borderColor: ["rgba(240, 173, 78, 1)"],
          data: lcc,
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text:
          "Current Number of Locations with Active Cases (by reporting date)",
      },
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
}
// NEW CASES REPORTED
// new school reported cases
function newSchoolRelatedCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].new_total_school_related_cases);
  }
  return results;
}
// new LCC reported cases
function newLCCRelatedCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].new_total_lcc_related_cases);
  }
  return results;
}
//calculate n-Day Simple moving average
function simpleMovingAVG([...dataObjArray], timePeriods) {
  const masterLength = dataObjArray.length;
  let arrayLength = dataObjArray.length;
  let sum = 0;
  let result = false;
  let final = [];

  dataObjArray.reverse();
  while (arrayLength >= timePeriods) {
    for (var i = 0; i < timePeriods; i++) {
      sum += dataObjArray[i];
    }
    result = parseFloat(sum) / parseFloat(timePeriods);

    sum = 0;
    final.push(result.toFixed());
    arrayLength--;
    dataObjArray.shift();
  }
  while (final.length <= masterLength - 1) {
    final.push("-");
  }
  return final.reverse();
}
// daily new cases chart
function numberOfNewCasesChart(labels, schoolCases, lccCases) {
  const dailyctx = document
    .getElementById("schoolsdailyChart")
    .getContext("2d");
  const dailyChart = new Chart(dailyctx, {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          label: "Elementary & Secondary Schools 7 Day Average",
          backgroundColor: ["rgba(89,35,76 1)"],
          borderColor: ["rgba(89,35,76, 1"],
          borderDash: [7, 5],
          data: simpleMovingAVG(schoolCases, 7),
          fill: false,
        },
        {
          label: "Elementary & Secondary Schools",
          backgroundColor: ["rgba(222,91,192, 0.2)"],
          borderColor: ["rgba(222,91,192, 1)"],
          data: schoolCases,
          fill: false,
        },

        {
          label: "Licensed Child Care Settings",
          backgroundColor: ["rgba(192,222,91,0.2)"],
          borderColor: ["rgba(192,222,91, 1)"],
          data: lccCases,
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "New Reported Cases (by reporting date)",
      },
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
}
// CASES BY SCHOOL BOARD
//

function countSchoolBoard(array) {
  let arrayLength = array.result.records.length;
  let pulldata = [];
  let sortdata = [];
  let final = [];
  for (let i = 0; i < arrayLength; i++) {
    pulldata.push(array.result.records[i].school_board.trim());
  }

  sortdata = Object.entries(
    pulldata.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    )
  );
  for (let i = 0; i < sortdata.length; i++) {
    final.push({ num: sortdata[i][1], school: sortdata[i][0] });
  }
  schoolBoardctxLabels = final
    .sort((a, b) => b.num - a.num)
    .map((item) => item.school);
  schoolBoardctxData = final
    .sort((a, b) => b.num - a.num)
    .map((item) => item.num);
}

function casesBySchoolBoard(ctxLabels, ctxData) {
  const schoolBoardctx = document
    .getElementById("schoolBoardChart")
    .getContext("2d");
  const schoolBoardChart = new Chart(schoolBoardctx, {
    type: "horizontalBar",
    data: {
      labels: ctxLabels.slice(0, [ctxLabels.length - 30]),
      datasets: [
        {
          label: "Cases by School Board (>40 cases not shown)",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: ctxData.slice(0, [ctxLabels.length - 30]),
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 8,
              padding: 0,
            },
          },
        ],
      },
    },
  });
}
