$(document).ready(function(){
   $.get('topstories.atom', function(xmlDoc){ 
        
        $(xmlDoc).find('entry').each(function(){
            var story = '<div class = "story">'
            var result = '<div>';
            result += '<h2>' + $(this).find('title').text() + '</h2>';
            result += '<h4>' + $(this).find('updated').text() + '</h4>';
            result += '<div>' + $(this).find('summary').text() + '</div>';
            result += '</div>';
            result += '<hr>'
            result += '<div>';
            result += $(this).find('content').text();
            result += '</div>';
            story += result;
            story += '</div>'
            $('#topStories').append(story);
        });
        
        
   }); 
});