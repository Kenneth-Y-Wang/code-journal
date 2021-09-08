/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photoUrl');
var $picView = document.querySelector('.picView');

function showPicture(event) {
  if (event.target.value !== '') {
    $picView.setAttribute('src', event.target.value);
  }
}

$photoUrl.addEventListener('input', showPicture);

var $entryForm = document.querySelector('#entryForm');

$entryForm.addEventListener('submit', function () {
  event.preventDefault();
  var entryData = {};
  entryData.title = $entryForm.elements.title.value;
  entryData.photoUrl = $entryForm.elements.photoUrl.value;
  entryData.notes = $entryForm.elements.notes.value;
  entryData.entryId = data.nextEntryId;
  data.entries.unshift(entryData);
  data.nextEntryId++;
  $newEntries.prepend(renderData(entryData));
  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();

});

function entryDisplay(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = renderData(data.entries[i]);
    $newEntries.appendChild($newEntry);
  }
  viewchange(data.view);

}

document.addEventListener('DOMContentLoaded', entryDisplay);

// <li class="row">
//  <div class=" column-half">
//    <div class="picHolder"><img class="picView" src="images/placeholder-image-square.jpg"></div>
//  </div>
//  <div class="column-half entryInfo">
//    <h2 class="entryTitle" >Marvels Movie</h2>
//    <p class="entryNote">Our salute to Captain America and his uniforms in the MCU. Which is your favorite? Complete your Marvel Studios' Captain
//      America collection on Digital now!</p>
//  </div>
// </li>

var $newEntries = document.querySelector('.list-group');

function renderData(data) {
  var $newList = document.createElement('li');
  $newList.setAttribute('class', 'row');

  var $listPic = document.createElement('div');
  $listPic.setAttribute('class', 'column-half');

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $pic = document.createElement('img');
  $pic.setAttribute('class', 'picView');
  $pic.setAttribute('src', data.photoUrl);

  var $entryInfo = document.createElement('div');
  $entryInfo.setAttribute('class', 'column-half entryInfo');

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = data.title;

  var $entryNote = document.createElement('p');
  $entryNote.textContent = data.notes;

  $newList.appendChild($listPic);
  $newList.appendChild($entryInfo);

  $listPic.appendChild($picHolder);
  $picHolder.appendChild($pic);

  $entryInfo.appendChild($entryTitle);
  $entryInfo.appendChild($entryNote);

  return $newList;
}

var $tabList = document.querySelector('.tabList');
var $view = document.querySelectorAll('.view');
var $newButton = document.querySelector('.newButton');
var $submitButton = document.querySelector('.submitButton');

function viewchange(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].className = ' view ';
      data.view = $view[i].getAttribute('data-view');
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function handleViewNav(event) {
  var dataView = event.target.getAttribute('data-view');
  viewchange(dataView);
}

$tabList.addEventListener('click', handleViewNav);
$newButton.addEventListener('click', handleViewNav);
$submitButton.addEventListener('click', handleViewNav);
