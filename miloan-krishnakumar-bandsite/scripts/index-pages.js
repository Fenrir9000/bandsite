const commentsLoaded = [
	{
		name: 'Connor Walton',
		date: '02/17/2021',
		comment:
			'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
		class: 'comments-pre--topBorder',
		pictureClass: 'comments-pre__circle',
	},
	{
		name: 'Emilie Beach',
		date: '01/09/2021',
		comment:
			'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
		pictureClass: 'comments-pre__circle',
	},
	{
		name: 'Miles Acosta',
		date: ' 12/20/2020',
		comment:
			"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
		class: 'comments-pre--bottomBorder',
		pictureClass: 'comments-pre__circle',
	},
];

const makeElement = (elementName, className) => {
	let varName = document.createElement(elementName);
	varName.classList.add(className);
	return varName;
};

let section = makeElement('section', 'comments');

function displayComment(arrayofObjects) {
	let outerDiv = makeElement('div', 'comments-pre');
	outerDiv.classList.add(arrayofObjects.class);

	let innerDiv = makeElement('div', 'comments-pre-top');
	outerDiv.append(innerDiv);

	let innerCircle = makeElement('div', arrayofObjects.pictureClass);
	innerDiv.append(innerCircle);

	let innerP = makeElement('p', 'comments-pre-top__name');
	innerP.innerText = arrayofObjects.name;
	innerDiv.append(innerP);

	let innerP2 = makeElement('p', 'comments-pre-top__date');
	innerP2.innerText = arrayofObjects.date;
	innerDiv.append(innerP2);

	let innerP3 = makeElement('p', 'comments-pre-bottom__loaded');
	innerP3.innerText = arrayofObjects.comment;
	outerDiv.append(innerP3);

	section.appendChild(outerDiv);
	return outerDiv;
}

let body = document.querySelector('body');

body.addEventListener('click', (e) => {
	let nameField = document.getElementById('name');
	let commentField = document.getElementById('comment');

	nameField.removeAttribute('required');
	commentField.removeAttribute('required');
});

function loadHtml() {
	for (let i = 0; i < commentsLoaded.length; i++) {
		displayComment(commentsLoaded[i]);
	}
	body.insertBefore(section, body.children[2]);
}

loadHtml();

let form = document.querySelector('.comments-form');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	let nameField = document.getElementById('name');
	let commentField = document.getElementById('comment');
	if (event.target.name.value === '') {
		nameField.setAttribute('required', 'required');
		return;
	} else if (event.target.comment.value === '') {
		commentField.setAttribute('required', 'required');
		return;
	} else {
		section.innerHTML = '';

		let userName = nameField.value;

		let userComment = commentField.value;

		let todayVar = new Date();
		let date =
			(todayVar.getMonth() + 1) +
			'/' +
			todayVar.getDate() +
			'/' +
			todayVar.getFullYear();

		commentsLoaded.unshift({
			name: userName,
			date: date,
			comment: userComment,
			class: 'comments-pre--newBorder',
			pictureClass: 'comments-pre__circle--pictureClass',
			exactTime: Date.now(),
		});
		nameField.removeAttribute('required');
		commentField.removeAttribute('required');

		loadHtml();
		form.reset();
	}
});


