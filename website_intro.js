// window.onload = function () {
//     let video = document.getElementById("landingbg");
//     let wrapper = document.getElementById("landingbg-wrapper");
//     let content = document.getElementById("everything");
//     let alert = document.getElementById("bottomleftoffer");

//     // Check if the transition has already been shown
//     if (document.cookie.includes("transition_shown=true")) {
//         wrapper.style.display = "none"; // Hide video
//         content.style.display = "block";
//         alert.style.display = "block";
//         content.style.opacity = 1;
//         alert.style.opacity = 1;
//         return;
//     }

//     setTimeout(() => {
//         wrapper.style.opacity = 0;
//         setTimeout(() => {
//             wrapper.style.display = "none"; // Hide video instead of changing src

//             content.style.display = "block";
//             alert.style.display = "block";
//             setTimeout(() => {
//                 content.style.opacity = 1;
//                 alert.style.opacity = 1;
//             }, 50);

//             // Set the cookie to prevent showing again
//             document.cookie = "transition_shown=true; path=/; max-age=" + 60 * 60 * 24 * 30; // 30 days
//         }, 450);
//     }, 4250);
// };

window.onload = function () {
    // let wrapper = document.getElementById("landingbg-wrapper");
    let content = document.getElementById("everything");

    // wrapper.style.display = "none"; 
    content.style.opacity = 1;
    content.style.display = "block";
};