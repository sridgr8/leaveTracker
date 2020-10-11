(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){

const uniqid = require('uniqid');
const fs = require('fs');
var btnaddInfo = document.getElementById("addInfo");
var btnFetchInfo = document.getElementById("fetchInfo");
var selectedPersonValue="";
var selectedLeaveTypeValue="";
var selectedDateValue="";

function getSelectedPerson(){
  selectedPersonValue=document.getElementById("personList").value;
//   console.log(selectedPersonValue);
}

function getSelectedLeaveType(){
  selectedLeaveTypeValue=document.getElementById("leaveTypeList").value;
  console.log(selectedLeaveTypeValue);
}

function getSelectedDate(){
  selectedDateValue=document.getElementById("startDate").value;
  console.log(selectedDateValue);
}

function loadJSON(fileName=''){
  return JSON.parse(
    fs.existsSync(fileName)
    ?fs.readFileSync(fileName).toString()
    :'""'
  );
}

function saveJSON(fileName='', json='""'){
  return fs.writeFileSync(fileName,JSON.stringify(json,null,2));
}

function updateJSONFile(){
  const data = loadJSON('data.json');

  for(i=0;i<data.length;i++){
    if((data[1].name).toString()==(selectedPersonValue).toString()){
      data[i].selectedLeaveTypeValue.push(selectedDateValue);
    }
  }

  saveJSON('data.json',data);

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
  addDataDiv += "<td><select id='personList' onChange='getSelectedPerson();' class='btn btn-primary dropdown-toggle'>";
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

},{"fs":1,"uniqid":5}],5:[function(require,module,exports){
(function (process){(function (){
/* 
(The MIT License)
Copyright (c) 2014-2019 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//  Unique Hexatridecimal ID Generator
// ================================================

//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(typeof __webpack_require__ !== 'function'){
    var mac = '', networkInterfaces = require('os').networkInterfaces();
    for(let interface_key in networkInterfaces){
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for(var i = 0; i < length; i++){
            if(networkInterface[i].mac && networkInterface[i].mac != '00:00:00:00:00:00'){
                mac = networkInterface[i].mac; break;
            }
        }
    }
    address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
} 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

}).call(this)}).call(this,require('_process'))
},{"_process":3,"os":2}]},{},[4]);
