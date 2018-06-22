document.addEventListener('DOMContentLoaded', wikiSearch);

function wikiSearch() {
  document.getElementById('querySubmit').addEventListener('click', function(event) {
    var search = document.getElementById('searchQuery').value;
    var res = "";

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: { action: 'query', generator: 'search', gsrsearch: search, prop: 'extracts|allimages', exintro: 1, exlimit: 10, exchars: 200, explaintext: 1, aiprop: "url", format: 'json' },
      dataType: 'jsonp',
      success: function (x) {
        for (pg in x.query.pages) {
          res += "<a href='https://en.wikipedia.org/?curid=" + x.query.pages[pg].pageid + "' target='_blank'><div id='resDiv'>";
          res += "<h2>" + x.query.pages[pg].title + "</h2>";
          res += "<p>" + x.query.pages[pg].extract + "</p></div></a>";
        }
        document.getElementById('result').innerHTML = res;
      }
    });

    event.preventDefault();
  });
}
