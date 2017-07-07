function generateQuote() {
  $.ajax({
    url:"https://seinfeld-quotes.herokuapp.com/quotes",
    dataType:"JSON",
    method:"GET"
  }).then(function(res){
    // Generate a random number form 0 to 421
    var randQuoteNum = Math.floor((Math.random() * 421));

    document.getElementById('quoteText').innerHTML = res.quotes[randQuoteNum].quote;
    document.getElementById('quoteAuthor').innerHTML = res.quotes[randQuoteNum].author;
    document.getElementById('season').innerHTML = res.quotes[randQuoteNum].season;
    document.getElementById('episode').innerHTML = res.quotes[randQuoteNum].episode;
  });
}

window.addEventListener('DOMContentLoaded', function() {
  generateQuote();
}, true);

// Change the quote when the button is clicked
$("#newQuote").click(function() {
  generateQuote();
});

$('#twt').on('click', function() {
  var quote = document.getElementById('quote').textContent;
  var twtpg = 'https://twitter.com/share?text=' + encodeURIComponent(quote);
  window.open(twtpg, null, "height=500,width=800");
});