



function validInsert(){
	var message1 = document.getElementById("message1");
	var message2 = document.getElementById("message2");
	var data1 = document.getElementById("form1");
	var name = data1[0].value
	var gender = data1[1].checked?"M":data1[2].checked?"F":"O"
	var weight = parseFloat(data1[4].value)
	var height = parseFloat(data1[5].value)
	var color = data1[6].value
	var gpa = parseFloat(data1[7].value)


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

	if (message!=""){
		message1.innerHTML = "Invalid Input From" + message;
		return false
	}
		
	else{
		message1.innerHTML = "Please fill out the student's info to insert";
		return true
	}
}
