

/*

demo code

<script src="https://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">// <![CDATA[
// ]]></script>

*/

// we need to load the feeds module (version specified)
google.load("feeds", "1");

// then set the function we will call when it is loaded
google.setOnLoadCallback(update_feed);

// we write in our own target element to save them doing that in the code - with a random id so we can
// have many on a page
var botanics_stories_rss_div_name = 'botanics_stories_rss_div_' + make_id();
document.write('<div id="' +  botanics_stories_rss_div_name  + '"></div>');

// assumes we have this set in the page
//window.botanics_stories_rss_url = "http://stories.rbge.org.uk/archives/category/learning/edible-gardening-project/feed";

console.log('botanics_stories_rss_div_name => ' + botanics_stories_rss_div_name);
console.log('window.botanics_stories_rss_url => ' + window.botanics_stories_rss_url);
console.log('window.botanics_stories_rss_title => ' + window.botanics_stories_rss_title);

function update_feed() {

  console.log('botanics_stories feed update called');
  
  var feed = new google.feeds.Feed(window.botanics_stories_rss_url);
  feed.setNumEntries(10);
  feed.load(function(result) {
    if (!result.error) {

        var container = document.getElementById(botanics_stories_rss_div_name);
        container.setAttribute('style', 'padding-top: 1em;');

        // display the title of the feed - but only when we have the feed
        var h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode(window.botanics_stories_rss_title));
        h4.setAttribute('style', 'margin-bottom: 0px;');
        container.appendChild(h4);
      
        // we have a list of items
        var ul = document.createElement("ul");
        ul.setAttribute('style', 'margin-top: 0.5em; margin-left:1em');
        container.appendChild(ul);
      
        for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            console.log(entry);
            var li = document.createElement("li");
            li.setAttribute('style', 'padding-bottom: 0.5em;');
            ul.appendChild(li);
            
            // title as a link
            var a1 = document.createElement('a');
            a1.innerHTML = entry.title;
            a1.setAttribute('href', entry.link);
            li.appendChild(a1);
            
            // summary as text
            var p = document.createElement("span");
            p.innerHTML= ':&nbsp;' + entry.contentSnippet + '&nbsp;';
            li.appendChild(p);
            
            // read more
            var a2 = document.createElement('a');
            a2.appendChild(document.createTextNode('Read more'));
            a2.setAttribute('href', entry.link);
            li.appendChild(a2);
            
            
            
        }
        
    }
  });
}


function make_id()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}