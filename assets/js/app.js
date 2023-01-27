
let cl = console.log;
// CRUD -->> create, Read, UPdate and delete

let stdform1 = document.getElementById("stdform");
let fnameControls = document.getElementById("fname");
let lnameControls = document.getElementById("lname");
let emailControls = document.getElementById("email");
let contactControls = document.getElementById("contact");  
let stdInfoContainer = document.getElementById("stdInfoContainer");
let subBtn = document.getElementById("subBtn");
let updateBtn = document.getElementById("updateBtn");

let stdArray = [];       

function setStdDataInStorage(){
	localStorage.setItem("setStdInfo", JSON.stringify(stdArray));		
}


const onEditHandler = (ele) =>{   
	// cl("Editted", ele);
	let getId = ele.getAttribute("data-id");
	// cl(getId);  			
	localStorage.setItem("updateId", getId);		

	//how get uniq id
	// find out object from stdArray
	let getObj = stdArray.find(std => std.id === getId);			
	cl(getObj);

	fnameControls.value = getObj.fname;					
	lnameControls.value = getObj.lname;
	emailControls.value = getObj.email;
	contactControls.value = getObj.contact;

	subBtn.classList.add('d-none');                 
	updateBtn.classList.remove('d-none'); 			
}	
 
const onDeletehandler = (ele) =>{  
	// cl(ele);												
	// let deleteId = ele.getAttribute("data-id");				
					//OR
	let deleteId = ele.dataset.id						
	// cl(deleteId);
	let getIndex = stdArray.findIndex(std => std.id === deleteId);	
	stdArray.splice(getIndex, 1);
	// localStorage.setItem("setStdInfo", JSON.stringify(stdArray));
	setStdDataInStorage();
	cl(ele.parentElement.parentElement);
	ele.parentElement.parentElement.remove();
}
const templating = (arr) =>{        
	let result = '';
	arr.forEach((std, i) =>{
		result += `
						<tr>
						<td>${ i + 1}</td>
						<td>${std.fname}</td>
						<td>${std.lname}</td>
						<td>${std.email}</td>
						<td>${std.contact}</td>
							<td>
								<button class="btn btn-info" data-id="${std.id}" onclick="onEditHandler(this)">Edit</button>
							</td>
							<td>
								<button class="btn btn-danger" data-id="${std.id}" onclick="onDeletehandler(this)">Delete</button>
							</td>                                     

						</tr>
				`        
							
	});						
							
							
	stdInfoContainer.innerHTML = result;
}
if(localStorage.getItem("setStdInfo")){
	stdArray = JSON.parse(localStorage.getItem("setStdInfo"));
	templating(stdArray);
}
const onstdSubmit = (eve) => {
	eve.preventDefault();     
	// cl("form sub");
	let obj = {
		fname : fnameControls.value,   
		lname : lnameControls.value,
		email : emailControls.value,
		contact: contactControls.value,
		id :   uuid()            				

	}
	stdArray.push(obj);     //44)........
	// cl(stdArray);
	// localStorage.setItem("setStdInfo", JSON.stringify(stdArray));  
	setStdDataInStorage();
	templating(stdArray);
	stdform1.reset();
}

const onstdupdate = (e) =>{
	// cl("upadte!!!!!!!!!!!!");
	let getUpdateId = localStorage.getItem("updateId");	 
	cl(getUpdateId);
	stdArray.forEach(std =>{				
		if(getUpdateId === std.id){
			std.fname = fnameControls.value;
			std.lname = lnameControls.value;
			std.email = emailControls.value;
			std.contact = contactControls.value;
		}
	})
	// localStorage.setItem("setStdInfo", JSON.stringify(stdArray));		
	setStdDataInStorage();
	templating(stdArray);
	stdform.reset();

	subBtn.classList.remove('d-none'); 		
	updateBtn.classList.add('d-none');
	
	
}


stdform1.addEventListener("submit", onstdSubmit);
updateBtn.addEventListener('click', onstdupdate);		



function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }

  


// const btnEdit = [...document.querySelectorAll('.btn-info')];
// btnEdit.forEach(btn => {
// 	btn.addEventListener('click', function (eve){
// 		cl(eve.target);
// 	})
// }) // 2)
// On the fly Element >> HTML element which are created in javascript
