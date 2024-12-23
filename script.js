document.getElementById('getResult').addEventListener('click', function () {
    const target = document.querySelector('#result');
    const offset = 100; // Adjust as needed
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});


document.querySelector('.cta-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector('#title');
    const offset = 50; // Adjust this value as needed
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

document.getElementById("getResult").addEventListener("click", function () {
    
    const geminiAPIkey = "AIzaSyDe3rFpW32v3ugHrBi2eS07iiKWke3jCDM";
    const geminiAIModel = "gemini-1.5-flash";
    const imageInput = document.getElementById("image");
    const details = document.getElementById("details").value;
    const loadElement = document.getElementById("load"); // Custom load element
    const resultDiv = document.getElementById("resulttext");

    // Validate input
    if (imageInput.files.length === 0 || details.trim() === "") {
        alert("Please upload the image and provide the details.");
        return;
    }

    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onloadend = function () {
        const base64Image = reader.result.split(",")[1];
        const imageType = imageFile.type;

        const data = {
            contents: [
                {
                    parts: [
                        { text: details },
                        {
                            inlineData: {
                                mimeType: imageType,
                                data: base64Image,
                            },
                        },
                    ],
                },
            ],
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            ],
        };

        // Show the custom load element and clear previous result
        loadElement.style.display = "block";
        resultDiv.innerText = "";
        resultDiv.style.marginTop = "80px"; // Reset margin
        resultDiv.style.height = "auto"; // Let the height adjust
        resultDiv.style.overflow = "hidden"; // Hide overflow

        // API request
        fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${geminiAIModel}:generateContent?key=${geminiAPIkey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log("API Response:", result);
                const textContent = result.candidates[0]?.content?.parts[0]?.text || "No content received.";
                resultDiv.innerText = textContent;

                // Hide the custom load element and scroll to the result
                loadElement.style.display = "none";
                resultDiv.scrollIntoView({ behavior: "smooth" });
            })
            .catch((error) => {
                console.error("Error:", error);

                // Hide the custom load element and display error message
                loadElement.style.display = "none";
                resultDiv.innerText = "Error: " + error.message;
            });
    };
});

// Image upload and preview logic
document.getElementById("image").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Set the preview image
            const preview = document.getElementById("imagePreview");
            preview.src = e.target.result;
            preview.style.display = "block"; // Show the image

            // Show preview container
            document.getElementById("imagePreviewContainer").style.display = "flex";
        };
        reader.readAsDataURL(file); // Convert the file to a data URL
    }
});




import Spheres2Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.8/build/backgrounds/spheres2.cdn.min.js'

const bg = Spheres2Background(document.getElementById('webgl-canvas'), {
    count: 150,
    colors: [0xff0000, 0x0, 0xffffff],
    minSize: 0.5,
    maxSize: 1
})


