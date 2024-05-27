pipeline {
    environment {
        repository = 'mango0422/arcadia-page'
        DOCKERHUB_CREDENTIALS = credentials('dockerToken')
        dockerImage = ''
        CONTAINER_NAME = 'arcadia_homepage'
        gitlaburl = 'http://172.16.212.109/kakaoProFit/Arcadia-FE'
        gitlabbranch = 'develop'
        githuburl = 'https://github.com/kakaoProFit/arcadia-manifest'
        githubbranch = 'main'
        GITHUB_CREDENTIALS_ID = 'githubToken'
    }
    agent any
    stages {
        stage('Prepare') {
            steps {
                git branch: "$gitlabbranch", credentialsId: 'gitlabToken', url: "$gitlaburl"
            }
        }
        stage('Docker build') {
            steps {
                script {
                    dockerImage = docker.build repository + ":$BUILD_NUMBER"
                }
                sh 'docker image tag $repository:$BUILD_NUMBER $repository:latest'
            }
        }
        stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
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
        stage('Deploy') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME'
                sh 'docker run -d -p 3000:3000 --name $CONTAINER_NAME $repository:$BUILD_NUMBER'
            }
        }
        stage('Clone from GitHub') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: "$githubbranch"]],
                            doGenerateSubmoduleConfigurations: false,
                            extensions: [],
                            userRemoteConfigs: [[credentialsId: "$GITHUB_CREDENTIALS_ID", url: "$githuburl"]]])
                }
            }
        }
        stage('Update rollout.yaml') {
            steps {
                script {
                    def rolloutFilePath = "${WORKSPACE}/arcadia-fe/rollout.yaml"
                    def newImageTag = "tag:$BUILD_NUMBER"

                    // Read the file
                    def fileContent = readFile(rolloutFilePath)

                    // Modify the line with the new image tag
                    def modifiedContent = fileContent.replaceAll("tag:.*", "\$1${newImageTag}")

                    // Write the modified content back to the file
                    writeFile file: rolloutFilePath, text: modifiedContent

                    // GitHub 저장소에 변경사항 커밋 및 푸시
                    sh """
                        git config user.name 'mango0422'
                        git config user.email 'tom990422@gmail.com'
                        git add ${rolloutFilePath}
                        git commit -m 'Update image version in rollout.yaml'
                        git push https://$GITHUB_CREDENTIALS_USR:$GITHUB_CREDENTIALS_PSW@github.com/kakaoProFit/arcadia-manifest.git HEAD:${githubbranch}
                    """
                }
            }
        }
    }
}