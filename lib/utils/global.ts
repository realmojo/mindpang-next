// Global utility functions

export function getCookie(name: string): string {
  if (typeof window === "undefined") return "";
  
  let cookieName = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

export function coupangPartnerStart() {
  if (typeof window === "undefined") return;

  setTimeout(() => {
    const isPopup = getCookie("cp-popup");
    if (!isPopup) {
      document.body.classList.add("no-scroll");
      const overlay = document.getElementById("overlay");
      if (overlay) {
        overlay.classList.add("on");
      }

      const timerElement = document.getElementById("timer");
      if (timerElement) {
        let count = 5;
        const countdown = setInterval(() => {
          count--;
          if (count >= 0) {
            timerElement.textContent = count.toString();
          }
          if (count === 0) {
            clearInterval(countdown);
            const closeX = document.getElementById("cp-close-x");
            if (closeX) {
              closeX.classList.remove("hidden");
            }
            if (timerElement) {
              timerElement.classList.add("hidden");
            }
          }
        }, 1000);
      }
    }
  }, 500);
}

export function coupangPartnerEnd() {
  if (typeof window === "undefined") return;

  document.body.classList.remove("no-scroll");
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("on");
  }
}

