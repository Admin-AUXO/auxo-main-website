/**
 * Newsletter Form Handler
 * Handles newsletter subscription form submission with validation and error handling
 */

/**
 * Initialize newsletter form
 * @param apiUrl - Full API URL for newsletter endpoint (should use createApiUrl)
 */
export function initNewsletterForm(apiUrl: string): void {
  const newsletterForm = document.getElementById("newsletter-form") as HTMLFormElement | null;
  if (!newsletterForm) return;

  const newsletterEmail = document.getElementById("newsletter-email") as HTMLInputElement | null;
  const newsletterMessage = document.getElementById("newsletter-message") as HTMLElement | null;
  const consentCheckbox = document.getElementById("newsletter-consent") as HTMLInputElement | null;
  const submitBtn = newsletterForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;

  if (!newsletterEmail || !newsletterMessage || !consentCheckbox) return;

  const showMessage = (text: string, isError = false): void => {
    newsletterMessage.textContent = text;
    newsletterMessage.className = `text-xs mt-2 ${isError ? "text-red-400" : "text-accent-green"}`;
    newsletterMessage.classList.remove("hidden");
    if (!isError) {
      setTimeout(() => {
        newsletterMessage?.classList.add("hidden");
      }, 8000);
    }
  };

  const handleNewsletterSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!consentCheckbox.checked) {
      showMessage("Please consent to receive our newsletter", true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage(
        "Please enter a valid email address (e.g., name@company.com)",
        true,
      );
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Subscribing...";
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: consentCheckbox.checked,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showMessage(
          data.error ||
            "We couldn't complete your subscription. Please try again.",
          true,
        );
        return;
      }

      showMessage(
        data.message ||
          "Thank you! Please check your email to confirm your subscription.",
        false,
      );
      newsletterEmail.value = "";
      consentCheckbox.checked = false;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Newsletter subscription error:", error);
      }
      showMessage(
        "Oops! Something went wrong. Please try again in a moment.",
        true,
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Subscribe";
      }
    }
  };

  newsletterForm.addEventListener("submit", handleNewsletterSubmit);

  document.addEventListener("astro:before-swap", () => {
    newsletterForm.removeEventListener("submit", handleNewsletterSubmit);
  });
}

