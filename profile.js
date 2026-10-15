const profileTrigger = document.querySelector(".profile-trigger");
const profileSidebar = document.querySelector(".profile-sidebar");
const profileBackdrop = document.querySelector(".profile-backdrop");
const profileClose = document.querySelector(".profile-close");

const fontSizeControls = document.querySelector(".text-size-controls");

if (fontSizeControls) {
    const sizeOutput = fontSizeControls.querySelector(".text-size-value");
    let fontSize = 100;

    const updateFontSize = () => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        sizeOutput.value = `${fontSize}%`;
        sizeOutput.textContent = `${fontSize}%`;
    };

    fontSizeControls.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-font-size]");
        if (!button) {
            return;
        }

        if (button.dataset.fontSize === "increase") {
            fontSize = Math.min(fontSize + 10, 150);
        } else if (button.dataset.fontSize === "decrease") {
            fontSize = Math.max(fontSize - 10, 80);
        } else {
            fontSize = 100;
        }

        updateFontSize();
    });
}

if (profileTrigger && profileSidebar && profileBackdrop && profileClose) {
    const closeProfile = () => {
        profileSidebar.classList.remove("is-open");
        profileSidebar.setAttribute("aria-hidden", "true");
        profileSidebar.inert = true;
        profileBackdrop.hidden = true;
        profileTrigger.setAttribute("aria-expanded", "false");
        profileTrigger.focus();
    };

    const openProfile = () => {
        profileSidebar.classList.add("is-open");
        profileSidebar.setAttribute("aria-hidden", "false");
        profileSidebar.inert = false;
        profileBackdrop.hidden = false;
        profileTrigger.setAttribute("aria-expanded", "true");
        requestAnimationFrame(() => profileClose.focus());
    };

    profileTrigger.addEventListener("click", openProfile);
    profileClose.addEventListener("click", closeProfile);
    profileBackdrop.addEventListener("click", closeProfile);

    document.addEventListener("keydown", (event) => {
        if (!profileSidebar.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeProfile();
            return;
        }

        if (event.key === "Tab") {
            const focusable = profileSidebar.querySelectorAll("button, a[href]");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && (document.activeElement === first || !profileSidebar.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !profileSidebar.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    profileSidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeProfile);
    });
}
