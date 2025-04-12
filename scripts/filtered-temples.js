const mainnav = document.querySelector(".navigation");
const hamb = document.querySelector("#menu");
const menuIcon = document.querySelector(".menu-icon");

hamb.addEventListener("click", () => {
    mainnav.classList.toggle("show");
    if (mainnav.classList.contains("show")) {
        menuIcon.textContent = "X";
    } else {
        menuIcon.textContent = "☰";
    }
});

const temples = [
    {
        templeName: "Aba Nigeria Temple",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah Temple",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah Temple",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam Temple",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C. Temple",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú Temple",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Temple",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Tijuana Mexico Temple",
        location: "Tijuana, Mexico",
        dedicated: "2015, December, 13",
        area: 33367,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tijuana-mexico/320x200/tijuana-mexico-temple-exterior-1603896-wallpaper.jpg"
    },
    {
        templeName: "San Diego California Temple",
        location: "San Diego, California, United States",
        dedicated: "1993, April, 30",
        area: 72000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg"
    },
    {
        templeName: "Preston England Temple",
        location: "Preston, England",
        dedicated: "1998, June, 10",
        area: 69630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/preston-england/400x250/preston-temple-765117-wallpaper.jpg"
    },
    {
        templeName: "Fukuoka Japan Temple",
        location: "Fukuoka, Japan",
        dedicated: "2000, June, 11",
        area: 10700,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/400x250/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
    }
];

const main = document.querySelector("main");

function displayTemples(templeList) {
    main.innerHTML = "";
    templeList.forEach((temple) => {
        const templeCard = document.createElement("section");
        const templeName = document.createElement("h3");
        templeName.textContent = temple.templeName;

        const templeLocation = document.createElement("p");
        templeLocation.textContent = `location: ${temple.location}`;

        const templeDedicated = document.createElement("p");
        templeDedicated.textContent = `dedicated: ${temple.dedicated}`;

        const templeArea = document.createElement("p");
        templeArea.textContent = `area: ${temple.area.toLocaleString()} sq ft`;

        const templeImage = document.createElement("img");
        templeImage.setAttribute("src", temple.imageUrl);
        templeImage.setAttribute("alt", temple.templeName);
        templeImage.setAttribute("loading", "lazy");

        templeCard.appendChild(templeName);
        templeCard.appendChild(templeLocation);
        templeCard.appendChild(templeDedicated);
        templeCard.appendChild(templeArea);
        templeCard.appendChild(templeImage);

        main.appendChild(templeCard);
    });
}

function filterTemples(criteria) {
    let filteredTemples;
    switch (criteria) {
        case "old":
            filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900);
            break;
        case "new":
            filteredTemples = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000);
            break;
        case "large":
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case "small":
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        default:
            filteredTemples = temples;
    }
    displayTemples(filteredTemples);
}

const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const filter = link.textContent.toLowerCase();
        filterTemples(filter);
    });
});

displayTemples(temples);