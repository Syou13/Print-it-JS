const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
];

// Récupère le nombre de slides à afficher
const slidesLength = slides.length;

// Slide du Carousel par défaut
const baliseImage = document.getElementById("banner-img");
const paragraph = document.getElementById("paragraph");

if (baliseImage && paragraph) {
	baliseImage.setAttribute("src", "./assets/images/slideshow/" + slides[0].image);
	paragraph.innerHTML = slides[0].tagLine;
}

// Initialisation de la variable de slide en cours
let currentSlide = 0;

// Récupère l'élément parent dans lequel les points de navigation ( "dots") seront ajoutés.
// Cet élément HTML doit exister dans le document avec l'ID "dots".
const parentElement = document.getElementById("dots");

// Affichage des points
// Boucle pour créer et afficher un point de navigation pour chaque slide.
// 'slidesLength' représente le nombre total de slides, et la boucle se répète pour chaque slide.
for (let i = 0; i < slidesLength; i++) {
	const nouvelElement = document.createElement("div"); // Crée un nouvel élément HTML de type <div> pour représenter chaque point de navigation (ou "dot").

	// Classe spécifique pour le premier point
	// Si 'i' vaut 0, ce point représente la première slide, donc on ajoute la classe 'dot_selected' 
	// en plus de la classe 'dot' pour le rendre visuellement différent des autres points.
	// Pour les autres points, seule la classe 'dot' est ajoutée.
	nouvelElement.setAttribute("class", i === 0 ? "dot dot_selected" : "dot");
	// Attribue un ID au point correspondant à son index dans le tableau de slides.
	// Cet ID est défini pour qu'il soit facilement sélectionnable lors des changements de slides.
	nouvelElement.setAttribute("id", i);
	// Ajoute ce nouveau point dans l'élément parent ('parentElement') qui les contiendra tous.
	// Ceci permet d'afficher chaque point dans la section dédiée aux points de navigation.
	parentElement.appendChild(nouvelElement);
}

// Fonctions pour les flèches 
// Sélectionne les éléments des flèches de navigation gauche et droite 
const arrowLeft = document.getElementById("arrow_left");
const arrowRight = document.getElementById("arrow_right");

// Vérifie si les éléments flèches existent avant d'ajouter des écouteurs d'événements
if (arrowLeft && arrowRight) {
	// Ajoute un écouteur d'événement "click" sur la flèche gauche
	// qui appelle la fonction 'clickLeft' pour afficher la slide précédente
	arrowLeft.addEventListener("click", clickLeft);
	arrowRight.addEventListener("click", clickRight);
}

// Fonction pour afficher la slide précédente
function clickLeft() {
	// Sauvegarde l'élément représentant le point de navigation actuel
	let oldPoint = document.getElementById(currentSlide);

	// Comportement boucle infinie
	// Condition de boucle infinie pour les slides
	// Si 'currentSlide' est 0 (première slide), le réglage passe à la dernière slide (slidesLength - 1)
	// Sinon, on recule simplement d'une slide en décrémentant 'currentSlide'
	currentSlide = currentSlide === 0 ? slidesLength - 1 : currentSlide - 1; 

	updateSlide(); //est appelé pour mettre à jour l’image et le texte avec la nouvelle slide.

	oldPoint.classList.remove("dot_selected"); //  retiré de l’ancien point et ajouté au nouveau point pour indiquer la position actuelle.
	document.getElementById(currentSlide).classList.add("dot_selected"); // Ajoute la classe 'dot_selected' au point correspondant à la nouvelle slide active
}

// Fonction pour afficher la slide suivante
function clickRight() {
	let oldPoint = document.getElementById(currentSlide); 

	// Comportement boucle infinie

	// Condition de boucle infinie pour les slides
	// Incrémente 'currentSlide' et utilise le modulo avec 'slidesLength' pour revenir au début après la dernière slide
	currentSlide = (currentSlide + 1) % slidesLength; // permet de revenir à la première slide si la dernière slide est affichée.

	updateSlide();
	oldPoint.classList.remove("dot_selected");
	document.getElementById(currentSlide).classList.add("dot_selected"); 
}

// Met à jour l'image et le texte de la slide actuelle
function updateSlide() {
	baliseImage.setAttribute("src", "./assets/images/slideshow/" + slides[currentSlide].image); // Modifie la source de l'image 'baliseImage' pour afficher l'image de la slide en cours
	paragraph.innerHTML = slides[currentSlide].tagLine;
}
