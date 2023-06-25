$(document).ready(function() {
  var $app = $('#app');
  $app.empty();

  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var index = streams.home.length - 1;

  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };
  var handleButtonClick = function(event) {
    index = streams.home.length - 1;
    renderFeed();
    $button.text('Update Feed');
  };
  var handleUsernameClick = function() {
    var clickedUser = $(this).text().substring(1);
    renderFeed(clickedUser);
    $button.text('Back');
  };

  $title.on('click', handleTitleClick);
  $button.on('click', handleButtonClick);

  $app.append($title, $button, $feed);

  var renderFeed = function (clickeduser) {
    $feed.empty();
    for (var j = index; j >= 0; j--) {
      var tweet = streams.home[j];
      var $tweet = $('<div class="tweet"></div>');
      if (!clickeduser || clickeduser === tweet.user) {
        var $profilephoto = $('<img class="profile-photo">').attr('src', tweet.profilePhotoURL);
        var $username = $('<span class="username"></span>').text('@' + tweet.user);
        var $message = $('<p class="message"></p>').text(tweet.message);
        var $timestamp = $('<div class="timestamp"></div>').text($.timeago(tweet.createdAt));
        var $icon = $('<div class="icon"></div>');
        var $userstuff = $('<div class="userstuff"></div>');

        $icon.append(
          $('<i class="fa-solid fa-share share"></i>'),
          $('<i class="fa-solid fa-retweet retweet"></i>'),
          $('<i class="fa-solid fa-comment comment"></i>'),
          $('<i class="fa-solid fa-heart like"></i>')
        );

        $tweet.append($userstuff, $message, $icon, $timestamp);
        $feed.append($tweet);
        $userstuff.append($profilephoto, $username);


        $username.on('click', handleUsernameClick);

        $icon.find('i').on('mouseenter', function() {
          $(this).css('color', 'blue');
        }).on('mouseleave', function() {
          $(this).css('color', '');
        });
      }
    }
  };

  renderFeed();

});

window.isItBeautifulYet = true;