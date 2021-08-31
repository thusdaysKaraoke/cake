FROM maven:3.6.3-jdk-11
ARG profile

WORKDIR /opt/workspace/backend

COPY ./pom.xml /opt/workspace/backend/pom.xml
COPY ./src/main/resources/application.yml application.yml

RUN mvn dependency:go-offline

COPY ./src /opt/workspace/backend/src
RUN mvn clean package -DskipTests -Pdocker

FROM openjdk:11
WORKDIR /opt/backend

COPY --from=0 /opt/workspace/backend/target/cake.jar cake.jar
COPY --from=0 /opt/workspace/backend/application.yml application.yml

ENTRYPOINT ["java", "-jar","/opt/backend/cake.jar", "--spring.config.location=file:/opt/backend/application.yml", "-Dloader.path=/opt/backend/"]
