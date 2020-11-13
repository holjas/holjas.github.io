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
    numberOfLocationChart(
      labelsData,
      currentSchoolsWithCasesData,
      currentLCCWithCasesData
    );
    newCasesChart(
      labelsData,
      newSchoolRelatedCasesData,
      newLCCRelatedCasesData
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

// seven day averages
function sevenDayAverage() {
  let num = newSchoolRelatedCases().reverse();
  let chunked = [];
  let results = [];
  // arrange the daily case numbers into 7 day block arrays
  while (num.length) {
    chunked.push(num.splice(0, 7));
  }

  // calcaulte the average of each block
  for (let i = 0; i < chunked.length; i++) {
    console.log(chunked[i][0]);
  }
}
// console.log(sevenDayAverage());
