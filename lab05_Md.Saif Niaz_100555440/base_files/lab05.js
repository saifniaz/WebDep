var countr = 0;
var countC = 0;
var countCl = 0;

function hoverRow(id) {
    countr++;
    if(countr%2 == 1){
    id.className= 'selected';
    }else{
        id.className = 'none';
    }
}

function hoverCol(x){
    countCl++;
    var table = document.getElementById('table'); 
    var ind = x.cellIndex;
    if(countCl%2 == 1){
        for (var r = 1, n = table.rows.length; r < n; r++) {
                for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                    if(c == ind){
                        table.rows[r].cells[c].className = 'selected';
                    }else{
                        continue;
                    }
                }
            }
    }else{
        for (var r = 1, n = table.rows.length; r < n; r++) {
                for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                    if(c == ind){
                        table.rows[r].cells[c].className = 'none';
                    }else{
                        continue;
                    }
                }
            }
    }
}

function hover(id, cId){
    countC++;
    if(countC%2 == 1){
        id.className= 'selected';
        cId.onkeypress = function(ele){
          if(event.keyCode == 13){
              cId.className = 'selected';
              
          }  
        };
    }else{
        id.className = 'none';
        cId.className = 'none';
    }
}