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

$(document).ready(function(){
    $('td').click(function(){
        countC++;
        if(countC%3 == 1){
            $(this).addClass('selected');
            var temp = (this).textContent;
            var input =$('<input/>')
            input.val($(this).html());
            $(this).html(input);
            $('input').keypress(function(ele){
                if(event.keyCode == 13){
                    var temp1 = ((this).value);
                    $(this).replaceWith(temp1);
                }
            });            
        }else if(countC%3 == 0){
            $(this).removeClass('selected');
        }
    });
});

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