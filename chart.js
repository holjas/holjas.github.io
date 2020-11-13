let proxyUrl = "https://cors-anywhere.herokuapp.com/";
let schoolSummaryDataTargetUrl =
  "https://data.ontario.ca/api/3/action/datastore_search?resource_id=7fbdbb48-d074-45d9-93cb-f7de58950418&limit=1000";
let lccSummaryDataTargetUrl =
  "https://data.ontario.ca/api/3/action/datastore_search?resource_id=74f9ac9f-7ca8-4860-b2c3-189a2c25e30c&limit=1000";

// FETCH School Summary of Cases
const schoolSummaryData = async () => {
  // console.log("Processing Schools...");
  const request = await fetch(proxyUrl + schoolSummaryDataTargetUrl);
  const data = await request.json();
  return data;
};
const LCCSummaryData = async () => {
  // console.log("Processing LCC...");
  const request = await fetch(proxyUrl + lccSummaryDataTargetUrl);
  const data = await request.json();
  return data;
};

schoolSummaryData().then((schoolData) => {
  LCCSummaryData().then((LCCdata) => {
    // console.log("Data Returned", LCCdata.result.records);
    // console.log("Data Returned", data.result.records);
    let labelsData = collectedDates(schoolData);
    let newSchoolRelatedCasesData = newSchoolRelatedCases(schoolData);
    let currentSchoolsWithCasesData = currentSchoolsWithCases(schoolData);
    let newLCCRelatedCasesData = newLCCRelatedCases(LCCdata);
    let currentLCCWithCasesData = currentLCCWithCases(LCCdata);
    // let simpleMovingAVGData = simpleMovingAVG(newSchoolRelatedCasesData, 7);
    numberOfLocationChart(
      labelsData,
      currentSchoolsWithCasesData,
      currentLCCWithCasesData
    );
    newCasesChart(
      labelsData,
      newSchoolRelatedCasesData,
      newLCCRelatedCasesData
      // simpleMovingAVGData
    );
  });
});

// current # of locations with cases chart
function numberOfLocationChart(labels, schools, lcc) {
  const totalctx = document.getElementById("totalChart").getContext("2d");
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

// daily new cases chart
function newCasesChart(labels, schoolCases, lccCases) {
  const dailyctx = document.getElementById("dailyChart").getContext("2d");
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

// dates
function collectedDates(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].reported_date.slice(5, 10));
  }
  return results;
}

// current # of schools with active cases
function currentSchoolsWithCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].current_schools_w_cases);
  }
  return results;
}

// daily new school cases
function newSchoolRelatedCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].new_total_school_related_cases);
  }
  return results;
}

// current # of LCC with active cases
function currentLCCWithCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].current_lcc_centres_w_cases);
  }
  return results;
}

//daily new LCC cases
function newLCCRelatedCases(array) {
  let arrayLength = array.result.records.length;
  let results = [];
  for (let i = 0; i < arrayLength; i++) {
    results.push(array.result.records[i].new_total_lcc_related_cases);
  }
  return results;
}

// Function to calculate n-Day Simple moving average
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
