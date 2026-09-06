from flask import Blueprint, jsonify, render_template, request

from app.services.ai import AIServiceError, ask_gemini

main = Blueprint('main', __name__)


@main.route('/')
def landing():
    return render_template("landing.html")


@main.route('/login')
def login():
    return render_template("login.html")


@main.route('/signup')
def signup():
    return render_template("signup.html")


@main.route('/dashboard')
def dashboard():
    return render_template("index.html")


@main.post('/api/ai/chat')
def ai_chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get('message', '')).strip()

    if not message:
        return jsonify({'error': 'Message is required.'}), 400

    if len(message) > 4000:
        return jsonify({'error': 'Message is too long.'}), 400

    try:
        response = ask_gemini(message)
    except AIServiceError as exc:
        return jsonify({'error': str(exc)}), 503

    return jsonify({'response': response})
