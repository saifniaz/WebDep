window.onload = function(){
    var showTable = document.getElementById('genTableButton');
    showTable.onclick = function(){
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function(){
            if((xmlHttpRequest.readyState == 4)&&
                (xmlHttpRequest.status == 200)){
                var data = xmlHttpRequest.responseText.split(/[\s,]+/);
                var destination = document.getElementById('content');
           
                var index = 0;
                var table = document.createElement('table');
                for (var i = 1; i <= 4; i++){
                    if(i == 1){
                        var tr = document.createElement('tr');
                        var th1 = document.createElement('th');
                        var th2 = document.createElement('th');
                        var th3 = document.createElement('th');
                        var th4 = document.createElement('th');
                      
                        var idText = document.createTextNode('Student ID');
                        var As1 = document.createTextNode('Asmt 1');
                        var As2 = document.createTextNode('Asmt 2');
                        var As3 = document.createTextNode('Asmt 3');
                      
                      
                        th1.appendChild(idText);
                        th2.appendChild(As1);
                        th2.setAttribute('onclick', 'hoverCol(this)');
                        th3.appendChild(As2);
                        th3.setAttribute('onclick', 'hoverCol(this)');
                        th4.appendChild(As3);
                        th4.setAttribute('onclick', 'hoverCol(this)');
                        tr.appendChild(th1);
                        tr.appendChild(th2);
                        tr.appendChild(th3);
                        tr.appendChild(th4);
                      
                        table.id = 'tab';
                        table.appendChild(tr);
                        continue;
                      
                    }
                    var tr = document.createElement('tr');

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var td4 = document.createElement('td');

                    var text1 = document.createTextNode(data[index]);
                    var text2 = document.createTextNode(data[index+1]);
                    var text3 = document.createTextNode(data[index+2]);
                    var text4 = document.createTextNode(data[index+3]);

                    tr.id = 'stud' + (i - 1);
                  
                    td1.appendChild(text1);
                    td1.setAttribute('onclick', 'hoverRow(' +tr.id + ')');
                    td2.appendChild(text2);
                    td2.setAttribute('onclick', 'hover(this)');
                    td3.appendChild(text3);
                    td3.setAttribute('onclick', 'hover(this)');
                    td4.appendChild(text4);
                    td4.setAttribute('onclick', 'hover(this)');
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                                        
                    table.appendChild(tr);
                    index += 4;
                }
                document.body.appendChild(table);
                
            }
        };
        xmlHttpRequest.open('GET','student_data.csv', true);
        xmlHttpRequest.send();
    };
};
var countR = 0;
var countCl = 0;
var countC = 0;

function hoverRow(id){
    countR++;
    if(countR%2 == 0){
        id.className='selected';
    }else{
        id.className='none';
    }
}

function hoverCol(x){
    countCl++;
    var table = document.getElementById('tab'); 
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

function hover(id){
    countC++;
    if(countC%3 == 1){
        id.className = 'selected';
        var temp = id.firstChild.nodeValue;
        console.log(temp);
        id.innerHTML = '<input type="text" id="Input" value="'+temp+'"/>';
        var input = document.getElementById('Input');
        input.onkeypress = function(ele){
            if(event.keyCode == 13){
                id.innerHTML = (input.value);
            }  
        };
      
    }else if(countC%3 == 0){
        id.className = 'none';
        id.contentEditable = 'false';
    }
};

