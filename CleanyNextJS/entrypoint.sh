#!/bin/bash

npm install --force
npm run build
npm run start

exec "$@"