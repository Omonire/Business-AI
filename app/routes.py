from flask import Blueprint, render_template

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