var readline = require('readline');
var fs = require('fs');
var lineReader = readline.createInterface({
  input: fs.createReadStream('agriculture.csv'),
});
var arr = [];
var i = 0;
var arr1 = [];
var oil = [];
var foodgrain = [];
var temp = {};
var index_particulars;
var index_year13;
var particulars;
var year13;
var foodgrains;
function population_chart(particulars, year13) {
  this.particulars = particulars;
  this.year13 = year13;
}
function agriculture_chart(foodgrains, year13) {
  this.foodgrains = foodgrains;
  this.year13 = year13;
}
lineReader.on('line', function(line) {
  var line_records = line.trim().split(',');;
  if (i < 1) {
    index_particulars = line_records.indexOf('Particulars');
    console.log(index_particulars);
    index_year13 = line_records.indexOf(' 3-2013');
    console.log(index_year13);
    i++;
  } else {
    particulars = line_records[index_particulars];
    year13 = line_records[(index_year13 + 1)];
    if (particulars.includes("Oilseeds")) {
      oil.push(new population_chart(particulars, year13));
      oil.sort(function(a, b) {
        if (b.year13 == 'NA') {
          b.year13 = 0;
        }
        return parseFloat(b.year13) - parseFloat(a.year13)
      });
    }
    if (particulars.includes("Foodgrains")) {
      foodgrain.push(new agriculture_chart(particulars, year13));
      foodgrain.sort(function(a, b) {
        if (b.year13 == 'NA') {
          b.year13 = 0;
        }
        return parseFloat(b.year13) - parseFloat(a.year13)
      });
    }
    fs.writeFileSync("oil.json", JSON.stringify(oil));
    fs.writeFileSync("foodgrain.json", JSON.stringify(foodgrain));
  }
});
