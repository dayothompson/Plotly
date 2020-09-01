// Read file
// d3.json("samples.json").then(item => {
//     console.log(item.samples)
//     var sample = item.samples[1].otu_ids
//     console.log(sample.length)
// })


function plotChart(testId){

    d3.json("samples.json").then(item => {
        console.log(item)



        var sampleValues = item.samples.map(data => data.sample_values.slice(0, 10))
        var otuId = item.samples.map(data => data.otu_ids.slice(0, 10))
        var otuLabels = item.samples.map(data => data.otu_labels.slice(0, 10))


        var value = item.names.findIndex(img => img === testId);


        var demoInfo = d3.select("#sample-metadata")
        demoInfo.html("")
        // d3.select("#sample-metadata").node().value = ""
        Object.entries(item.metadata[value]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
            console.log(key, value)
        })


        var trace1 = {
        x: sampleValues[value].reverse(),
        y: otuId[value].map(item => `OTU ${item}`).reverse(),
        text: otuLabels[value],
        name: "OTU",
        type: "bar",
        orientation: "h"
      };

        var data = [trace1]

        var layout = {
            title: "Top 10 OTU Samples",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }

        Plotly.newPlot("bar", data, layout)


        var sampleValues2 = item.samples.map(data => data.sample_values)
        var otuId2 = item.samples.map(data => data.otu_ids)
        var otuLabels2 = item.samples.map(data => data.otu_labels)


        var trace2 = {
          x: otuId2[value],
          y: sampleValues2[value],
          mode: 'markers',
          marker: {
            color: otuId2[value],
            opacity: [1, 0.8, 0.6, 0.4],
            size: sampleValues2[value]
          },
          text: otuLabels2[value]
        };

        var data2 = [trace2];

        var layout2 = {
          title: 'Marker Size and Color',
          showlegend: false,
          height: 600,
          width: 1200
        };

        Plotly.newPlot('bubble', data2, layout2);


        var freq = item.metadata[value]
        console.log(freq.wfreq)
        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: freq.wfreq,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                  axis: { range: [null, 10] },
                  steps: [
                    { range: [0, 5], color: "lightgray" },
                    { range: [5, 8], color: "gray" }
                  ],
                  threshold: {
                    line: { color: "red", width: 5 },
                    thickness: 0.75,
                    value: 9
                  }
                }
            }
        ];

        var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data3, layout3);
    })

}



function updateChange(){
    var menuDropdown = d3.selectAll("#selDataset")

    d3.json("samples.json").then(item => {
        console.log(item.names)
        item.names.forEach(element => {
            menuDropdown.append("option").text(element).property("value", element)
        })

        var test = item.names[0];
        plotChart(test);

    })


}


function optionChanged(newSubject) {
        plotChart(newSubject);
}
// Initialize the Dashboard
updateChange();



