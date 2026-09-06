import json
import os
import urllib.error
import urllib.request


class AIServiceError(Exception):
    """Raised when the AI provider cannot fulfill a request."""


def ask_gemini(message: str) -> str:
    """Send a business question to Gemini and return plain-text output."""
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    if not api_key:
        raise AIServiceError("GEMINI_API_KEY is not configured.")

    prompt = (
        "You are Business AI, a concise business operations assistant. "
        "Help with customers, tasks, meetings, follow-ups, planning, and business analysis. "
        "If the user asks for data you cannot access, say so instead of inventing it.\n\n"
        f"User request:\n{message.strip()}"
    )

    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 800,
        },
    }).encode("utf-8")

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={api_key}"
    )

    request = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise AIServiceError(f"AI provider returned HTTP {exc.code}.") from exc
    except (urllib.error.URLError, TimeoutError) as exc:
        raise AIServiceError("Could not reach the AI provider.") from exc

    try:
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except (KeyError, IndexError, TypeError) as exc:
        raise AIServiceError("The AI provider returned an unexpected response.") from exc
