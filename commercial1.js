var readline = require('readline');
var fs = require('fs');
var lineReader = readline.createInterface({
  input: fs.createReadStream('Agriculture.csv'),
});
var commarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var finalarr = [];
var final = {};
var year = ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];
var i = 0;
var z = 0;

var particulars;
var index_particulars;
lineReader.on('line', function(line) {
  var line_records = line.trim().split(',');

  if (i < 1) {
    index_particulars = line_records.indexOf('Particulars');
    i++;
  } else {
    particulars = line_records[index_particulars];
    if (particulars.includes("Commercial")) {
      k = 0;
      for (j = 14; j <= 26; j++) {
        if (line_records[j] == 'NA') {
          commarr[k] = parseFloat(commarr[k]) + parseFloat(0);
          k++;
        } else {
          commarr[k] = parseFloat(commarr[k]) + parseFloat(line_records[j]);
          k++;

        }
      }

      if (z == 4) {
        for (m = 0; m < 12; m++) {
          commarr[m] = parseFloat(commarr[m] / 5);
          final["year"]=year[m];
          final["Commercial"]=commarr[m];
          finalarr.push(final);
          final = {};
        }
      } else {
        ++z;
      }
    }
  }

  fs.writeFileSync("comm.json", JSON.stringify(finalarr));
});
