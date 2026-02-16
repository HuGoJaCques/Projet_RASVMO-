# PROJET RASVMO

Application full-stack avec Flask (backend) et Svelte (frontend).

## Structure du projet
```
Projet_RASVMO/
├── backendFlask/    # API Flask
└── RASVMO/          # Interface Svelte + Vite
```

## Installation et démarrage

### Backend Flask
```bash
cd backendFlask
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Svelte
```bash
cd RASVMO
npm install
npm run dev
```

## URLs de développement

- Backend API: http://localhost:5000
- Frontend: http://localhost:5173