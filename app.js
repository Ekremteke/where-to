const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    })
})



// document.querySelector("form").addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const formData = new FormData(this);

//     const response = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         body: new URLSearchParams(formData),
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//     });

//     const result = await response.json();
//     if (result.success) {
//         document.getElementById("success-message").style.display = "block";
//         this.reset();
//     } else {
//         alert("Failed to send email. Please try again.");
//     }
// });
