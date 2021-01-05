import { longtermdata } from "./datafiles/longtermcare.js";

let dateLabels = collectedDates(longtermdata);
let activeLTCResidentCases = currentResidentCases(longtermdata);
let activeHCWCases = currentHCWCases(longtermdata);
let totalLTCDeathData = totalLTCDeaths(longtermdata);

numberOfLocationChart(
  dateLabels,
  activeLTCResidentCases,
  activeHCWCases,
  totalLTCDeathData
);

function numberOfLocationChart(
  dateLabels,
  activeLTCResidentCases,
  activeHCWCases,
  totalLTCDeathData
) {
  const totalctx = document
    .getElementById("longTermTotalChart")
    .getContext("2d");
  const totalChart = new Chart(totalctx, {
    type: "line",
    fill: "true",
    data: {
      labels: dateLabels,

      datasets: [
        {
          label: "Active LTC Resident Cases",
          backgroundColor: ["rgb(91, 192, 222)"],
          borderColor: ["rgb(91, 192, 222)"],
          data: activeLTCResidentCases,
          fill: false,
        },
        {
          label: "Active HCW Cases",
          backgroundColor: ["rgba(240, 173, 78, 0.2)"],
          borderColor: ["rgba(240, 173, 78, 1)"],
          data: activeHCWCases,
          fill: false,
        },
        {
          label: "Total LTC Resident Deaths",
          backgroundColor: ["rgba(240, 92, 78, 0.2)"],
          borderColor: ["rgba(240, 92, 78, 1)"],
          data: totalLTCDeathData,
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Summary of Long Term Care Home Cases and Deaths",
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

//  pull dates
function collectedDates(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].Report_Data_Extracted.slice(5, 10));
  }
  return results;
}
// current # of LTC resident cases
function currentResidentCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].Confirmed_Active_LTC_Resident_Cases);
  }
  return results;
}
// current # of HCW  cases
function currentHCWCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].Confirmed_Active_LTC_HCW_Cases);
  }
  return results;
}
// current # of LTC deaths
function totalLTCDeaths(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].Total_LTC_Resident_Deaths);
  }
  return results;
}
