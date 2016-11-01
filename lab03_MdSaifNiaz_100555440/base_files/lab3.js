window.onload = function(){
    var button = document.getElementById('chat');
    var popup = document.getElementById('chatPopup');
    var count = 0;
    //while(true){
             button.onclick = function(){
                 count++;
                 if(count%2 == 1){
                     popup.style.display='block';
                     document.getElementById('messageField').onkeypress = function(ele){
                         if(event.keyCode == 13){
                            var temp = "You: " + (document.getElementById('messageField').value);
                             var out = document.getElementById('messages');
                             out.innerHTML += temp;
                         }
                     };
                 }else{
                     popup.style.display='none';
                 }
             };
    //}
};