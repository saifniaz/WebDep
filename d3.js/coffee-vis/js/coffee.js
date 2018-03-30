var chart;
var margin = {top: 10, right: 30, bottom: 15, left: 15}
var height = 200 - margin.top - margin.bottom
var width = 300 - margin.left - margin.right
var barWidth = 55
var BarOffset = 10
var yChange;
var region = {};
var category = {};


//DEFINE YOUR VARIABLES UP HERE


//Gets called when the page is loaded.
function init(){
  chart = d3.select('#vis').append('svg')
  vis = chart.append('svg:g')
  //PUT YOUR INIT CODE BELOW

  yChange = getYSelectedOption();

  d3.csv('data/CoffeeData.csv', function(datas){
    datas.forEach(function(data){
      data.sales = Number(data.sales);
      data.profit = Number(data.profit);
    });

    
    datas.forEach(function(data) {
      let sales = data.sales;
      let profit = data.profit;

      if(region[sales] == undefined)
        region[sales] = [];
      region[sales].push(data);

      if(category[sales] == undefined)
        category[sales] = [];
      category[sales].push(data);

       if(region[profit] == undefined)
        region[profit] = [];
      region[profit].push(data);

      if(category[profit] == undefined)
        category[profit] = [];
      category[profit].push(data);

    });
  });

}

//Called when the update button is clicked
function updateClicked(){
  d3.csv('data/CoffeeData.csv',update)
}

//Callback for when data is loaded
function update(rawdata){
  //PUT YOUR UPDATE CODE BELOW

  var ColorRegion = ["#2196F3", "#EF6C00","#4CAF50","#E53935"]
  var ColorCategory = ["#B388FF", "#795548","#EA80FC","#9E9E9E"]


  var xSelected = getXSelectedOption();
  var ySelected = getYSelectedOption();

  if(ySelected == "sales"){
    if(xSelected == "region"){
      var nested = d3.nest()
        .key(function(d) { return d.region;})
        .rollup(function(d) { 
          return d3.sum(d, function(g) {return g.sales; });
        }).entries(rawdata);

      var r = nested.map(function(d){
          return d.key;
        })

        var v = nested.map(function(d){
          return d.value;
        })

      var yScale = d3.scaleLinear()
              .domain([0, d3.max(v)])
              .range([0, height]);

      var xScale = d3.scaleOrdinal()
              .domain(r)
              .range([0, width]);  

      var colorScale = d3.scaleOrdinal()
        .domain(r)
        .range(ColorRegion);
    }else{
      var nested = d3.nest()
        .key(function(d) { return d.category;})
        .rollup(function(d) { 
          return d3.sum(d, function(g) {return g.sales; });
        }).entries(rawdata);

      var c = nested.map(function(d){
        return d.key;
      })

      var v = nested.map(function(d){
        return d.value;
      })

      var yScale = d3.scaleLinear()
              .domain([0, d3.max(v)])
              .range([0, height]);

      var xScale = d3.scaleOrdinal()
              .domain(c)
              .range([0, width]);  

      var colorScale = d3.scaleOrdinal()
        .domain(c)
        .range(ColorCategory);
    }
  }else{
    if(xSelected == "region"){
      var nested = d3.nest()
        .key(function(d) { return d.region;})
        .rollup(function(d) { 
          return d3.sum(d, function(g) {return g.profit; });
        }).entries(rawdata);

      var r = nested.map(function(d){
          return d.key;
        })

        var v = nested.map(function(d){
          return d.value;
        })

      var yScale = d3.scaleLinear()
              .domain([0, d3.max(v)])
              .range([0, height]);

      var xScale = d3.scaleOrdinal()
              .domain(r)
              .range([0, width]);  

      var colorScale = d3.scaleOrdinal()
        .domain(r)
        .range(ColorRegion);
    }else{
      var nested = d3.nest()
        .key(function(d) { return d.category;})
        .rollup(function(d) { 
          return d3.sum(d, function(g) {return g.profit; });
        }).entries(rawdata);

      var c = nested.map(function(d){
        return d.key;
      })

      var v = nested.map(function(d){
        return d.value;
      })

      var yScale = d3.scaleLinear()
              .domain([0, d3.max(v)])
              .range([0, height]);

      var xScale = d3.scaleOrdinal()
              .domain(c)
              .range([0, width]);  

      var colorScale = d3.scaleOrdinal()
        .domain(c)
        .range(ColorCategory);
    }
  }


  if(ySelected != yChange){
    yChange = ySelected;

    d3.selectAll("svg > *").remove();

    d3.select('svg')
      //.style('background', '#000000')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      //.append('transform', 'translate('+ margin.left+','+margin.top+')')
      .selectAll('rect')
      .data(v)
      .enter()
      .append('rect')
        .transition(200)
        .style('fill', function(d, i){
          return colorScale(i);
        })
        .attr('width', barWidth)
        .attr('height', function(d){
          return yScale(d);
        })
        .attr('x', function(d, i){
          return i * (barWidth + BarOffset)
        })
        .attr('y', function(d){
          return (height) - yScale(d);
        });
  }else{
        
    d3.selectAll("svg > *").remove();

    d3.select('svg')
      //.style('background', '#000000')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      //.append('transform', 'translate('+ margin.left+','+margin.top+')')
      .selectAll('rect')
      .data(v)
      .enter()
      .append('rect')
        .style('fill', function(d, i){
          return colorScale(i);
        })
        .attr('width', barWidth)
        .attr('height', function(d){
          return yScale(d);
        })
        .attr('x', function(d, i){
          return i * (barWidth + BarOffset)
        })
        .attr('y', function(d){
          return (height) - yScale(d);
        });
      }



  var vGuideScale = d3.scaleLinear()
      .domain([0, d3.max(v)])
      .range([height, 0])

  let xAxis = d3.axisBottom(xScale);
  d3.select('svg')
    .append("g")
        .attr("transform", "translate(0,"+ (height) +")")
        .attr('class', 'x axis')
        .call(xAxis);
  
  let yAxis = d3.axisRight(vGuideScale);
    d3.select('svg')
      .append("g")
      .attr("transform", "translate(" +(width)+",0)")
      .call(yAxis);

    
}

// Returns the selected option in the X-axis dropdown. Use d[getXSelectedOption()] to retrieve value instead of d.getXSelectedOption()
function getXSelectedOption(){
  var node = d3.select('#xdropdown').node()
  var i = node.selectedIndex
  return node[i].value
}

// Returns the selected option in the X-axis dropdown. 
function getYSelectedOption(){
  var node = d3.select('#ydropdown').node()
  var i = node.selectedIndex
  return node[i].value
}

