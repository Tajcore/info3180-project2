from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SECRET_KEY'] = "$up3rDup3R3K3Y"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://vqvrwtdqkkstpp:c99e521893c023234f6ba7485406c4e435c79c840d551e2fce22e28a72ef05ed@ec2-35-171-31-33.compute-1.amazonaws.com:5432/d4q837gfeca0gi"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning
app.config['UPLOAD_FOLDER'] = './app/static/uploads'
app.config['GET_FILE'] = '/static/uploads'

db = SQLAlchemy(app)
csrf = CSRFProtect(app)


# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'index.html'

app.config.from_object(__name__)
from app import views
