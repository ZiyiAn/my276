
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var sortedGrades = grades;//should do deep copy...
sortedGrades.sort(function (a,b){return parseFloat(b) - parseFloat(a)})//descending sort

window.onload = function() {
  computeHist();
};

function computeHist(){
	var displays = document.getElementsByName("display");
  var inputs = document.getElementsByTagName("input");
  var histogram = new Array(11).fill(0);
  var lowerBounds = new Array(12).fill(0);
	var i = 0;
  var j = 0;

	//get input values as float
	for(i = 0; i < 12; i++){
		lowerBounds[i] = parseFloat(inputs[i].value);
	}
  //init histogram
  for(i = 0; i < 11; i++){
		displays[i].innerHTML = "<br>"
	}
  //check validation
  var isValid = true;

  for(i = 0; i < 11; i++){
    for(j = i + 1; j < 12; j++){
      if(isNaN(lowerBounds[i]) || lowerBounds[i] < 0 ||
        isNaN(lowerBounds[j]) || lowerBounds[j] < 0 ||
        lowerBounds[i] < lowerBounds[j]){
        //if invalid, change to red
        inputs[i].style.color = "#ff0000";
        inputs[j].style.color = "#ff0000";
        isValid = false;
      }
      else{
        inputs[i].style.color = "#000000";
        inputs[j].style.color = "#000000";
      }
    }
    if(!isValid){
      return;
    }
  }

	//compute distributes of histogram
  j = 0;
	for(i = 0; i < sortedGrades.length; i++){
		if(j == 0){
			if(sortedGrades[i] <= lowerBounds[j]){
				j++;
				histogram[j-1]++;
			}
		}
		else{
			if(sortedGrades[i] < lowerBounds[j]){
				j++;
			}
			histogram[j-1]++;
		}
	}
  //print distributions of the histogram
	for(i = 0; i < 11; i++){
		var output = ""
		for(var j = 0; j < histogram[i]; j++){
				output = output + "O"
		}
		displays[i].innerHTML = output
	}
}
