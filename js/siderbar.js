let isAtTop = false; // Toggle state

function handleMove() {
    const myDivs = document.getElementsByClassName('divider_area_left');
    if (myDivs.length > 0) {
        const myDiv = myDivs[0];
        if (isAtTop) {
            myDiv.style.top = '88vh'; // Move back to the original position
        } else {
            myDiv.style.top = '127px'; // Move to the top
        }
        isAtTop = !isAtTop; // Toggle the state
        console.log('Element moved!');
    } else {
        console.error('No elements found with the class "divider_area_left"');
    }
}


const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.menu_btn');
const closeBtn = document.querySelector('.close_btn');

const toggleSidebar = () => {
    sidebar.classList.toggle('active'); // Toggle the 'active' class
};

// Add click event listeners
menuBtn.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);

// Optional: Close sidebar if clicking outside
document.addEventListener('click', (e) => {
    if (
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
        ) {
            sidebar.classList.remove('active');
        }
});