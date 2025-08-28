# Node.js Monitoring with Prometheus and Grafana
This project demonstrates how to set up a monitoring system for a Node.js application using Prometheus for metrics collection and Grafana for visualization. The application is Dockerized, and a CI/CD pipeline is configured with GitHub Actions to automate building and pushing Docker images to Docker Hub.

## Prerequisites
To collaborate on or run this project, ensure you have the following:

Docker: Installed on your system (download here).  
Node.js and npm: For local development (download here).  
GitHub Account: For repository management and CI/CD.  
Docker Hub Account: For storing and pulling Docker images.  
A code editor like VS Code (optional but recommended).  
Basic knowledge of Node.js, Docker, and Git.

## Project Structure

index.js: Node.js Express application with Prometheus metrics.  
Dockerfile: Defines the Docker image for the Node.js app.
docker-compose.yml: Configures the app, Prometheus, and Grafana services.  
prometheus.yml: Prometheus configuration for scraping metrics.  
.github/workflows/ci-cd.yml: GitHub Actions workflow for CI/CD.  

## Setup Instructions
### 1. Clone the Repository
git clone https://github.com/joy-joel/node-monitoring-app.git   
cd node-monitoring-app

### 2. Install Dependencies
Ensure Node.js is installed, then run:
`npm install`

This installs Express and prom-client for the Node.js application.
### 3. Run Locally (Without Docker)
To test the app locally:
`node index.js`


Access the app at http://localhost:3000.
View metrics at http://localhost:3000/metrics.

### 4. Run with Docker Compose
To run the full stack (Node.js app, Prometheus, Grafana):
`docker-compose up -d`

To access the services:

```Node.js App: http://localhost:3000```
```Prometheus: http://localhost:9090```
```Grafana: http://localhost:3001 (login with admin/admin, change password).```

### 5. Configure Grafana

Log in to Grafana (http://localhost:3001).
Add Prometheus as a data source:
Go to Connections > Data Sources > Add data source.
Select Prometheus.
Set URL to http://prometheus:9090.
Save & Test.


Create a dashboard:
Go to Create > Dashboard > Add new panel.
Use queries like `http_requests_total` for HTTP requests.
Add panels for metrics like process_resident_memory_bytes or rate(process_cpu_seconds_total[5m]).
Save as "Node.js App Metrics".



### 6. CI/CD with GitHub Actions
To contribute and trigger CI/CD:

Fork or clone the repository.
Ensure Docker Hub credentials are set in GitHub Secrets:
Go to repo Settings > Secrets and variables > Actions.
Add DOCKER_USERNAME and DOCKER_PASSWORD.


Push changes to the main branch:git add .
git commit -m "Your commit message"
git push origin main

The workflow in .github/workflows/ci-cd.yml will build and push the Docker image to Docker Hub.

### 7. Testing the Setup

Verify Prometheus is scraping metrics: http://localhost:9090/targets.
Check Grafana dashboards for visualized metrics.
Test the app by sending requests to http://localhost:3000.

## Contributing

Fork the repository.
Create a feature branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push to your branch: git push origin feature/your-feature.
Open a pull request with a detailed description.

## Troubleshooting

Metrics not appearing in Prometheus: Ensure the app's /metrics endpoint is accessible and prometheus.yml targets app:3000.
Grafana data source error: Verify the Prometheus URL (http://prometheus:9090) and network connectivity.
CI/CD failures: Check GitHub Actions logs for Docker Hub authentication or build errors.

