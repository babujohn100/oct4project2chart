// creation of barChart

queue()
    .defer(d3.csv, "googleplaystore.csv")
    .await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);


    // let makeMyday = d3.time.format("%d/%m/%Y").parse;
    // console.log(makeMyday("26/09/2018"));

    // transactionsData.forEach(function(d) {
    //     d.date = makeMyday(d.date);
    // })

    let catagory = ndx.dimension(dc.pluck("Category"));

    let price = catagory.group().reduceCount(dc.pluck("Price"));

    let googleplaystoreChart = dc.barChart("#app-chart");

    let color = d3.scale.ordinal().range(["yellow", "red"]);

    googleplaystoreChart
        .width(1000)
        .height(650)
        .colorAccessor(function(e) {
            return e.key
        })
        .colors(color)
        .margins({ top: 10, right: 50, bottom: 100, left: 50 })
        .dimension(catagory)
        .group(price)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxis().ticks(5);


    // creation of pie chart



    let type = ndx.dimension(dc.pluck("Category"));

    let pri = type.group().reduceCount(dc.pluck("Type"));

    let googleplay = dc.pieChart("#pie-chart");

    googleplay
        .width(800)
        .radius(450)
        .dimension(type)
        .group(pri)
        .transitionDuration(1500)


    // .x(d3.scale.ordinal())
    // .xUnits(dc.units.ordinal)
    // .xAxisLabel("Location")
    // .elasticY(true)
    // .yAxis().ticks(6)


    // creation of pie chart


    let ap = ndx.dimension(dc.pluck("Category"));

    let size = ap.group().reduceCount(dc.pluck("Genres"));

    let google = dc.pieChart("#pie-chart1");

    google
        .width(300)
        .radius(150)
        .dimension(ap)
        .group(size)
        .transitionDuration(1500);


    dc.renderAll();

}
