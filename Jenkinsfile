pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REGISTRY = "108964700298.dkr.ecr.ap-south-1.amazonaws.com"
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Backend Image') {
            steps {
                bat '''
                docker build -t corporate-banking-backend banking-system/banking-system
                docker tag corporate-banking-backend:latest %ECR_REGISTRY%/corporate-banking-backend:latest
                docker push %ECR_REGISTRY%/corporate-banking-backend:latest
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat '''
                docker build --no-cache -t corporate-banking-frontend banking-system-frontend
                docker tag corporate-banking-frontend:latest %ECR_REGISTRY%/corporate-banking-frontend:latest
                docker push %ECR_REGISTRY%/corporate-banking-frontend:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                bat '''
                ssh -i capstone-key.pem ec2-user@<EC2-PUBLIC-IP> "
                cd corporate-banking-app &&
                docker-compose pull &&
                docker-compose up -d
                "
                '''
            }
        }
    }
}
