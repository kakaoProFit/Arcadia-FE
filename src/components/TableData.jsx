export default function TableData() {
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    const dummyData = [];
    for (let i = 1; i <= 100; i++) {
        const id = i;
        const title = '제목 ' + i;
        const writer = '작성자 ' + i;
        const date = '2021-09-01'; // 일정한 날짜로 설정 (선택사항)
        const views = getRandomNumber(50, 500); // 랜덤한 조회수 생성
        const likes = getRandomNumber(5, 50); // 랜덤한 좋아요 수 생성

        dummyData.push({
            'id': id, 'title': title, 'writer': writer, 'date': date, 'views': views, 'likes': likes
        });
    }
    return dummyData;
}