FROM node

WORKDIR /app/CleanyNextJS

COPY package.json /app/CleanyNextJS
COPY entrypoint.sh /app/CleanyNextJS
COPY . .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh" ]