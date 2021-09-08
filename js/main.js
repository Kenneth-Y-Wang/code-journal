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
  data.entries.push(entryData);
  data.nextEntryId++;
  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
