function displayMap(data){
    lat = [];
    long = [];
    text = [];
    colors = [];
    data.forEach(element => {
        lat.push(element["latitude"]);
        long.push(element["longitude"]);
        text.push(`Ville : ${element["nom_ville"]}
        <br>Date : ${element["date"]} ${element["heure"]}
        <br>Âge : ${element["age"]} ans
        `);

        if(parseFloat(element["longitude"]) < 0.5){
            colors.push("blue");
        }
        else if(parseFloat(element["longitude"]) < 4){
            colors.push("white");
        }
        else{
            colors.push("red");
        }
    });

    var data = [
        {
            type: "scattermapbox",
            text: text,
            lon: long,
            lat: lat,
            marker: { color: colors, size: 4 }
        }
    ];

    var layout = {
        dragmode: "zoom",
        mapbox: { style: "open-street-map", center: { lat: 40, lon: 1 }, zoom: 3 },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    };

    Plotly.newPlot("map", data, layout);
    
}

// d3.csv(
// 	"https://raw.githubusercontent.com/plotly/datasets/master/2015_06_30_precipitation.csv",
// 	function(err, rows) {
// 		function unpack(rows, key) {
// 			return rows.map(function(row) {
// 				return row[key];
// 			});
// 		}

// 		var data = [
// 			{
// 				type: "scattermapbox",
// 				text: unpack(rows, "Globvalue"),
// 				lon: unpack(rows, "Lon"),
// 				lat: unpack(rows, "Lat"),
// 				marker: { color: "fuchsia", size: 4 }
// 			}
// 		];

// 		var layout = {
// 			dragmode: "zoom",
// 			mapbox: { style: "open-street-map", center: { lat: 38, lon: -90 }, zoom: 3 },
// 			margin: { r: 0, t: 0, b: 0, l: 0 }
// 		};

// 		Plotly.newPlot("map", data, layout);
// 	}
// );