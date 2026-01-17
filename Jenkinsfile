pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID  = "108964700298"
        AWS_REGION      = "ap-south-1"
        ECR_REGISTRY    = "108964700298.dkr.ecr.ap-south-1.amazonaws.com"
        EC2_INSTANCE_ID = "i-001ed123efe067ffd"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat """
                docker build -t corporate-banking-backend banking-system\\banking-system
                docker tag corporate-banking-backend:latest %ECR_REGISTRY%/corporate-banking-backend:latest
                docker push %ECR_REGISTRY%/corporate-banking-backend:latest
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat """
                docker build --no-cache -t corporate-banking-frontend:%BUILD_NUMBER% banking-system-frontend
                docker tag corporate-banking-frontend:%BUILD_NUMBER% %ECR_REGISTRY%/corporate-banking-frontend:%BUILD_NUMBER%
                docker tag corporate-banking-frontend:%BUILD_NUMBER% %ECR_REGISTRY%/corporate-banking-frontend:latest
                docker push %ECR_REGISTRY%/corporate-banking-frontend:%BUILD_NUMBER%
                docker push %ECR_REGISTRY%/corporate-banking-frontend:latest
                """
            }
        }


        stage('Deploy on EC2 via SSM') {
            steps {
                bat """
                "C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" ssm send-command ^
                  --instance-ids %EC2_ID% ^
                  --document-name AWS-RunShellScript ^
                  --parameters commands="cd corporate-banking-app,docker-compose pull,docker-compose up -d --force-recreate frontend" ^
                  --region %AWS_REGION%
                """
            }
        }
    }
}
