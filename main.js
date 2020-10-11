
var btnaddInfo = document.getElementById("addInfo");
var btnFetchInfo = document.getElementById("fetchInfo");
var selectedPersonValue="";
var selectedLeaveTypeValue="";
var selectedDateValue="";

function getSelectedPerson(){
  selectedPersonValue=document.getElementById("personList").value;
  console.log(selectedPersonValue);
}

function getSelectedLeaveType(){
  selectedLeaveTypeValue=document.getElementById("leaveTypeList").value;
  console.log(selectedLeaveTypeValue);
}

function getSelectedDate(){
  selectedDateValue=document.getElementById("startDate").value;
  console.log(selectedDateValue);
}

function updateJSONFile(){
  const fs=require('fs');
  fs.writeFileSync('data.json',"hello");

  // location.reload();
}

btnaddInfo.addEventListener("click", function () {
  var myRequest = new XMLHttpRequest();
  myRequest.open("GET", "data.json");
  myRequest.onload = function () {
    var jsonData = JSON.parse(myRequest.responseText);
    displayAddData(jsonData);
  };
  myRequest.send();
});

btnFetchInfo.addEventListener("click", function () {
  var myRequest = new XMLHttpRequest();
  myRequest.open("GET", "data.json");
  myRequest.onload = function () {
    var jsonData = JSON.parse(myRequest.responseText);
    displayData(jsonData);
  };
  myRequest.send();
});

function displayAddData(jsonData){
  var addDataDiv = "<div class='container'>";
  addDataDiv += "<table class='table'>";
  addDataDiv += "<tr>";
  addDataDiv += "<td>Select Person</td>";
  addDataDiv += "<td><select id='personList' onChange='getSelectedPerson()' class='btn btn-primary dropdown-toggle'>";
  addDataDiv += "<option value=''>Select an Option</option>";
  for (var i = 0; i < jsonData.length; i++) {
    addDataDiv += "<option value='"+jsonData[i].name+"'>"+jsonData[i].name+"</option>";
  }
  addDataDiv += "</select>";
  addDataDiv += "</td></tr>";
  addDataDiv += "<tr>";
  addDataDiv += "<td>Select Leave Type</td>";
  addDataDiv += "<td><select id='leaveTypeList' onChange='getSelectedLeaveType();' class='btn btn-success dropdown-toggle'>";
  addDataDiv += "<option value=''>Select an Option</option>";
  var count=0;
  for (var key in jsonData[0]) {
    if(count>0){
      addDataDiv += "<option value='"+key+"'>"+key+"</option>";
    }
    count=1;
  }
  addDataDiv += "</select>";
  addDataDiv += "</td></tr>";
  addDataDiv += "<tr>";
  addDataDiv += "<td>Select Date</td>";
  addDataDiv += "<td><input type='date' name='startDate' id='startDate' onChange='getSelectedDate();'></td>";
  addDataDiv += "</tr>";
  addDataDiv += "<tr><td colspan='2' align='center'><button type='button' id='submitNewData' class='btn btn-warning' onClick='updateJSONFile();'>Add Leaves Data</button></td></tr>";
  addDataDiv += "</table></div>";
  document.getElementById("addJSONData").innerHTML = addDataDiv;
}

function displayData(jsonData) {
  var htmlTable = "<table class='table'>";
  htmlTable += "<tr><th>Name</th><th>Casual Leaves</th><th>Vacation Leaves</th><th>Sick Leaves</th><th>Maternity Leaves</th><th>Paternity Leaves</th><th>Comp Off Leaves</th><th>First Half Leaves</th><th>Second Half Leaves</th><th>Total Leaves</th></tr>";
  for (var i = 0; i < jsonData.length; i++) {
    htmlTable += "<tr>";
    htmlTable += "<td>" + jsonData[i].name + "</td>";
    htmlTable += "<td>" + (jsonData[i].casualLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].vacationLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].sickLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].maternityLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].paternityLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].compOffLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].firstHalfLeaves.length) + "</td>";
    htmlTable += "<td>" + (jsonData[i].secondHalfLeaves.length) + "</td>";
    htmlTable += "<td>" +
      ((jsonData[i].casualLeaves.length) +
        (jsonData[i].vacationLeaves.length) +
        (jsonData[i].sickLeaves.length) +
        (jsonData[i].maternityLeaves.length) +
        (jsonData[i].paternityLeaves.length) +
        (jsonData[i].compOffLeaves.length) +
        (jsonData[i].firstHalfLeaves.length) +
        (jsonData[i].secondHalfLeaves.length)) +
      "</td>";
    htmlTable += "</tr>";
  }
  htmlTable += "</table>";
  document.getElementById("addJSONData").innerHTML = "";
  document.getElementById("getResult").innerHTML = htmlTable;
}
