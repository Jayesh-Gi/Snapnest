const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gallery = document.getElementById("gallery");
const status = document.getElementById("status");
const resultCount = document.getElementById("resultCount");

searchBtn.addEventListener("click", searchImages);

async function searchImages() {

    const word = searchInput.value.trim();

    // Check empty input
    if (word === "") {
        status.textContent = "Please enter a word to search.";
        gallery.innerHTML = "";
        resultCount.textContent = "";
        return;
    }

    // Clear old results
    gallery.innerHTML = "";
    resultCount.textContent = "";

    // 1. LOADING STATE
    status.textContent = "Searching...";

    try {

        // Use your API URL from Parts 1 and 2
        const response = await fetch(
            `YOUR_API_URL_HERE${encodeURIComponent(word)}`
        );

        // Check API error
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        // Change this if your API uses another property
        const images = data.results || [];

        // 2. EMPTY STATE
        if (images.length === 0) {
            status.textContent =
                `No results for "${word}". Try another search.`;
            return;
        }

        // Remove loading message
        status.textContent = "";

        // 4. POLISH - result count
        resultCount.textContent =
            `Showing ${images.length} results for "${word}"`;

        // Display images
        images.forEach(function(image) {

            const card = document.createElement("div");

            card.className = "card";

            const imageUrl =
                image.urls?.small || image.url;

            const imageLink =
                image.links?.html || image.link || "#";

            card.innerHTML = `
                <img src="${imageUrl}" alt="${word}">

                <a href="${imageLink}" target="_blank">
                    View Image
                </a>
            `;

            gallery.appendChild(card);
        });

    } catch (error) {

        // 3. ERROR STATE
        gallery.innerHTML = "";
        resultCount.textContent = "";

        status.textContent =
            "Something went wrong. Please try again.";

        console.error(error);
    }
}