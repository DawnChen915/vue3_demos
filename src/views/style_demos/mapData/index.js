export const geoCoordMap = {
    1: [120.502842, 49.140292],
    2: [120.042909, 49.440388],
    3: [121.093855, 50.000254],
    4: [120.638522, 50.083193],
    5: [120.937478, 48.366295]
}
export const mapData = [{
        name: 1,
        value: 2
    },
    {
        name: 2,
        value: 2
    },
    {
        name: 3,
        value: 2
    },
    {
        name: 4,
        value: 2
    },
    {
        name: 5,
        value: 2
    },
]

export var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};