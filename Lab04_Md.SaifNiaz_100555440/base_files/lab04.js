function hoverRow(id) {
    id.className= 'selected';
}

function hoverCol(index){
    console.log(index);
    tab = document.getElementById('table');
    for(var i = 0; i<tab.length; i++){
        for(var j = 0; j<tab.rows[i].cells.length; j++){
            if(j == index){
                tab.rows[i].cells[j].style.backgroundColor = 'lightBlue';
            }
        }
    }
}

function hover(id){
    console.log(id);
    id.className = 'selected';    
}