# Business AI

> **Great AI for your business.**

Business AI is an AI-powered business dashboard designed to bring business operations, connected services, analytics, and an intelligent assistant into one clean workspace.

## Vision

The goal of Business AI is to help businesses understand their operations, automate repetitive work, and make better decisions from a single dashboard.

## Current Features

- Modern business dashboard UI
- Sidebar navigation and dashboard sections
- Business statistics and activity views
- Connected-apps area
- Built-in AI Assistant
- Gemini-powered AI chat endpoint
- Responsive frontend foundation
- Flask backend

## Architecture

```text
Business-AI/
├── app/
│   ├── routes.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── ai.py
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   │       └── app.js
│   └── templates/
│       ├── landing.html
│       ├── login.html
│       ├── signup.html
│       └── index.html
├── run.py
├── requirements.txt
└── README.md
```

## Tech Stack

- **Backend:** Python + Flask
- **Frontend:** HTML, CSS, JavaScript
- **Styling:** Tailwind CSS / custom CSS
- **AI:** Google Gemini
- **Animation:** Anime.js
- **Icons/graphics:** SVG

## AI Assistant

The dashboard AI Assistant communicates with the Flask backend through:

```text
POST /api/ai/chat
```

Request:

```json
{
  "message": "How can I improve my customer retention?"
}
```

Response:

```json
{
  "response": "..."
}
```

The backend validates the message, sends it to Gemini, and returns the generated response to the dashboard.

## Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Never commit your real API key to GitHub.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Omonire/Business-AI.git
cd Business-AI
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Add your Gemini API key to `.env` as shown above.

### 5. Run the application

```bash
python run.py
```

Then open the local address shown by Flask.

## Frontend Development

If Tailwind CSS is configured for the project, build the CSS with:

```bash
npm run build:css
```

## AI Request Flow

```text
User
  ↓
Dashboard AI Assistant
  ↓
POST /api/ai/chat
  ↓
Flask Route
  ↓
AI Service
  ↓
Google Gemini
  ↓
AI Response
  ↓
Dashboard
```

## Roadmap

### Phase 1 — Foundation

- [x] Flask backend
- [x] Dashboard UI
- [x] Landing page
- [x] Authentication page foundations
- [x] AI Assistant UI
- [x] Gemini backend integration
- [x] Frontend AI chat connection

### Phase 2 — Business Intelligence

- [ ] Database-backed business data
- [ ] Real analytics and charts
- [ ] Customer management
- [ ] Revenue tracking
- [ ] Activity history
- [ ] Business reports

### Phase 3 — Integrations

- [ ] Connect external business services
- [ ] Import business data
- [ ] Automated workflows
- [ ] Notifications

### Phase 4 — AI Automation

- [ ] Business-specific AI context
- [ ] AI-powered insights
- [ ] Task automation
- [ ] Smart recommendations
- [ ] Natural-language business queries

## Security

- Keep API keys in environment variables.
- Do not commit `.env` files containing secrets.
- Validate API input on the server.
- Add authentication and authorization before exposing sensitive business data.
- Replace demo dashboard statistics with verified database-backed data before production use.

## Project Status

**Active development.**

The current focus is connecting the dashboard to real backend services and evolving the AI Assistant from a basic chat interface into a useful business intelligence and automation layer.

## Contributing

1. Create a feature branch.
2. Make focused changes.
3. Test locally.
4. Commit with a clear message.
5. Open a pull request for review.

## Author

**Omonire Great**

Building Business AI as a practical AI-powered workspace for modern businesses.

## License

License to be defined as the project moves toward its first public release.
