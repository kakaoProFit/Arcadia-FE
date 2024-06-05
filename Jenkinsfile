pipeline {
    environment {
        repository = 'gcu-profit-dev.kr-central-2.kcr.dev/arcadia-nextjs/arcadia-fe'
        DOCKERHUB_CREDENTIALS = credentials('kicToken')
        dockerImage = ''
        CONTAINER_NAME = 'arcadia_homepage'
        gitlaburl = 'http://172.16.212.109/kakaoProFit/Arcadia-FE'
        gitlabbranch = 'develop'
        githuburl = 'https://github.com/kakaoProFit/arcadia-manifest'
        githubbranch = 'main'
        SLACK_CHANNEL = '#jenkins-alert'
        SLACK_CREDENTIALS = credentials('slack_alert_token')
        COMMIT_MESSAGE = ''
    }
    agent any
    stages {
        stage('Prepare') {
            steps {
                git branch: "$gitlabbranch", credentialsId: 'gitlabToken', url: "$gitlaburl"
                COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                slackSend (
                    channel: SLACK_CHANNEL, 
                    color: '#FFFF00', 
                    message: "Build Started: ${env.JOB_NAME} - ${env.BUILD_NUMBER}\nCommit Message: ${COMMIT_MESSAGE}"
                )
            }
        }
        stage('Docker build') {
            steps {
                script {
                    try {
                        dockerImage = docker.build repository + ":$BUILD_NUMBER"
                        sh 'docker image tag $repository:$BUILD_NUMBER $repository:latest'
                    } catch (Exception e) {
                        slackSend (
                            channel: SLACK_CHANNEL, 
                            color: 'danger', 
                            message: "Docker Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
                        )
                        throw e
                    }
                }
            }
        }
        stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login gcu-profit-dev.kr-central-2.kcr.dev -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
            }
        }
        stage('Deploy our image') {
            steps {
                script {
                    sh 'docker push $repository:$BUILD_NUMBER'
                    sh 'docker push $repository:latest'
                }
            }
        }
        stage('Clone from GitHub') {
            steps {
                git branch: "${githubbranch}", credentialsId: 'githubToken', url: "${githuburl}"
            }
        }
        stage('Update rollout.yaml') {
            steps {
                script {
                    def rolloutFilePath = "${WORKSPACE}/arcadia-fe/rollout.yaml"
                    def newImageTag = "image: " + "$repository" + ":$BUILD_NUMBER"
                    def fileContent = readFile(rolloutFilePath) // Read the file
                    def modifiedContent = fileContent.replaceAll("image:.*", "${newImageTag}") // Modify the line with the new image tag
                    writeFile file: rolloutFilePath, text: modifiedContent // Write the modified content back to the file

                    withCredentials([usernamePassword(credentialsId: 'githubToken', passwordVariable: 'GITHUB_PSW', usernameVariable: 'GITHUB_USR')]){ // GitHub 저장소에 변경사항 커밋 및 푸시
                        sh """
                            git config user.name 'mango0422'
                            git config user.email 'tom990422@gmail.com'
                            git add ${rolloutFilePath}
                            git commit -m 'Update image version in rollout.yaml'
                            git push https://${GITHUB_USR}:${GITHUB_PSW}@github.com/kakaoProFit/arcadia-manifest.git ${githubbranch}
                        """
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend (
                channel: SLACK_CHANNEL, 
                color: 'good', 
                message: "Build Successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend (
                channel: SLACK_CHANNEL, 
                color: 'danger', 
                message: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}
