pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('reactfrontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                set TOMCAT="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reacttaskapi"

                if exist %TOMCAT% (
                    rmdir /S /Q %TOMCAT%
                )
                mkdir %TOMCAT%
                xcopy /E /I /Y reactfrontend\\build\\* %TOMCAT%\\
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('springbootbackend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                set TOMCAT_WAR="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboottaskapi.war"
                set TOMCAT_DIR="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springboottaskapi"

                if exist %TOMCAT_WAR% (
                    del /Q %TOMCAT_WAR%
                )
                if exist %TOMCAT_DIR% (
                    rmdir /S /Q %TOMCAT_DIR%
                )

                copy springbootbackend\\target\\*.war %TOMCAT_WAR%
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Full-Stack Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed.'
        }
    }
}
