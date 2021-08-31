FROM mongo:4.0

ARG profile

ENV MONGO_INITDB_ROOT_USERNAME admindb
ENV MONGO_INITDB_ROOT_PASSWORD password
ENV MONGO_INITDB_DATABASE admin

ADD ./mongo-init.js /docker-entrypoint-initdb.d/

