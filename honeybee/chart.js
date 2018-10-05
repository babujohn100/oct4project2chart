queue()
    .defer(d3.csv, "beedata.csv")
    .await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);


    // let makeMyday = d3.time.format("%d/%m/%Y").parse;
    // console.log(makeMyday("26/09/2018"));

    // transactionsData.forEach(function(d) {
    //     d.date = makeMyday(d.date);
    // })

    let locationDim = ndx.dimension(dc.pluck("subspecies"));

    let subspecies = locationDim.group().reduceCount(dc.pluck("location"));

    let subspeciesChart = dc.barChart("#name-chart");

    subspeciesChart
        .width(300)
        .height(150)
        .dimension(locationDim)
        .group(subspecies)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Location")
        .elasticY(true)
        .yAxis().ticks(5);
        
        
        dc.renderAll();
        
};

