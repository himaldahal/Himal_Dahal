$(document).ready(function() {
  var rssUrl = 'https://rss.app/feeds/Q5tu3at8bXx7CCw4.xml';
  
  var newsContainer = $('#news-container');

  function handleNews(data) {
    var $xml = $(data);
    var $channel = $xml.find('channel');
    var $items = $xml.find('item');

    var $newsList = $('<ul>').addClass('list-none items-center rounded-lg flex flex-wrap justify-center gap-1 mx-2 ');
    $items.each(function() {
      var $item = $(this);
      var $newsItem = $('<li>').addClass('p-4 bg-white rounded-lg shadow-md dark:bg-slate-800 dark:text-white');
      
      var $newsDesc = $('<p>').html($item.find('description').text().replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").replace(/<div>/g,'').replace(/<\/div>/g,'')).addClass('text-sm');
    var $newsTitle = $('<h3>').text($item.find('title').text()).addClass('text-lg font-medium');  
      var $newsLink = $('<a>').attr('href', $item.find('link').text()).text('Read more').addClass('block text-blue-500 hover:text-blue-600 rounded');
      
      $newsItem.append($newsTitle, $newsDesc, $newsLink);
      $newsList.append($newsItem);
    });
    $newsList.appendTo(newsContainer);
    $("#ldg").remove();
    $("footer").removeClass("fixed bottom-0");
  }

  $.ajax({
    url:  rssUrl,
    dataType: 'xml',
    type:"GET",
    success: handleNews,
    error: function(error) {
      console.log(error);
    }
  });
});
