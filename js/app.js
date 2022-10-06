// Adding the navbar

const sections = document.querySelectorAll("section"); // Storing the sections in a node list
let sectionNames = []; //creating an array of names from heading of sections and storing them in sectionNames list
sections.forEach((item,index) => sectionNames[index] = item.querySelector("h2").textContent);
let sectionIds = [];   //creating an array of Ids of sections and storing them in sectionIds list
sections.forEach((item,index) => sectionIds[index] = item.outerHTML.slice(13,21));
let navBar = document.getElementById('navbar__list'); // adding the navBar to a variable
const fragment = document.createDocumentFragment(); //creating a fragment that will hold the navBar list items

for(let i =0 ; i  < sectionNames.length ; i++){   //creating a list items and adding them to the navbar
    let element = document.createElement("li");
    element.innerHTML = `<a href = "#${sectionIds[i]}">${sectionNames[i]}</a>`;
    fragment.appendChild(element);
}
navBar.appendChild(fragment);  //Adding the list elements to the navBar


//Making the scroll behaviour of the navbar

let navBarItems = navBar.querySelectorAll('a');   //To store the navBar items in a variable
navBarItems.forEach(item => {           //Event Listner that make smooth scroll when clicking on the navbar items
    item.addEventListener('click' , function(event){
        event.preventDefault();
        document.querySelector(item.hash).scrollIntoView({behavior : 'smooth'});
    })
})


// Making each section active when its on the view port


document.addEventListener('scroll' , function(){   //Event Listner to focus on the topic in the viewport when scrolling
    sections.forEach((item, index) => {
        item.classList.remove('your-active-class');
        navBarItems[index].classList.remove('active')
        let position = item.getBoundingClientRect();
        if((position.top >= -0.5 * position.height) && (position.bottom <= window.innerHeight)){
            item.classList.add('your-active-class');
            item.querySelector('h2').style.color = 'yellow';
            navBarItems[index].classList.add('active');       //To make section in the navbar highlighted when active 
        } else {
            item.querySelector('h2').style.color = 'white';
        }
    })
});


//Creating the scroll to top button 


let up_button = document.createElement('span');  //Creating a scroll to top button
up_button.textContent = "UP";
up_button.classList.add("up");
document.querySelector("main").appendChild(up_button); 
window.onscroll = function(){   //Making the button to be only visible when the user scrolls below the fold of the page
    if(window.scrollY > 500){   //The up button will appear when scrolling
        up_button.classList.add("show");
        up_button.addEventListener('click' , function(){
            window.scrollTo({top : 0 , behavior : 'smooth'});
        })
    } else {
        up_button.classList.remove("show");
    }
}