pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/myhai05/pingpro_front.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') { // Assurez-vous que 'SonarQube' correspond au nom configuré
                    sh 'sonar-scanner \
                        -Dsonar.projectKey=${projectKey} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${ip_adress} \
                        -Dsonar.token=${token_sonar}'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
