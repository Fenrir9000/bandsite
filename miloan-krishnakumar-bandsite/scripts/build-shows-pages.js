const SHOWS_URL = 'https://project-1-api.herokuapp.com/showdates';
const API_KEY = 'b1b1581c-5ab3-49df-a797-f820a73554ad';

let shows = document.querySelector('.list-one');

const makeElement = (elementName, className) => {
	let varName = document.createElement(elementName);
	varName.classList.add(className);
	return varName;
};

let showsTitle = makeElement('h2', 'list__title');
showsTitle.innerText = 'Show';
shows.append(showsTitle);

function createLi(innerText, stringName, arrayClassValue, arrayInnerText) {
	let innerLi = makeElement('li', 'list-tickets-list');

	let innerP1 = makeElement('p', 'list-tickets-list__silver');
	innerP1.classList.add(arrayClassValue);
	innerP1.innerText = innerText;
	innerLi.append(innerP1);

	let innerP2 = makeElement('p', 'list-tickets-list__' + stringName);
	innerP2.innerText = arrayInnerText;

	innerLi.append(innerP2);

	return innerLi;
}

function createUl(object) {
	let outerUl = makeElement('ul', 'list-tickets');
	let innerButton = makeElement('button', 'list-tickets__button');
	let dateVar = new Date(Number(object.date)).toDateString();
	innerLi1 = createLi(
		'DATES',
		'date',
		'list-tickets-list__body--dissapear',
		dateVar
	);
	innerLi2 = createLi(
		'VENUE',
		'body',
		'list-tickets-list__body--dissapear',
		object.place
	);
	innerLi3 = createLi(
		'LOCATION',
		'body',
		'list-tickets-list__body--dissapear',
		object.location
	);

	innerButton.type = 'submit';
	innerButton.innerText = 'BUY TICKETS';

	outerUl.append(innerLi1);
	outerUl.append(innerLi2);
	outerUl.append(innerLi3);
	outerUl.append(innerButton);

	return outerUl;
}

let venueArray = [
	'Ronald Lane',
	'Pier 3 East',
	'View Lounge ',
	'Hyatt Agency',
	'Moscow Center',
	'Press Club',
];

const createTickets = () => {
	axios
		.get(`${SHOWS_URL}?api_key=${API_KEY}`)
		.then((result) => {
			const showsArray = result.data;
			showsArray.forEach((item) => {
				let ticketsArray = createUl(item);
				shows.appendChild(ticketsArray);
				return shows;
			});
			for (let i = 0; i < venueArray.length; i++) {
				document
					.querySelectorAll('.list-tickets__button')
					[i].addEventListener('click', (event) => {
						document.querySelectorAll('.list-tickets__button')[
							i
						].style.backgroundColor = 'blue';
						console.log(venueArray[i]);
					});
			}
			let appearItem = [
				document.querySelectorAll('.list-tickets-list__silver')[1],
				document.querySelectorAll('.list-tickets-list__silver')[2],
				document.querySelectorAll('.list-tickets-list__silver')[3],
			];
			appearItem.forEach((element) => {
				element.classList.remove('list-tickets-list__body--dissapear');
			});
		})
		.catch((error) => console.log(error));
};

createTickets();
