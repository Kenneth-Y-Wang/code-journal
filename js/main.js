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

// the whole submit process
$entryForm.addEventListener('submit', function () {
  event.preventDefault();
  var entryData = {};
  entryData.title = $entryForm.elements.title.value;
  entryData.photoUrl = $entryForm.elements.photoUrl.value;
  entryData.notes = $entryForm.elements.notes.value;
  entryData.entryId = data.nextEntryId;

  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = entryData.title;
        data.entries[i].photoUrl = entryData.photoUrl;
        data.entries[i].notes = entryData.notes;
        var $allEntry = document.querySelectorAll('.allEntries');

        for (var j = 0; j < $allEntry.length; j++) {
          if ($allEntry[i].getAttribute('data-entry-id') === String(data.editing.entryId)) {
            $allEntry[i].replaceWith(renderData(data.entries[i]));
          }
        }
      }
    }
  } else {
    data.entries.unshift(entryData);
    data.nextEntryId++;
    $newEntries.prepend(renderData(entryData));

  }

  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  data.editing = null;
});

// reload the page to display everything and/after refeashing
function entryDisplay(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = renderData(data.entries[i]);
    $newEntries.appendChild($newEntry);
  }
  viewchange(data.view);

}

document.addEventListener('DOMContentLoaded', entryDisplay);

// here starts with the pen editing part
var $entryView = document.querySelector('#entry-view');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $formTitle = document.querySelector('.formTitle');

$entryView.addEventListener('click', function (event) {
  if (event.target.matches('.editPen') === false) {
    return;
  }
  viewchange(event.target.getAttribute('data-view'));
  $formTitle.textContent = 'Edit Entry';

  for (var i = 0; i < data.entries.length; i++) {
    if (String(data.entries[i].entryId) === event.target.getAttribute('data-entry-id')) {
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
      $picView.setAttribute('src', data.entries[i].photoUrl);
      data.editing = data.entries[i];

    }
  }

});

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

// updated dom tree

// < li class="row allEntries" data-entry-id =''>
//  <div class=" column-half">
//    <div class="picHolder"><img class="picView" src="images/placeholder-image-square.jpg"></div>
//    </div>
//  <div class="column-half entryInfo">
//    <div class="entryEdit column-full">
//     <h2 class="entryTitle">Marvels Movie</h2>
//     <i class=" editPen fas fa-pen" data-entry-id ='' data-view="entry-form" ></i>
//    </div>
//    <p class="entryNote">Our salute to Captain America and his uniforms in the MCU. Which is your favorite? Complete
//     your Marvel Studios' Captain
//    America collection on Digital now!</p>
//    </div>
//  </li >

// here starts the render process
var $newEntries = document.querySelector('.list-group');

function renderData(data) {
  var $newList = document.createElement('li');
  $newList.setAttribute('class', 'row allEntries');
  $newList.setAttribute('data-entry-id', data.entryId);

  var $listPic = document.createElement('div');
  $listPic.setAttribute('class', 'column-half');

  var $picHolder = document.createElement('div');
  $picHolder.setAttribute('class', 'picHolder');

  var $pic = document.createElement('img');
  $pic.setAttribute('class', 'picView');
  $pic.setAttribute('src', data.photoUrl);

  var $entryInfo = document.createElement('div');
  $entryInfo.setAttribute('class', 'column-half entryInfo');

  var $entryEdit = document.createElement('div');
  $entryEdit.setAttribute('class', 'entryEdit column-full');

  var $entryTitle = document.createElement('h2');
  $entryTitle.textContent = data.title;

  var $editPen = document.createElement('i');
  $editPen.setAttribute('class', 'editPen fas fa-pen');
  $editPen.setAttribute('data-entry-id', data.entryId);
  $editPen.setAttribute('data-view', 'entry-form');

  var $entryNote = document.createElement('p');
  $entryNote.textContent = data.notes;

  $newList.appendChild($listPic);
  $newList.appendChild($entryInfo);

  $listPic.appendChild($picHolder);
  $picHolder.appendChild($pic);

  $entryInfo.appendChild($entryEdit);
  $entryInfo.appendChild($entryNote);

  $entryEdit.appendChild($entryTitle);
  $entryEdit.appendChild($editPen);

  return $newList;
}

// here start with the view swapping
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
  if (event.target.matches('.tab') === false) {
    return;
  }
  var dataView = event.target.getAttribute('data-view');
  viewchange(dataView);
  $formTitle.textContent = 'New Entry';
}

$tabList.addEventListener('click', handleViewNav);
$newButton.addEventListener('click', handleViewNav);
$submitButton.addEventListener('click', handleViewNav);
