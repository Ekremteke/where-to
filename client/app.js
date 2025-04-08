const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    })
})



document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const response = await fetch("https://where-to-social-impact-week.up.railway.app/send-email", {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById("success-message").style.display = "block";
        this.reset();
    } else {
        alert("Failed to send email. Please try again.");
    }
});


document.getElementById("careerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    let userInput = {};
    formData.forEach((value, key) => { userInput[key] = value; });

    const responseDiv = document.getElementById("response");
    responseDiv.style.display = "block";
    responseDiv.innerHTML = "<span>Generating career advice...</span>";

    try {
        const response = await fetch("https://where-to-social-impact-week.up.railway.app/api/career-advice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInput)
        });

        const data = await response.json();
        if (data.advice) {
            typeResponse(data.advice, responseDiv);
        } else {
            responseDiv.textContent = "Error generating career advice. Please try again.";
        }
    } catch (error) {
        responseDiv.textContent = "Error connecting to the server. Please try again.";
        console.error("Error:", error);
    }
});

function typeResponse(text, element, delay = 20) {
    element.innerHTML = "";
    let index = 0;
    text = text.replace(/(\d+\.)/g, "<br><br>$1");

    function typeNextCharacter() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(typeNextCharacter, delay);
        }
    }

    typeNextCharacter();
}