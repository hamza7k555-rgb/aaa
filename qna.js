document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".q-wrapper");

    questions.forEach(question => {
        question.addEventListener("click", function() {
            // Close all other answers
            questions.forEach(q => {
                if (q !== question) {
                    q.querySelector(".answer-text").style.display = "none";
                    q.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)";
                }
            });

            // Toggle the clicked answer
            const answer = this.querySelector(".answer-text");
            const icon = this.querySelector(".fa-chevron-down");

            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                icon.style.transform = "rotate(180deg)";
            } else {
                answer.style.display = "none";
                icon.style.transform = "rotate(0deg)";
            }
        });
    });
});