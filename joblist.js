const backToTopButton = document.getElementById("backToTop");

        window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
        } else {
        backToTopButton.style.display = "none";
        }
        };

        backToTopButton.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
};
        

document.addEventListener("DOMContentLoaded", () => {
    const jobCards = document.querySelectorAll(".job-card"); 
    const filterContainer = document.getElementById("filter-container"); 
    const clearButton = document.getElementById("clear-filters");
    let activeFilters = []; 

    function updateFilterUI() {
        filterContainer.innerHTML = ""; 

        activeFilters.forEach(filter => {
            const filterTag = document.createElement("span");
            filterTag.innerHTML =` ${filter} <button class="remove-filter text-white hover:bg-black bg-teal-600 px-3 py-1 rounded cursor-pointer">x</button>`;
            filterTag.classList.add("selected-filter", "bg-teal-100", "text-teal-600", "font-semibold", "px-2", "py-1", "rounded-lg", "flex", "items-center", "gap-1");
            filterContainer.appendChild(filterTag);

            filterTag.querySelector(".remove-filter").addEventListener("click", () => {
                activeFilters = activeFilters.filter(f => f !== filter);
                updateFilterUI();
                filterJobs();
            });
        });

        clearButton.style.display = activeFilters.length > 0 ? "block" : "none";
    }

    function filterJobs() {
    if (activeFilters.length === 0) {
        jobCards.forEach(job => (job.style.display = "block lg:flex")); // Show all jobs
        return;
    }

    jobCards.forEach(job => {
        const jobTags = Array.from(job.querySelectorAll(".job-tag")).map(tag => tag.innerText.trim());
        const isVisible = activeFilters.every(filter => jobTags.includes(filter));
        job.style.display = isVisible ? "block lg:flex" : "none";
    });
}

    function addTagListeners() {
        document.querySelectorAll(".job-tag").forEach(tag => {
            tag.addEventListener("click", () => {
                const filter = tag.innerText.trim();

                if (activeFilters.includes(filter)) {
                    activeFilters = activeFilters.filter(f => f !== filter);
                } else {
                    activeFilters.push(filter);
                }

                updateFilterUI();
                filterJobs();
            });
        });
    }

    clearButton.addEventListener("click", () => {
        activeFilters = [];
        updateFilterUI();
        filterJobs();
    });


    addTagListeners();
});