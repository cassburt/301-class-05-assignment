
//PA1: This section controls the templating function
var sites= [];

function Site (option) {
  this.siteName = option.siteName;
  this.siteURL = option.siteURL;
  this.sitePhoto = option.sitePhoto;
  this.client = option.client;
  this.overview = option.overview;
  this.sitePhotoSrc = option.sitePhotoSrc;
  this.siteType = option.siteType;
}

Site.prototype.toHtml = function() {
  var $newSite = $('article.template').clone();
  $newSite.removeClass('template');

  $newSite.attr('data-siteType', this.siteType);
  $newSite.attr('data-client', this.client);

  $newSite.find('.webName').html(this.siteName);
  $newSite.find('a').attr('href', this.siteURL);
  $newSite.find('h2').html(this.client);
  $newSite.find('h3').html(this.siteType);
  $newSite.find('p').html(this.overview);
  $newSite.find('img').html(this.sitePhoto);
  $newSite.find('img').attr('src', this.sitePhotoSrc);
  $newSite.append('<hr>');
  return $newSite;
}

rawData.forEach(function(el) {
  sites.push(new Site(el));
})

sites.forEach(function(a){
  $('#sites').append(a.toHtml())
});

//PA 2: This section controls the filters
var siteView = {};

siteView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var value = $(this).attr('data-client'); //this grabs the client's name from the 'this' client attribute
      var tagChoice = '<option value="' + value + '">' + value + '</option>';
      if ($('#client-filter option[value="' + value + '"]').length === 0) { //if the value option does not already existin the filter...
        $('#client-filter').append(tagChoice); //append it to the filter list
      }
      //let's do that again...
      value = $(this).attr('data-siteType'); //this grabs the site type from the 'this' site-type attribute
      tagChoice = '<option value="' + value + '">' + value + '</option>'; //this takes that site type value and inserts it into HTML code
      if ($('#siteType-filter option[value="' + value + '"]').length === 0) { //if the value option does not already existin the filter...
        $('#siteType-filter').append(tagChoice); //append it to the filter list
      }
    }
  });
};

siteView.handleClientFilter = function() {
  $('#client-filter').on('change', function() { //when an option is selected in the client filter...
    if ($(this).val()) { //for the value selected...
      $('article').hide(); //hide all articles....
      $('article[data-client="' + $(this).val() + '"]').fadeIn(); //then fade in the article(s) with a "data-client" attribute matching the value selected
    } else { //if no value is selected...
      $('article[data-client]').show(); //show all articles with a "data-client" attribute
      $(this).val(''); //empty out the handleClientFilter
    };
  });
};

siteView.handleSiteTypeFilter = function() { //same as above, but with the siteType filter
  $('#siteType-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-siteType="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article[data-siteType]').show();
      $(this).val('');
    }
  })
}

siteView.handleTopMenu = function() {
  $('.topMenu').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.topMenu .tab:first').click();
};

siteView.setTeasers = function() {
  $('.overview *:nth-of-type(n+2)').hide();
  $('#portfolio').on('click', 'a.learnMore', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

$(document).ready(function() {
  siteView.populateFilters();
  siteView.handleClientFilter();
  siteView.handleSiteTypeFilter();
  siteView.handleTopMenu();
  siteView.setTeasers();
})
