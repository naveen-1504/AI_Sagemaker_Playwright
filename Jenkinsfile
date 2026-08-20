pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }
        
        stage('API Tests') {
            parallel {
                stage('Cucumber API') {
                    steps {
                        sh 'npm run cucumber:api'
                    }
                }
                stage('Playwright API') {
                    steps {
                        sh 'npx playwright test api-user'
                    }
                }
            }
        }
        
        stage('UI Tests') {
            parallel {
                stage('Cucumber UI') {
                    steps {
                        sh 'npm run cucumber:ui'
                    }
                }
                stage('Playwright UI') {
                    steps {
                        sh 'npx playwright test complete-checkout'
                    }
                }
            }
        }
        
        stage('Page Object Tests') {
            steps {
                sh 'npx playwright test RegisterPage HomePage CartPage CheckoutPage'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Report'
            ])
            
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            archiveArtifacts artifacts: '**/cucumber-report.html, **/playwright-report/**, **/test-results/**', allowEmptyArchive: true
        }
        
        failure {
            emailext(
                subject: "Test Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Test execution failed. Check console output at ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
    }
}
