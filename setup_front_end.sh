#! /usr/bin/env bash

STATIC_FILES=('*.js' '*.js.map' '*.ico')
TEMPLATE_FILES=('index.html')
FRONT_END_DIST='./dist/front-end'
STATIC_DIR='../../../server/static'
TEMPLATE_DIR='../../../server/templates'

cd front-end/

if [[ $FLASK_ENV == 'production' ]]; then
  echo "Building for production..."
  ng build --prod --build-optimizer --baseHref="/"
else
  echo "Building for dev..."
  ng build --baseHref="/"
fi

cd $FRONT_END_DIST

echo "Copying Angular static files to Flask server"
for static in "${STATIC_FILES[@]}"; do
  cp $static $STATIC_DIR
done

echo "Copying Angular template files to Flask server"
for template in "${TEMPLATE_FILES[@]}"; do
  cp $template $TEMPLATE_DIR
done

