const regions = ['서울', '경기', '인천', '대전', '대구', '부산', '울산', '광주', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];
const symptom = ['불면증', '우울증', '공황장애', '강박증', '불안', '조울증']
const image = ['/images/user1.jpg', '/images/user2.jpg', '/images/user3.jpg', '/images/user4.jpg', '/images/user5.jpg', '/images/user6.jpg', '/images/user7.jpg'];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        const newObj = {
            name: `User${i + 1}`,
            region: getRandomItem(regions),
            symptom: getRandomItem(symptom),
            image: getRandomItem(image)
        };
        data.push(newObj);
    }
    return data;
}

export { regions, symptom, image };