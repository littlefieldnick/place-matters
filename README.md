# place-matters

## Setup

1. Clone the repo
```
$ git clone https://github.com/littlefieldnick/place-matters.git
$ cd place-matters
```

2. Setup virtual environment
```
$ pip install virtualenv
$ virtualenv env
$ source env/bin/activate
```

3. Install requirements
```
$ pip install -r requirements/common.txt
$ pip install -r requirements/dev.txt
```

4. Set environment variables
```
export FLASK_APP=app
export FLASK_ENV=development
export FLASK_GOOGLEMAPS_KEY= XXXXXXXXXXXXXXXX
```

## Running the App
```
$ source venv/bin/activate
$ flask run
```
