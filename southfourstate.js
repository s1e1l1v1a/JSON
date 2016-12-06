var readline = require('readline');
var fs = require('fs');
var lineReader = readline.createInterface({
	input : fs.createReadStream('Agriculture.csv'),
});

var finalstate=[];
var finals={};
var states=["Agricultural Production Foodgrains Rice Yield Andhra Pradesh","Agricultural Production Foodgrains Rice Yield Karnataka","Agricultural Production Foodgrains Rice Yield Kerela","Agricultural Production Foodgrains Rice Yield Tamil Nadu"];
var year=["y2003","y2004","y2005","y2006","y2007","y2008","y2009","y2010","y2011","y2012","y2013","y2014"];

var i=0;

var particulars;
var index_particulars;


lineReader.on('line',function(line)
{
var line_records=line.trim().split(',');
if(i<1){
index_particulars=line_records.indexOf('Particulars');
i++;
}
else {

		particulars=line_records[index_particulars];


    if(particulars.includes("Agricultural Production Foodgrains Rice Yield Andhra Pradesh"))
    {
			all=[];
		 j=0;
  for(k=13;k<25;k++)
  {

		if(line_records[k]=='NA'){
      all[j]=0;
			j++;
    }
    else{
      all[j]=line_records[k];
			j++;
    }
  }
	finals["state"]=states[0];

	for(y=0;y<all.length;y++)
	{
  finals[year[y]]=parseFloat(all[y]);
   }
	 finalstate.push(finals);
	 finals={};

    }




   if(particulars.includes("Agricultural Production Foodgrains Rice Yield Karnataka"))
    {

			all=[];
		 j=0;
		for(k=13;k<25;k++)
		{

		if(line_records[k]=='NA'){
			all[j]=0;
			j++;
		}
		else{
			all[j]=line_records[k];
			j++;
		}
		}
		finals["state"]=states[1];

		for(y=0;y<all.length;y++)
		{
	  finals[year[y]]=parseFloat(all[y]);
	   }
		 finalstate.push(finals);
		 finals={};


    }


    if(particulars.includes("Agricultural Production Foodgrains Rice Yield Kerala"))
    {

			all=[];
		 j=0;
		for(k=13;k<25;k++)
		{

		if(line_records[k]=='NA'){
			all[j]=0;
			j++;
		}
		else{
			all[j]=line_records[k];
			j++;
		}
		}

		finals["state"]=states[2];

		for(y=0;y<all.length;y++)
		{
	  finals[year[y]]=parseFloat(all[y]);
	   }
		 finalstate.push(finals);
		 finals={};

}

if(particulars.includes("Agricultural Production Foodgrains Rice Yield Tamil Nadu"))
{
		 all=[];
		 j=0;
for(k=13;k<25;k++)
{

if(line_records[k]=='NA'){
	all[j]=0;
	j++;
}
else{
	all[j]=line_records[k];
	j++;
}
}
finals["state"]=states[3];

for(y=0;y<all.length;y++)
{
finals[year[y]]=parseFloat(all[y]);
 }
 finalstate.push(finals);
 finals={};

}


}


fs.writeFileSync("state.json",JSON.stringify(finalstate));


});
