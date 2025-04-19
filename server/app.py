#!/usr/bin/env python3

from flask import Flask, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(port=5555, debug=True)