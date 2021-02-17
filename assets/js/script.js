// Function slides forward
let slideForward = () => {
	let first_layer = document.getElementById('first_layer');
	let first_layer_childrens = first_layer.children;
	let middle_layer = document.getElementById('middle_layer');
	let middle_layer_childrens = middle_layer.children;
	let last_layer = document.getElementById('last_layer');
	let last_layer_childrens = last_layer.children; 
	// Sliding elements forward
	first_layer.insertBefore(middle_layer_childrens[0], first_layer.children[0]);  
	middle_layer.insertBefore(last_layer_childrens[0], middle_layer.children[0]);
	last_layer.appendChild(middle_layer_childrens[middle_layer_childrens.length-1]);
	middle_layer.appendChild(first_layer_childrens[first_layer_childrens.length-1]);
}

// Function slides backward
let slideBackward = () => {
	let first_layer = document.getElementById('first_layer');
	let first_layer_childrens = first_layer.children;
	let middle_layer = document.getElementById('middle_layer');
	let middle_layer_childrens = middle_layer.children;
	let last_layer = document.getElementById('last_layer');
	let last_layer_childrens = last_layer.children; 
	// Sliding elements backward
	last_layer.insertBefore(middle_layer_childrens[0], last_layer_childrens[0]);
	middle_layer.insertBefore(first_layer_childrens[0], middle_layer_childrens[0]);
	first_layer.appendChild(middle_layer_childrens[middle_layer_childrens.length-1]);
	middle_layer.appendChild(last_layer_childrens[last_layer_childrens.length-1]);
}

// This function dynamically display the current clicked image
let setImageActive = (element_id) => {
	let current_image = document.getElementById(element_id);
	let current_layer = current_image.parentElement;
	let layer_childs = current_layer.children;
	let image_position = 0;
	// Finding image position inside the layer
	for(let i = 0; i <= layer_childs.length-1; i++) {
		if(layer_childs[i].id == element_id) {
			image_position = i;
			break;
		}
	}	
	// Creating object for the operation
	if(current_layer.id == 'middle_layer' || current_layer.id == 'last_layer') {
		let operation_name = image_position  == 0 ? 'Forward' : 'Backward';
		let iteration_count = current_layer.id == 'middle_layer' ? 1 : 2;
		let operation_details = {
			'operation_name': operation_name,
			'iteration_count': iteration_count
		};
		performSlideOperation(operation_details);
	}
}

// This function will oerfirm slide iteration
let performSlideOperation = (obj) => {
	let operation_name = obj.operation_name;
	let iteration_count = obj.iteration_count;
	for(let i = 1; i <= iteration_count; i++) {
		// Creating sliding effect by giving timer
		let timeout = i * 200;
		setTimeout(function() {
			if(operation_name == 'Forward') {
				slideForward();
			} else {
				slideBackward();
			}
		}, timeout);
	}
}

// creating dynamic content
let imageData = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg', 'six.jpg', 'seven.jpg'];
let createSliderElements = (arr) => {
	let image_array = arr;
	for(let i = 0; i <= image_array.length-1; i++) {
		// creating image parent
		let image_holder = document.createElement('div');
		image_holder.setAttribute('class', 'image_holder');
		image_holder.setAttribute('id', 'image_holder_'+i);
		image_holder.onclick = function(){setImageActive(this.id);} 
		// creating image
		let image = document.createElement('img');
		image.setAttribute('src', 'assets/images/'+imageData[i]);
		image_holder.appendChild(image);
		//appending dynamic element to the source 
		if(i == 0) {
			document.getElementById('first_layer').appendChild(image_holder);
		} else if(i < 3) {
			document.getElementById('middle_layer').appendChild(image_holder);
		} else {
			document.getElementById('last_layer').appendChild(image_holder);
		}
	}
}
createSliderElements(imageData);