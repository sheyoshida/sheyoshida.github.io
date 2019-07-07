function modalView(event) {
	event.preventDefault();
	console.log(event.target);
	$('.modal-drawer').slideToggle();
}

$('.modal-button').click(modalView);