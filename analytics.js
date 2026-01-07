// Function to set a cookie accessible across subdomains
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.wispbyte.com";
}

// Function to get a cookie value
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to load Plausible Analytics (always loads, no consent required)
function loadPlausible() {
    const plausibleScript = document.createElement("script");
    plausibleScript.defer = true;
    plausibleScript.setAttribute("data-domain", "wispbyte.com");
    plausibleScript.src = "https://analytics.wispbyte.com/js/script.js";
    document.head.appendChild(plausibleScript);
}

// Function to load AdSense
function loadAdSense() {
    if (getCookie("advertisingEnabled") === "true") {
        const adScript = document.createElement("script");
        adScript.async = true;
        adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID";
        adScript.crossOrigin = "anonymous";
        document.head.appendChild(adScript);
    }
}

// Function to show cookie preferences modal
function showCookiePreferences() {
    const modal = document.createElement("div");
    modal.className = "cookie-preferences-modal";
    modal.innerHTML = `
        <div class="cookie-preferences-content">
            <div class="cookie-preferences-header">
                <h3>Cookie Preferences</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="cookie-preferences-body">
                <div class="cookie-consent-options">
                    <div class="cookie-consent-option">
                        <label class="cookie-consent-label">
                            <input type="checkbox" checked disabled> Necessary Cookies
                        </label>
                        <span class="cookie-consent-desc">Required for the website to function properly</span>
                    </div>
                    <div class="cookie-consent-option">
                        <label class="cookie-consent-label">
                            <input type="checkbox" id="analyticsCookiesPref" ${getCookie("analyticsEnabled") === "true" ? "checked" : ""}> Analytics Cookies
                        </label>
                        <span class="cookie-consent-desc">Help us understand how visitors use our website</span>
                    </div>
                    <div class="cookie-consent-option">
                        <label class="cookie-consent-label">
                            <input type="checkbox" id="advertisingCookiesPref" ${getCookie("advertisingEnabled") === "true" ? "checked" : ""}> Advertising Cookies
                        </label>
                        <span class="cookie-consent-desc">Used to show you relevant advertisements</span>
                    </div>
                </div>
            </div>
            <div class="cookie-preferences-footer">
                <button class="cookie-consent-btn save-preferences">Save Preferences</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.remove();
    });

    // Save preferences
    modal.querySelector(".save-preferences").addEventListener("click", () => {
        const analyticsEnabled = document.getElementById("analyticsCookiesPref").checked;
        const advertisingEnabled = document.getElementById("advertisingCookiesPref").checked;
        
        setCookie("analyticsEnabled", analyticsEnabled.toString(), 365);
        setCookie("advertisingEnabled", advertisingEnabled.toString(), 365);
        
        if (analyticsEnabled) {
            loadPlausible();
        }
        if (advertisingEnabled) {
            loadAdSense();
        }
        
        modal.remove();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Load Plausible Analytics immediately (no consent needed)
    loadPlausible();

    // Check if cookie preferences are already set
    const cookiesAccepted = getCookie("cookiesAccepted");

    // Show cookie consent banner only if preferences aren't set
    if (!cookiesAccepted) {
        const cookieBanner = document.createElement("div");
        cookieBanner.id = "cookie-consent-banner";
        cookieBanner.className = "cookie-consent";
        cookieBanner.innerHTML = `
            <div class="cookie-consent-header">
                <i class="fas fa-cookie-bite"></i>
                <h3>Cookie Preferences</h3>
            </div>
            <p class="cookie-consent-desc">We use cookies to enhance your experience and show you relevant advertisements. By clicking "Accept All", you consent to our use of cookies.</p>
            <div class="cookie-consent-buttons">
                <button class="cookie-consent-btn customize" onclick="window.location.href='/privacy#cookies'">Learn More</button>
                <button class="cookie-consent-btn accept-all">Accept All</button>
            </div>
        `;

        document.body.appendChild(cookieBanner);

        // Accept all cookies
        cookieBanner.querySelector(".accept-all").addEventListener("click", function() {
            setCookie("cookiesAccepted", "true", 365);
            setCookie("analyticsEnabled", "true", 365);
            setCookie("advertisingEnabled", "true", 365);
            
            cookieBanner.style.display = "none";
            
            loadPlausible();
            loadAdSense();
        });
    } else {
        // If cookies are already accepted, initialize services based on stored preferences
        if (getCookie("analyticsEnabled") === "true") {
            loadPlausible();
        }
        if (getCookie("advertisingEnabled") === "true") {
            loadAdSense();
        }
    }

    // Add cookie preferences link to footer
    const footer = document.querySelector('footer');
    if (footer) {
        const preferencesLink = document.createElement('a');
        preferencesLink.href = '#';
        preferencesLink.textContent = 'Cookie Preferences';
        preferencesLink.onclick = function(e) {
            e.preventDefault();
            showCookiePreferences();
        };
        footer.appendChild(preferencesLink);
    }
});