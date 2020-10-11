const fs = require('fs');

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

const data = loadJSON('dataTest.json');

var helios="casualLeaves";

// ;["Hello", "World"].forEach(word=>data[1].casualLeaves.push(word))

data[0].helios.toString().push("Welcome");

saveJSON('dataTest.json',data);
