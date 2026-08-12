document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const categoryTabs = document.querySelectorAll(".category-tab");
    const eventCards = document.querySelectorAll(".event-card");
    const searchInput = document.querySelector(".search-field input");
    const categorySelect = document.querySelector(".filter-field select");
    const searchButton = document.querySelector(".search-button");
    const noEvents = document.querySelector(".no-events");
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal-close");
    const modalImage = document.querySelector(".modal-image img");
    const modalTitle = document.querySelector(".modal-content h2");
    const modalDescription = document.querySelector(".modal-content > p");
    const modalDetails = document.querySelector(".modal-details");
    const modalBook = document.querySelector(".modal-book");
    const bookingForm = document.querySelector(".booking-form");
    const toast = document.querySelector(".toast");

    const events = [
        {
            title: "Neon Nights Music Festival",
            category: "Music",
            date: "24",
            month: "AUG",
            location: "Hyderabad",
            price: "₹799",
            image: "images/music-event.jpg",
            description: "Experience an unforgettable night filled with live music, amazing performances and energetic entertainment.",
            time: "6:00 PM",
            venue: "Hitex Exhibition Center"
        },
        {
            title: "Future Tech Summit",
            category: "Technology",
            date: "31",
            month: "AUG",
            location: "Hyderabad",
            price: "₹999",
            image: "images/tech-event.jpg",
            description: "Discover emerging technologies, innovative ideas and the future of digital transformation.",
            time: "10:00 AM",
            venue: "HICC Hyderabad"
        },
        {
            title: "Creative Art Exhibition",
            category: "Art",
            date: "07",
            month: "SEP",
            location: "Bengaluru",
            price: "₹499",
            image: "images/art-event.jpg",
            description: "Explore beautiful artwork created by talented artists and creative minds.",
            time: "11:00 AM",
            venue: "Art Gallery Bengaluru"
        },
        {
            title: "Business Leaders Meetup",
            category: "Business",
            date: "14",
            month: "SEP",
            location: "Mumbai",
            price: "₹1299",
            image: "images/business-event.jpg",
            description: "Connect with entrepreneurs, professionals and business leaders from different industries.",
            time: "9:30 AM",
            venue: "Business Convention Center"
        },
        {
            title: "Food & Culture Festival",
            category: "Food",
            date: "21",
            month: "SEP",
            location: "Chennai",
            price: "₹599",
            image: "images/food-event.jpg",
            description: "Enjoy delicious food, cultural performances and exciting activities for everyone.",
            time: "5:00 PM",
            venue: "Chennai Trade Centre"
        },
        {
            title: "Startup Innovation Expo",
            category: "Business",
            date: "28",
            month: "SEP",
            location: "Delhi",
            price: "₹899",
            image: "images/startup-event.jpg",
            description: "Meet innovative startups and explore new ideas, products and business opportunities.",
            time: "10:30 AM",
            venue: "Pragati Maidan"
        }
    ];

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    function filterEvents(category = "All", search = "") {
        let visibleCount = 0;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category || "";
            const cardTitle = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const cardLocation = card.querySelector(".event-info p")?.textContent.toLowerCase() || "";

            const categoryMatch =
                category === "All" ||
                cardCategory.toLowerCase() === category.toLowerCase();

            const searchMatch =
                !search ||
                cardTitle.includes(search.toLowerCase()) ||
                cardLocation.includes(search.toLowerCase());

            if (categoryMatch && searchMatch) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        if (noEvents) {
            noEvents.classList.toggle("show", visibleCount === 0);
        }
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            categoryTabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            const category = tab.dataset.category || tab.textContent.trim();
            filterEvents(category, searchInput?.value || "");
        });
    });

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const category = categorySelect?.value || "All";
            const search = searchInput?.value.trim() || "";

            filterEvents(category, search);

            document.querySelector("#events")?.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const activeTab = document.querySelector(".category-tab.active");
            const category = categorySelect?.value || activeTab?.dataset.category || "All";
            filterEvents(category, searchInput.value);
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
            filterEvents(categorySelect.value, searchInput?.value || "");
        });
    }

    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            button.textContent = button.classList.contains("active") ? "♥" : "♡";

            showToast(
                button.classList.contains("active")
                    ? "Event added to your favourites"
                    : "Event removed from your favourites"
            );
        });
    });

    function openEventModal(event) {
        if (!modal) return;

        const image = modalImage;
        const title = modalTitle;
        const description = modalDescription;

        if (image) {
            image.src = event.image;
            image.alt = event.title;
        }

        if (title) {
            title.textContent = event.title;
        }

        if (description) {
            description.textContent = event.description;
        }

        if (modalDetails) {
            modalDetails.innerHTML = `
                <div><span>📅</span><strong>${event.date} ${event.month}</strong></div>
                <div><span>📍</span><strong>${event.venue}, ${event.location}</strong></div>
                <div><span>⏰</span><strong>${event.time}</strong></div>
                <div><span>🎟️</span><strong>Starting from ${event.price}</strong></div>
            `;
        }

        if (modalBook) {
            modalBook.dataset.event = event.title;
        }

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    document.querySelectorAll(".details-button").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".event-card");

            if (!card) return;

            const title = card.querySelector("h3")?.textContent.trim();
            const event = events.find(item => item.title === title);

            if (event) {
                openEventModal(event);
            } else {
                openCardModal(card);
            }
        });
    });

    function openCardModal(card) {
        if (!modal) return;

        const title = card.querySelector("h3")?.textContent || "Event Details";
        const description =
            card.querySelector(".event-info p")?.textContent ||
            "Join us for an amazing event experience.";

        const image = card.querySelector(".event-image img")?.src || "";

        if (modalImage) {
            modalImage.src = image;
            modalImage.alt = title;
        }

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalDescription) {
            modalDescription.textContent = description;
        }

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;

        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    if (modalBook) {
        modalBook.addEventListener("click", () => {
            const eventName = modalBook.dataset.event || "Selected Event";

            closeModal();

            const eventInput = document.querySelector(
                '.booking-form input[name="event"], #event'
            );

            if (eventInput) {
                eventInput.value = eventName;
            }

            document.querySelector("#booking")?.scrollIntoView({
                behavior: "smooth"
            });

            setTimeout(() => {
                document.querySelector("#name")?.focus();
            }, 700);
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", event => {
            event.preventDefault();

            const formData = new FormData(bookingForm);
            const name = formData.get("name") || document.querySelector("#name")?.value;
            const eventName =
                formData.get("event") ||
                document.querySelector("#event")?.value ||
                "your selected event";

            if (!name) {
                showToast("Please enter your name");
                return;
            }

            showToast(`Thank you ${name}! Your request for ${eventName} has been received.`);

            bookingForm.reset();
        });
    }

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3500);
    }

    document.querySelectorAll('a[href^="#"]').forEach(link =>
