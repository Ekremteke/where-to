const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    })
})



document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        subject: document.querySelector('input[name="subject"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    try {
        // POST isteği göndermek
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Email gönderilemedi');
        }

        const result = await response.text();
        alert(result);
    } catch (error) {
        alert('Bir hata oluştu: ' + error.message);
    }
});

