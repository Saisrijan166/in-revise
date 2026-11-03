import type { SyntaxSheet } from "./types";

export const docker: SyntaxSheet = {
  tagline: "The docker commands and Dockerfile instructions you run to build and ship containers.",
  baseline: "Docker Engine 27",
  lang: "bash",
  groups: [
    {
      title: "Images",
      rows: [
        {
          syntax: "docker build -t name:tag .",
          what: "Build an image from a Dockerfile",
          example: "docker build -t myapp:1.0 .",
        },
        { syntax: "docker images", what: "List local images", example: "docker images" },
        {
          syntax: "docker pull name:tag",
          what: "Download an image",
          example: "docker pull postgres:18",
        },
        {
          syntax: "docker push name:tag",
          what: "Upload to a registry",
          example: "docker push myrepo/myapp:1.0",
        },
        {
          syntax: "docker tag src dst",
          what: "Add another name/tag",
          example: "docker tag myapp:1.0 myrepo/myapp:1.0",
        },
        { syntax: "docker rmi name:tag", what: "Remove an image", example: "docker rmi myapp:1.0" },
        {
          syntax: "docker history img",
          what: "Show the layers of an image",
          example: "docker history myapp:1.0",
        },
      ],
    },
    {
      title: "Containers",
      rows: [
        {
          syntax: "docker run -d -p h:c img",
          what: "Run detached, map a port",
          example: "docker run -d -p 8080:8080 --name web myapp:1.0",
        },
        {
          syntax: "-e KEY=val",
          what: "Pass an environment variable",
          example: "docker run -e SPRING_PROFILES_ACTIVE=prod myapp:1.0",
        },
        {
          syntax: "-v host:container",
          what: "Mount a volume / bind mount",
          example: "docker run -v ./data:/var/lib/data myapp:1.0",
        },
        {
          syntax: "docker ps",
          what: "List running containers (-a = all)",
          example: "docker ps -a",
        },
        { syntax: "docker stop id", what: "Stop a container", example: "docker stop web" },
        {
          syntax: "docker start id",
          what: "Start a stopped container",
          example: "docker start web",
        },
        { syntax: "docker rm id", what: "Remove a container", example: "docker rm web" },
        {
          syntax: "docker exec -it id sh",
          what: "Open a shell inside a container",
          example: "docker exec -it web sh",
        },
        {
          syntax: "docker logs -f id",
          what: "Follow container logs",
          example: "docker logs -f web",
        },
        {
          syntax: "docker inspect id",
          what: "Full JSON details of a container",
          example: "docker inspect web",
        },
      ],
    },
    {
      title: "Dockerfile instructions",
      rows: [
        {
          syntax: "FROM image:tag",
          what: "Base image (first line)",
          example: "FROM eclipse-temurin:25-jre",
        },
        { syntax: "WORKDIR /path", what: "Set the working directory", example: "WORKDIR /app" },
        {
          syntax: "COPY src dst",
          what: "Copy files into the image",
          example: "COPY target/app.jar app.jar",
        },
        {
          syntax: "RUN cmd",
          what: "Run a build-time command (new layer)",
          example: "RUN apt-get update",
        },
        { syntax: "ENV KEY=val", what: "Set an environment variable", example: "ENV PORT=8080" },
        { syntax: "EXPOSE port", what: "Document the listening port", example: "EXPOSE 8080" },
        {
          syntax: "ARG name",
          what: "Build-time variable",
          example: "ARG VERSION=1.0",
        },
        {
          syntax: 'CMD ["exec","arg"]',
          what: "Default command (overridable)",
          example: 'CMD ["java","-jar","app.jar"]',
        },
        {
          syntax: 'ENTRYPOINT ["exec"]',
          what: "Fixed command; CMD gives its args",
          example: 'ENTRYPOINT ["java","-jar","app.jar"]',
        },
      ],
      combos: [
        {
          label: "Multi-stage Dockerfile for a Java app",
          code: `# build stage
FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /src
COPY . .
RUN mvn -q clean package -DskipTests

# run stage (small image)
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /src/target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]`,
        },
      ],
    },
    {
      title: "Volumes and networks",
      rows: [
        {
          syntax: "docker volume create name",
          what: "Create a named volume",
          example: "docker volume create pgdata",
        },
        { syntax: "docker volume ls", what: "List volumes", example: "docker volume ls" },
        {
          syntax: "-v name:/path",
          what: "Mount a named volume",
          example: "docker run -v pgdata:/var/lib/postgresql/data postgres:18",
        },
        {
          syntax: "docker network create name",
          what: "Create a user network",
          example: "docker network create appnet",
        },
        {
          syntax: "--network name",
          what: "Attach a container to a network",
          example: "docker run --network appnet --name db postgres:18",
        },
        {
          syntax: "docker network ls",
          what: "List networks",
          example: "docker network ls",
        },
      ],
    },
    {
      title: "Docker Compose",
      rows: [
        {
          syntax: "docker compose up -d",
          what: "Start all services in background",
          example: "docker compose up -d",
        },
        {
          syntax: "docker compose down",
          what: "Stop and remove services",
          example: "docker compose down",
        },
        {
          syntax: "docker compose ps",
          what: "List compose services",
          example: "docker compose ps",
        },
        {
          syntax: "docker compose logs -f",
          what: "Follow logs of all services",
          example: "docker compose logs -f web",
        },
        {
          syntax: "docker compose build",
          what: "Build/rebuild service images",
          example: "docker compose build",
        },
        {
          syntax: "docker compose up -d --build",
          what: "Rebuild then start",
          example: "docker compose up -d --build",
        },
      ],
      combos: [
        {
          label: "compose.yaml: app + database",
          code: `services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_URL=jdbc:postgresql://db:5432/app
    depends_on:
      - db
  db:
    image: postgres:18
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`,
        },
      ],
    },
    {
      title: "Cleanup",
      rows: [
        {
          syntax: "docker system prune",
          what: "Remove stopped containers, unused nets/images",
          example: "docker system prune",
        },
        {
          syntax: "docker system prune -a",
          what: "Also remove all unused images",
          example: "docker system prune -a",
        },
        {
          syntax: "docker image prune",
          what: "Remove dangling images",
          example: "docker image prune",
        },
        {
          syntax: "docker volume prune",
          what: "Remove unused volumes",
          example: "docker volume prune",
        },
        {
          syntax: "docker container prune",
          what: "Remove all stopped containers",
          example: "docker container prune",
        },
        {
          syntax: "docker system df",
          what: "Disk used by Docker",
          example: "docker system df",
        },
      ],
    },
  ],
};
