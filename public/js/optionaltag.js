let i = 1;

function addOptionalTag() {

  var inputElem = document.createElement('input');
  inputElem.id = 'addOptionalTag' + i;
  inputElem.name = 'addOptionalTag' + i;

  inputElem.setAttribute('placeholder', 'optionalTag' + i);
  inputElem.setAttribute('type', 'text');
  inputElem.style.margin = '5px';


  document.getElementById("optional_Tag").appendChild(inputElem);
  i++;

}
