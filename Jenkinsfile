pipeline {
    agent any
    environment {
        DOCKERHUB_CRED = credentials('docker')
        DOCKER_USER = "${DOCKERHUB_CRED_USR}"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    stages {
        stage('Clean Docker System') {
            steps {
                sh 'docker system prune -af'
            }
        }
        stage('Checkout the code') {
            steps {
                git branch: 'main', url: 'https://github.com/bmadhu1532/mern-stack-project.git'
            }
        }
        stage('Prepare Backend .env') {
            steps {
                sh '''
                mkdir -p backend
                cat > backend/.env <<EOL
MONGO_URL=mongodb+srv://Satvik:Satvik%40310706@satvik.melxkhp.mongodb.net/?retryWrites=true&w=majority&appName=satvik
DB_NAME=cricket_db
JWT_SECRET=supersecretkey123
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=300
EOL
                '''
            }
        }
        stage('Docker Build & Push') {
            steps {
                withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    sh """
                    docker build -t $DOCKER_USER/mern-frontend:${IMAGE_TAG} ./frontend
                    docker build -t $DOCKER_USER/mern-backend:${IMAGE_TAG} ./backend

                    docker push $DOCKER_USER/mern-frontend:${IMAGE_TAG}
                    docker push $DOCKER_USER/mern-backend:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                # Stop and remove any existing containers (including orphans)
                docker-compose down --remove-orphans

                # Remove containers with conflicting names
                docker ps -a -q --filter "name=cricket-db" | xargs -r docker rm -f
                docker ps -a -q --filter "name=cricket-backend" | xargs -r docker rm -f
                docker ps -a -q --filter "name=cricket-frontend" | xargs -r docker rm -f

                # Pull latest images and start fresh
                docker-compose pull
                docker-compose up -d
                '''
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
