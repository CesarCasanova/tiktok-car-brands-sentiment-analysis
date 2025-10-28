FROM python:3.11-alpine

RUN apk add build-base bash libffi-dev
RUN pip3 install --upgrade pip

#TIMEZONE
ENV TZ=America/Lima
ENV PYTHONIOENCODING=UTF-8

ADD server /app

RUN python3 --version

RUN pip3 install -r /app/requirements.txt

ARG ENV
ENV ENV=$ENV

WORKDIR /app
EXPOSE 8000
#ENTRYPOINT ["/resources/runservices.sh"]