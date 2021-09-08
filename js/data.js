/* exported data */
var $photoUrl = document.querySelector('#photoUrl');
var $picView = document.querySelector('.picView');

function showPicture(event) {
  if (event.target.value !== '') {
    $picView.setAttribute('src', event.target.value);
  }
}

$photoUrl.addEventListener('input', showPicture);

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $entryForm = document.querySelector('#entryForm');
var entryId = 0;

$entryForm.addEventListener('submit', function () {
  event.preventDefault();
  entryId++;
  var entryData = {};
  entryData.title = $entryForm.elements.title.value;
  entryData.photoUrl = $entryForm.elements.photoUrl.value;
  entryData.notes = $entryForm.elements.notes.value;
  entryData.nextEntryId = entryId;
  data.entries.push(entryData);
  data.nextEntryId = entryId;
  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
