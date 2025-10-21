document.addEventListener('DOMContentLoaded', function() {
    const logoBtn = document.querySelector(".headerLogo");
    const acSistemBtn = document.getElementById("ac-sistem");
    const blocksSistemBtn = document.getElementById("blocks-sistem");
    const dustMetersBtn = document.getElementById("dust-meters");
    const passwortsBtn = document.getElementById("passports");

    if (logoBtn) {
        logoBtn.addEventListener("click", () => {
            window.location.href = '/index.html';
        });
    }

    if (acSistemBtn) {
        acSistemBtn.addEventListener("click", () => {
            window.location.href = '/ac-sistem.html';
        });
    }

    if (blocksSistemBtn) {
        blocksSistemBtn.addEventListener("click", () => {
            window.location.href = '/blocks.html';
        });
    }

    if (dustMetersBtn) {
        dustMetersBtn.addEventListener("click", () => {
            window.location.href = '/dust-meters.html';
        });
    }

    if (passwortsBtn) {
        passwortsBtn.addEventListener("click", () => {
            window.location.href = '/pasports.html';
        });
    }
});








