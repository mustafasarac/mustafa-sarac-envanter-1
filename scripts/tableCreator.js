(function($) {
  "use strict";
   
  $.fn.tableCreator = function(props) {
    var container = this;
    var table = $('<table>').addClass("table table-bordered");
    var headerRow = $('<tr>');

    $.each(props.columns, function(ind, val) {
      var col = $("<td>" + val + "</td>");
      headerRow.append(col);
    })
    
    table.append(headerRow);

    var groupedData = $.Enumerable.From(tableData).GroupBy(a=>a.birthPlace).Select(a=>a.source).ToArray();

    $.each(groupedData, function(i, data){
      var orderedData = $.Enumerable.From(data).OrderBy(a=>a.name).ToArray();

      $.each(orderedData, function(index, dataByBirthDate){
        var row = $("<tr>");
        var birthPlace = dataByBirthDate.birthPlace;
        $.each(dataByBirthDate, function(columnName, cellValue) {
          var col = $("<td>");
          if(columnName == "name"){
            if(index == 0){
              var plusbutton = $('<button>')
                                  .on("click", function(e){
                                    if($(this).text() == "+"){
                                      $('[data-city="'+ birthPlace +'"]').show();
                                      $(this).text("-")
                                    }else{
                                      $('[data-city="'+ birthPlace +'"]').hide();
                                      $(this).text("+")
                                    }
                                  })
                                  .addClass("btn btn-xs btn-success")
                                  .text("+");

              if(orderedData.length > 1){
                col.append(plusbutton)
              }

              col.append("<span> "+ cellValue +"</span>");
            }else{
              col.addClass("text-right");
              col.text(cellValue);
              row.hide();
              row.attr("data-city", birthPlace);
            }
          }
          else if(columnName == "phone"){
            col = $("<td>").append('<a class="btn btn-xs btn-white" href="tel:'+ cellValue +'"> '+ cellValue +' </a>');
          }
          else if(columnName == "tc"){
            var button = '<a class="btn btn-xs btn-white" data-toggle="modal" data-tckn='+ cellValue +' data-target="#exampleModal">' + cellValue + '</a>';
            col = $("<td>").append(button);
          }else{
            var col = $("<td>").text(cellValue);
          }
          row.append(col);
        })

        table.append(row);
        container.append(table);
      })
    })


    $(document)
      .on("click", '[data-tckn]', function(e){
        $('#infos').empty();
        var value = $(this).attr("data-tckn");
        var rowData = $.Enumerable.From(props.data).Where(a=>a.tc == value).FirstOrDefault();
        $.each(props.columns, function(i, column){
          var colText = $('<p>').text(column + " : " + rowData[column]);
          $('#infos').append(colText);
        })
      })

  }
})(jQuery);

  
// (function($) {
//   "use strict";
   
//   $.fn.tableCreator = function(props) {
//     var container = this;
//     var table = $('<table>').addClass("table table-bordered");
//     var headerRow = $('<tr>');

//     var _col = $("<td>#</td>");
//     headerRow.append(_col);

//     $.each(props.columns, function(ind, val) {
//       var col = $("<td>" + val + "</td>");
//       headerRow.append(col);
//     })
    
//     table.append(headerRow);

//     var groupedData = $.Enumerable.From(tableData).GroupBy(a=>a.birthPlace).Select(a=>a.source).ToArray();

//     $.each(groupedData, function(i, data){
//       var orderedData = $.Enumerable.From(data).OrderBy(a=>a.name).ToArray();

//       $.each(orderedData, function(index, dataByBirthDate){
//         var row = $("<tr>");
//         if(i === 0){
//           var _col = $("<td><button class='btn btn-xs btn-success'>+</button></td>");
//           row.append(_col);
//           $.each(dataByBirthDate.source, function(cellIndex, cellValue) {
//             var col = $("<td>" + cellValue + "</td>");
//             row.append(col);
//           })
//         }else{
//           var _col = $("<td><button class='btn btn-xs btn-success'>+</button></td>");
//           row.append(_col);
//           $.each(dataByBirthDate.source, function(cellIndex, cellValue) {
//             var col = $("<td>" + cellValue + "</td>");
//             row.append(col);
//           })
//         }

//         table.append(row);
//         container.append(table);
//       })
//     })
//   }
// })(jQuery);