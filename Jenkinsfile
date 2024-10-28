pipeline {
    // Define the agent to run the pipeline
    agent any

    // Define the environment variables
    environment {
        // Define the Docker image name
        DOCKER_IMAGE = "joseguerracajas/reactjenkins"
        // Define the Azure credentials
        AZURE_WEPAPP_PLAN = "ASP-Jenkinstest-9070"
        AZURE_WEBAPP_NAME = "Reactjenkinstest"
        AZURE_RESOURCE_GROUP = "Jenkinstest"
    }

    // Define the stages of the pipeline
    stages {

        // Test stage
        stage('Test') {
            steps {
                script {
                    //Install npm dependencies
                    sh 'npm install'
                    //Run the tests using Vitest
                    sh 'npx vitest run'
                }
            }
        }

        // Build stage
        stage('Build') {
            steps {
                script {
                    //Build the Docker image using the DOCKER_IMAGE environment variable
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        // Push to Docker Hub stage
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Push Docker image to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }

        // Deploy to Azure stage
        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: 'azure-credentials-id')]) {
                    script {
                        // Login to Azure using service principal credentials and create the WebApp
                        sh """
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        az webapp create --resource-group ${AZURE_RESOURCE_GROUP} --plan ${AZURE_WEPAPP_PLAN} --name ${AZURE_WEBAPP_NAME} --deployment-container-image-name ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }
    }
}