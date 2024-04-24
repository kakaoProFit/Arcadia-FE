pipeline {
    environment{
        repository = 'mango0422/arcadia-page'
        DOCKERHUB_CREDENTIALS = credentials('dockerToken')
        dockerImage = ''
        CONTAINER_NAME = 'arcadia_homepage'
        giturl = 'https://github.com/kakaoProFit/Arcadia-FE'
        gitbranch = 'release'
        previous_build_number=$((build_number - 1))
    }
    agent any 	// 사용 가능한 에이전트에서 이 파이프라인 또는 해당 단계를 실행
    stages {
        stage('Prepare'){
            steps{
                git branch: "$gitbranch", credentialsId: 'githubToken', url: "$giturl"
            }

        }
        stage('Docker build'){
            steps {
                script {
                    dockerImage = docker.build repository + ":$BUILD_NUMBER"
                }
                sh 'docker image tag $repository:$BUILD_NUMBER $repository:latest'
            }
        }
        stage('Login'){
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
            }
        }
        stage('Deploy our image') { 
            steps { 
                script {
                    sh 'docker push $repository:$BUILD_NUMBER' //docker push
                    sh 'docker rmi $repository:$previous_build_number'
                } 
            }
        } 
        stage('Deploy') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME'
                sh 'docker run -d -p 3000:3000 --name $CONTAINER_NAME $repository'
            }
        }
    }
}