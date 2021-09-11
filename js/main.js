/* global data */
/* exported data */

// show pic starts here
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
  entryData.tag = $entryForm.elements.tag.value;
  entryData.entryId = data.nextEntryId;

  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = entryData.title;
        data.entries[i].photoUrl = entryData.photoUrl;
        data.entries[i].notes = entryData.notes;
        data.entries[i].tag = entryData.tag;
        var $allEntry = document.querySelectorAll('.allEntries');

        for (var j = 0; j < $allEntry.length; j++) {
          if ($allEntry[j].getAttribute('data-entry-id') === String(data.editing.entryId)) {
            $allEntry[j].replaceWith(renderData(data.entries[i]));
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
  viewChange('entries');
  data.editing = null;
});

// here start the delete process

var $deleteTag = document.querySelector('.deleteTag');
var $modalHolder = document.querySelector('.modalHolder');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');
var modal = false;

function callModal(event) {
  modal = !modal;
  if (modal === true) {
    $modalHolder.className = ' modalHolder';
  } else {
    $modalHolder.className = ' modalHolder hidden';
  }
}

function deleteEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);

      var $allEntry = document.querySelectorAll('.allEntries');

      for (var j = 0; j < $allEntry.length; j++) {
        if ($allEntry[j].getAttribute('data-entry-id') === String(data.editing.entryId)) {
          $allEntry[j].remove();
        }
      }
    }
  }

  viewChange(event.target.getAttribute('data-view'));
  callModal(event);
  $deleteTag.className = 'deleteTag noShow';
  $showAll.className = 'showAll noShow';
  data.editing = null;
}

$confirm.addEventListener('click', deleteEntry);
$deleteTag.addEventListener('click', callModal);
$cancel.addEventListener('click', callModal);

// reload the page to display everything and/after refeashing
function entryDisplay(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $newEntry = renderData(data.entries[i]);
    $newEntries.appendChild($newEntry);
  }
  viewChange(data.view);

}

document.addEventListener('DOMContentLoaded', entryDisplay);

// here starts the search part

var $searchEntry = document.querySelector('#searchEntry');
var $showAll = document.querySelector('.showAll');

$searchEntry.addEventListener('submit', function () {
  event.preventDefault();
  var $allEntry = document.querySelectorAll('.allEntries');

  for (var i = 0; i < $allEntry.length; i++) {
    if (($allEntry[i].getAttribute('data-entry-title')).toLowerCase().indexOf(($searchEntry.elements.keyWord.value).toLowerCase()) === -1 && ($allEntry[i].getAttribute('data-entry-notes')).toLowerCase().indexOf(($searchEntry.elements.keyWord.value).toLowerCase()) === -1 && ($allEntry[i].getAttribute('data-entry-tag')).toLowerCase().indexOf(($searchEntry.elements.keyWord.value).toLowerCase()) === -1) {
      $allEntry[i].className = 'row allEntries hidden';
    } else {
      $allEntry[i].className = ' row allEntries';
    }
  }
  viewChange('entries');
  $searchEntry.reset();
  $showAll.className = 'showAll';

});

function showAll(event) {
  var $allEntry = document.querySelectorAll('.allEntries');
  for (var i = 0; i < $allEntry.length; i++) {
    $allEntry[i].className = ' row allEntries';
  }
}

$showAll.addEventListener('click', showAll);

// here starts with the pen editing part and sort tags
var $entryView = document.querySelector('#entry-view');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $tag = document.querySelector('#tag');
var $formTitle = document.querySelector('.formTitle');

function sortTag(event) {
  if (event.target.matches('.entryTag') === false) {
    return;
  }
  var $allEntry = document.querySelectorAll('.allEntries');

  for (var i = 0; i < $allEntry.length; i++) {
    if ($allEntry[i].getAttribute('data-entry-tag') === event.target.getAttribute('data-entry-tag')) {
      $allEntry[i].className = ' row allEntries';
    } else {
      $allEntry[i].className = 'row allEntries hidden';
    }
  }
  $showAll.className = 'showAll';
}

function editEntry(event) {
  if (event.target.matches('.editPen') === false) {
    return;
  }
  viewChange(event.target.getAttribute('data-view'));
  $formTitle.textContent = 'Edit Entry';

  for (var i = 0; i < data.entries.length; i++) {
    if (String(data.entries[i].entryId) === event.target.getAttribute('data-entry-id')) {
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
      $tag.value = data.entries[i].tag;
      $picView.setAttribute('src', data.entries[i].photoUrl);
      data.editing = data.entries[i];
      $deleteTag.className = 'deleteTag';

    }
  }
}
$entryView.addEventListener('click', sortTag);

$entryView.addEventListener('click', editEntry);

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

// <li class="row allEntries" data-entry-id ='' data-entry-title='' data-entry-notes='' data-entry-tag=''>
//  <div class=" column-half">
//    <div class="picHolder"><img class="picView" src="images/placeholder-image-square.jpg"></div>
//  </div>
//  <div class="column-half entryInfo">
//    <div class="entryEdit column-full">
//     <h2 class="entryTitle">Marvels Movie</h2>
//     <i class=" editPen fas fa-pen" data-entry-id ='' data-view="entry-form" ></i>
//    </div>
//    <h3 class="entryTag" data-entry-tag=''>...<h3>
//    <p class="entryNote">Our salute to Captain America and his uniforms in the MCU. Which is your favorite? Complete
//     your Marvel Studios' Captain
//    America collection on Digital now!</p>
//  </div>
// </li >

// here starts the render process
var $newEntries = document.querySelector('.list-group');

function renderData(data) {
  var $newList = document.createElement('li');
  $newList.setAttribute('class', 'row allEntries');
  $newList.setAttribute('data-entry-id', data.entryId);
  $newList.setAttribute('data-entry-title', data.title);
  $newList.setAttribute('data-entry-notes', data.notes);
  $newList.setAttribute('data-entry-tag', data.tag);

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

  var $entryTag = document.createElement('h3');
  $entryTag.setAttribute('class', 'entryTag');
  $entryTag.textContent = data.tag;
  $entryTag.setAttribute('data-entry-tag', data.tag);

  var $entryNote = document.createElement('p');
  $entryNote.textContent = data.notes;

  $newList.appendChild($listPic);
  $newList.appendChild($entryInfo);

  $listPic.appendChild($picHolder);
  $picHolder.appendChild($pic);

  $entryInfo.appendChild($entryEdit);
  $entryInfo.appendChild($entryTag);
  $entryInfo.appendChild($entryNote);

  $entryEdit.appendChild($entryTitle);
  $entryEdit.appendChild($editPen);

  return $newList;
}

// here start with the view swapping
var $tabList = document.querySelector('.tabList');
var $view = document.querySelectorAll('.view');
var $newButton = document.querySelector('.newButton');
// var $submitButton = document.querySelector('.submitButton');

function viewChange(string) {
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
  viewChange(dataView);
  $formTitle.textContent = 'New Entry';
  $entryForm.reset();
  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $showAll.className = 'showAll noShow';

}

$tabList.addEventListener('click', handleViewNav);
$newButton.addEventListener('click', handleViewNav);
