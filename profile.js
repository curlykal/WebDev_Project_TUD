const profileTrigger = document.querySelector(".profile-trigger");
const profileSidebar = document.querySelector(".profile-sidebar");
const profileBackdrop = document.querySelector(".profile-backdrop");
const profileClose = document.querySelector(".profile-close");

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
