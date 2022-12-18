FROM python:3.9
RUN apt-get update -y
RUN apt-get upgrade -y

WORKDIR /app/CleanyDjango

COPY requirements.txt /app/CleanyDjango

RUN pip install -r requirements.txt --no-cache-dir

COPY entrypoint.sh /app/CleanyDjango
RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh" ]