const ticketsLoading = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
  {
    date: "Fri Oct 15 2021 ",
    venue: "View Lounge ",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
    classDissapear: "list-tickets-list__body--dissapear",
  },
];

const makeElement = (elementName, className) => {
  let varName = document.createElement(elementName);
  varName.classList.add(className);
  return varName;
};

let list = document.querySelector(".list-one");
let listTitle = makeElement("h2", "list__title");
listTitle.innerText = "Shows";
list.append(listTitle);

function createLi(innerText, stringName, arrayClassValue, arrayInnerText) {
  let innerLi = makeElement("li", "list-tickets-list");

  let innerP1 = makeElement("p", "list-tickets-list__silver");
  innerP1.classList.add(arrayClassValue);
  innerP1.innerText = innerText;
  innerLi.append(innerP1);

  let innerP2 = makeElement("p", "list-tickets-list__" + stringName);
  innerP2.innerText = arrayInnerText;

  innerLi.append(innerP2);

  return innerLi;
}

function createUl(object) {
  let outerUl = makeElement("ul", "list-tickets");
  let innerButton = makeElement("button", "list-tickets__button");

  innerLi1 = createLi("DATES", "date", object.classDissapear, object.date);
  innerLi2 = createLi("VENUE", "body", object.classDissapear, object.venue);
  innerLi3 = createLi(
    "LOCATION",
    "body",
    object.classDissapear,
    object.location
  );

  innerButton.type = "submit";
  innerButton.innerText = "BUY TICKETS";

  outerUl.append(innerLi1);
  outerUl.append(innerLi2);
  outerUl.append(innerLi3);
  outerUl.append(innerButton);

  return outerUl;
}

const createTickets = (array) => {
  for (let i = 0; i < array.length; i++) {
    let ticketsArray = createUl(array[i]);
    list.appendChild(ticketsArray);
  }
  return list;
};

createTickets(ticketsLoading);

for (let i = 0; i < ticketsLoading.length; i++) {
  	document.querySelectorAll(".list-tickets__button")[i].addEventListener("click", (event) => {
		document.querySelectorAll(".list-tickets__button")[i].style.backgroundColor = "blue";
    });
}
