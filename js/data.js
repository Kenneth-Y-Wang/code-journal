/* exported data */
var $photoUrl = document.querySelector('#photoUrl');
var $picView = document.querySelector('.picView');

console.log($photoUrl),
console.log($picView);

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

console.log($entryForm);
var nextEntryId = 0;

$entryForm.addEventListener('submit', function () {
  event.preventDefault();
  nextEntryId++;
  var entryData = {};
  entryData.title = $entryForm.elements.title.value;
  entryData.photoUrl = $entryForm.elements.photoUrl.value;
  entryData.notes = $entryForm.elements.notes.value;
  entryData.nextEntryId = nextEntryId;
  data.entries.push(entryData);
  console.log(entryData);
  console.log(data);
  $picView.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
