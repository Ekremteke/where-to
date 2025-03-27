require('dotenv').config()



document.getElementById("careerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log('hello world')
    const formData = new FormData(this);
    let userInput = {};
    formData.forEach((value, key) => { userInput[key] = value; });

    const prompt = `Given the following user profile:
    Age: ${userInput.age}
    Education Level: ${userInput.education}
    Strengths: ${userInput.strengths}
    Weaknesses: ${userInput.weaknesses}
    Interests: ${userInput.interests}
    Personality Traits: ${userInput.personality}
    Work-Life Priorities: ${userInput.work_life_priorities}
    Skills: ${userInput.skills}
    Career Goals: ${userInput.career_goals}
    Preferred Work Environment: ${userInput.work_environment}
    Willing to Relocate: ${userInput.relocate}
    Suggest the best career fields for them and explain why. keep it relatively short and sweet`;


    const apiKey = process.env.API_KEY;
    const responseDiv = document.getElementById("response");
    responseDiv.style.display = "block";
    responseDiv.innerHTML = "<span>Generating career advice...</span>";
    console.log(prompt)
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "system", content: "You are a career advisor." }, { role: "user", content: prompt }],
                max_tokens: 300
            })
        });

        const data = await response.json();
        const fullText = data.choices[0].message.content;
        typeResponse(fullText, responseDiv);
    } catch (error) {
        responseDiv.textContent = "Error generating career advice. Please try again.";
        console.log("Error generating career advice. Please try again.")
    }
});


function typeResponse(text, element, delay = 20) {
    element.innerHTML = ""; // Clear previous text
    let index = 0;

    text = text.replace(/(\d+\.)/g, "<br><br>$1");

    function typeNextCharacter() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(typeNextCharacter, delay); // Delay between characters
        }
    }

    typeNextCharacter();
}