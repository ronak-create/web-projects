// Enhanced planet switching with cyan screen transition for card section only
const planets = document.querySelectorAll(".planets");
let currentPlanet = planets[0]; // Start with the first planet visible
currentPlanet.style.display = "flex";

// Create a screen transition element
const transitionScreen = document.createElement("div");
transitionScreen.className = "transition-screen";
document.querySelector(".main").appendChild(transitionScreen);

// Add CSS for the transition screen
const styleElement = document.createElement("style");
styleElement.textContent = `
  .transition-screen {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: cyan;
    z-index: 10;
    transition: bottom 0.6s ease-in-out;
    opacity: 1;
    pointer-events: none; /* Allows clicks to pass through */
  }
  
  .transition-active {
    bottom: 0;
  }
`;
document.head.appendChild(styleElement);

function choosePlanet(val) {
  console.log("Selected planet:", val);
  
  // Find the target planet element
  const targetPlanet = document.querySelector(`.${val}`);
  
  if (targetPlanet === currentPlanet) {
    // No need to animate if selecting the same planet
    return;
  }
  
  // Start the screen transition animation
  // 1. Slide the cyan screen up from bottom to cover current content
  transitionScreen.classList.add("transition-active");
  
  // 2. After screen covers content, switch the planet display
  setTimeout(() => {
    // Hide all planets
    planets.forEach(planet => {
      planet.style.display = "none";
    });
    
    // Show the selected planet
    targetPlanet.style.display = "flex";
    currentPlanet = targetPlanet;
    
    // 3. Slide the cyan screen back down to reveal new content
    setTimeout(() => {
      transitionScreen.classList.remove("transition-active");
    }, 100);
  }, 600);
}

// Enhance login function to store username
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const selectedPlanet = document.querySelector('#selected-planet-icon').src.split('/').pop().split('.')[0];
    
    if (username) {
      // Store user info in session storage
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('homePlanet', selectedPlanet);
      
      // Create and display transition screen
      const loginTransition = document.createElement("div");
      loginTransition.className = "login-transition";
      document.body.appendChild(loginTransition);
      
      // Add styles for login transition
      const loginStyle = document.createElement("style");
      loginStyle.textContent = `
        .login-transition {
          position: fixed;
          bottom: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: cyan;
          z-index: 1000;
          transition: bottom 0.8s ease-in-out;
          opacity: 0.7;
        }
      `;
      document.head.appendChild(loginStyle);
      
      // Trigger animation
      setTimeout(() => {
        loginTransition.style.bottom = "0";
        
        // Redirect after animation completes
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }, 50);
    }
    return false;
  }
  
  // Add this code to your script.js file
  window.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    
    if (username) {
      // Create header greeting if it doesn't exist
      if (!document.querySelector('.header-greeting')) {
        // Create the greeting element
        const greetingHeader = document.createElement('div');
        greetingHeader.className = 'header-greeting';
        greetingHeader.innerHTML = `Hii <span>${username}</span>, ready for some planetary insights?`;
        
        // Add styling for the greeting
        const greetingStyle = document.createElement('style');
        greetingStyle.textContent = `
          .header-greeting {
            position: absolute;
            top: 20px;
            left: 30px;
            color: #fff;
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            padding: 10px 15px;
            border: 2px solid cyan;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            z-index: 50;
          }
          
          .header-greeting span {
            color: cyan;
            font-weight: bold;
          }
        `;
        document.head.appendChild(greetingStyle);
        
        // Add the greeting to the page
        document.querySelector('.main-body').appendChild(greetingHeader);
      }
    } else {
      // Redirect to login page if not logged in
      window.location.href = 'login.html';
    }
  });