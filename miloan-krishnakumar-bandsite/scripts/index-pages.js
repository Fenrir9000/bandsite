let body = document.querySelector('body');

const makeElement = (elementName, className) => {
	let varName = document.createElement(elementName);
	varName.classList.add(className);
	return varName;
};

let section = makeElement('section', 'comments');

const COMMENT_URL = 'https://project-1-api.herokuapp.com/comments';
const API_KEY = 'b1b1581c-5ab3-49df-a797-f820a73554ad';

const displayComment = () => {
	axios
		.get(`${COMMENT_URL}?api_key=${API_KEY}`)
		.then((result) => {
			const commentsArray = result.data;
			commentsArray.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});
			commentsArray.forEach((comment) => {
				if (
					comment.name === 'Connor Walton' ||
					comment.name === 'Emilie Beach' ||
					comment.name === 'Miles Acosta'
				) {
					innerDisplayFirst(comment, 'new', '');
				} else {
					innerDisplayFirst(comment, 'new', '--pictureClass');
				}
			});

			let nodes = document.querySelectorAll('.comments-pre');
			let lastNode = nodes[nodes.length - 1];
			lastNode.classList.add('comments-pre--bottomBorder');
			lastNode.classList.remove('comments-pre--newBorder');
		})
		.catch((error) => console.log(error));
	body.insertBefore(section, body.children[2]);
};

displayComment();

function innerDisplayFirst(comment, position, picture) {
	let outerDiv = makeElement('div', 'comments-pre');
	outerDiv.classList.add(`comments-pre--${position}Border`);

	let innerDiv = makeElement('div', 'comments-pre-top');
	outerDiv.append(innerDiv);

	let innerCircle = makeElement('div', `comments-pre__circle${picture}`);
	innerDiv.append(innerCircle);

	let innerP = makeElement('p', 'comments-pre-top__name');
	innerP.innerText = comment.name;
	innerDiv.append(innerP);

	let innerP2 = makeElement('p', 'comments-pre-top__date');
	let dateVar = new Date(Number(comment.timestamp));
	let dateFormatted =
		('0' + (dateVar.getMonth() + 1)).slice(-2) +
		'/' +
		('0' + dateVar.getDate()).slice(-2) +
		'/' +
		dateVar.getFullYear();
	innerP2.innerText = dateFormatted;
	innerDiv.append(innerP2);

	let innerP3 = makeElement('p', 'comments-pre-bottom__loaded');
	innerP3.innerText = comment.comment;
	outerDiv.append(innerP3);

	section.appendChild(outerDiv);

	section.insertBefore(outerDiv, section.children[0]);

	return outerDiv;
}

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
		document
			.querySelectorAll('.comments-pre')
			.forEach((event) => event.remove());
		let userName = nameField.value;
		let userComment = commentField.value;

		const newComment = {
			name: userName,
			comment: userComment,
		};

		axios
			.post(`${COMMENT_URL}?api_key=${API_KEY}`, newComment)
			.then((response) => {
				nameField.removeAttribute('required');
				commentField.removeAttribute('required');
				displayComment();
			})
			.catch((error) => console.log(error));

		form.reset();
	}
});

body.addEventListener('click', (e) => {
	let nameField = document.getElementById('name');
	let commentField = document.getElementById('comment');

	nameField.removeAttribute('required');
	commentField.removeAttribute('required');
});
