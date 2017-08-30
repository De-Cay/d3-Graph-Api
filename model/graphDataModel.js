var GraphApi = GraphApi || {};

GraphApi.DataModel = {

  CONSTANT: GraphApi.CONSTANT,

  formatData(jsonData){

    let xkey = Object.keys(jsonData[0])[0];
    let yKey = Object.keys(jsonData[0])[1];
    this.CONSTANT.CoordinateLabel = {
      'abcissa': xkey.toUpperCase(),
      'ordinate': yKey.toUpperCase()
    };

    let parseDate = d3.time.format("%d-%b-%y").parse;

    let formattedData = [];
    for (let ii = 0, n = jsonData.length; ii < n; ii++){
      let element = jsonData[ii];
      let newObj = {
        'x': element[xkey],
        'y': element[yKey]
      };
      formattedData.push(newObj);
    }
    return formattedData;
  }
}
