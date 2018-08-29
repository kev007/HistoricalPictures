let i = 1;

function addOptional2() {

  var inputElem = document.createElement('input');
  inputElem.id = 'optionalTag' + i;
  inputElem.name = 'optionalTag' + i;

  inputElem.setAttribute('placeholder', 'optionalTag' + i);
  inputElem.setAttribute('type', 'text');
  inputElem.style.margin = '5px';


  document.getElementById("optional_Tag").appendChild(inputElem);
  i++;

}
