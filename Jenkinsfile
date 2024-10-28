pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "joseguerracajas/reactjenkins"
        AZURE_WEBAPP_NAME = "Reactjenkinstest"
        AZURE_RESOURCE_GROUP = "Jenkinstest"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image(DOCKER_IMAGE).push('latest')
                    }
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: 'azure-credentials-id')]) {
                    script {
                        sh """
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        az webapp create --resource-group ${AZURE_RESOURCE_GROUP} --plan ${AZURE_WEBAPP_NAME}-plan --name ${AZURE_WEBAPP_NAME} --deployment-container-image-name ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }
    }
}