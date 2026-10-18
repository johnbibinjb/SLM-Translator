
"use strict";

// Get HTML elements
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const statusMessage = document.getElementById("status");
const translateBtn = document.getElementById("translateBtn");

// API endpoints
const TRANSLATE_API = "/translate";

// Display status messages
function showStatus(message, type = "info") {
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.dataset.type = type;
}

// Enable or disable the Translate button
function setLoading(isLoading) {
    if (!translateBtn) return;

    translateBtn.disabled = isLoading;
    translateBtn.textContent = isLoading
        ? "Translating..."
        : "Translate to Tamil";
}

// Translate English text into Tamil
async function translateText() {
    if (!inputText || !outputText || !statusMessage) {
        console.error("Required HTML elements are missing.");
        return;
    }

    const text = inputText.value.trim();

    // Validate input
    if (!text) {
        showStatus("Please enter English text first.", "error");
        inputText.focus();
        return;
    }

    // Clear previous output
    outputText.value = "";
    setLoading(true);
    showStatus("Translating... Please wait.", "loading");

    try {
        // Send request to FastAPI
        const response = await fetch(TRANSLATE_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        // Read the API response
        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            throw new Error(
                data.detail || `Request failed (${response.status})`
            );
        }

        // Display translated text
        outputText.value = data.translated_text ?? "";

        if (outputText.value.trim()) {
            showStatus("Translation completed successfully!", "success");
        } else {
            showStatus(
                "The model returned an empty translation.",
                "error"
            );
        }

    } catch (error) {
        console.error("Translation error:", error);

        if (error instanceof TypeError) {
            showStatus(
                "Cannot connect to FastAPI. Check that the server is running.",
                "error"
            );
        } else {
            showStatus(
                "Translation failed: " + error.message,
                "error"
            );
        }

    } finally {
        setLoading(false);
    }
}

// Copy the Tamil translation
async function copyTranslation() {
    if (!outputText || !statusMessage) return;

    const translated = outputText.value.trim();

    if (!translated) {
        showStatus("Nothing to copy yet.", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText(translated);
        showStatus("Translation copied successfully!", "success");
    } catch (error) {
        console.error("Copy error:", error);

        // Fallback for browsers where Clipboard API is unavailable
        outputText.focus();
        outputText.select();

        const copied = document.execCommand("copy");

        showStatus(
            copied
                ? "Translation copied successfully!"
                : "Copy failed. Please copy the text manually.",
            copied ? "success" : "error"
        );

        window.getSelection()?.removeAllRanges();
    }
}

// Clear both text areas
function clearText() {
    if (inputText) inputText.value = "";
    if (outputText) outputText.value = "";

    showStatus("Text cleared.", "info");
    inputText?.focus();
}

// Swap input and output text
function swapText() {
    if (!inputText || !outputText) return;

    const originalText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = originalText;

    showStatus(
        "Text swapped. Note: the model is configured for English to Tamil.",
        "info"
    );
}

// Check API health
async function checkAPIHealth() {
    try {
        const response = await fetch("/health");

        if (!response.ok) {
            throw new Error("API health check failed.");
        }

        const data = await response.json();
        console.log("FastAPI status:", data);

    } catch (error) {
        console.error("FastAPI health check error:", error);
    }
}

// Support Ctrl+Enter or Cmd+Enter to translate
if (inputText) {
    inputText.addEventListener("keydown", function (event) {
        if (
            event.key === "Enter" &&
            (event.ctrlKey || event.metaKey)
        ) {
            event.preventDefault();
            translateText();
        }
    });
}

// Check that the frontend elements exist
document.addEventListener("DOMContentLoaded", function () {
    if (!inputText || !outputText || !statusMessage) {
        console.warn(
            "Check index.html: expected IDs are inputText, outputText, and status."
        );
    }

    checkAPIHealth();
});
