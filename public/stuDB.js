



function validInsert(){
	var warning = document.getElementById("warning");
	var data = document.getElementById("form");
	var name = data[0].value
	var weight = parseFloat(data[1].value)
	var height = parseFloat(data[2].value)
	var color = data[3].value
	var gpa = parseFloat(data[4].value)
	var speed = parseFloat(data[5].value)


	message = ""

	if (name.length==0)
		message += " name "

	if (isNaN(weight)||weight<=0)
		message += " weight "

	if (isNaN(height)||height<=0)
		message += " height "

	if (color.length==0)
		message += " color "

	if (isNaN(gpa)||gpa<0)
		message += " gpa "

	if (isNaN(speed)||speed<0)
		message += " speed "
	
	if (message!=""){
		warning.innerHTML = "Invalid Input From " + message;
		return false
	}
		
	else{
		warning.innerHTML = "";
		return true
	}
}
