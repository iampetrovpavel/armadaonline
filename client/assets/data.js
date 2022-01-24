export default {
    directions : [
        {id:1, name: 'Чирхоп', img: '/imgs/directions/chirhop.jpg', times: [new Date(2022, 0, 3, 16, 30)], teacher: 'Петрова Анастасия'},
        {id:2, name: 'Кавердэнс', img: '/imgs/directions/kaver.jpg', times: [new Date(2022, 0, 5, 15, 15), new Date(2022, 0, 5, 17, 30)], teacher: 'Петрова Анастасия'},
        {id:3, name: 'Балет', img: '/imgs/directions/balet.jpg', times: [new Date(2022, 0, 6, 11, 30)], teacher: 'Петрова Анастасия'},
        {id:4, name: 'Стрип', img: '/imgs/directions/strip.jpg', times: [new Date(2022, 0, 1, 13, 30)], teacher: 'Петрова Анастасия'},
        {id:5, name: 'Здоровая спина', img: '/imgs/directions/spina.png', times: [new Date(2022, 0, 26, 16, 30)], teacher: 'Петрова Анастасия'},
    ],
    lessons: [
        {id:1, directionId: 1, time: new Date(2022, 0, 1, 12, 25), teacherId: 1, studentsId: []},
        {id:1, directionId: 1, time: new Date(2022, 0, 5, 15, 15), teacherId: 1, studentsId: []},
        {id:1, directionId: 1, time: new Date(2022, 0, 7, 22, 15), teacherId: 1, studentsId: []},
        {id:1, directionId: 1, time: new Date(2022, 0, 3, 17, 30), teacherId: 1, studentsId: []},
        {id:1, directionId: 1, time: new Date(2022, 0, 12, 18, 0), teacherId: 1, studentsId: []},
        {id:1, directionId: 1, time: new Date(2022, 0, 19, 14, 20), teacherId: 1, studentsId: []},
    ],
    users: [
        {id: 1, name: 'Петрова Анастасия', groupsId: [1, 2]},
        {id: 2, name: 'Иванова Светлана', groupsId: [3]},
        {id: 3, name: 'Сидорова Мария', groupsId: [3]}
    ],
    groups: [
        {id: 1, name: 'Администратор'},
        {id: 2, name: 'Преподаватель'},
        {id: 3, name: 'Ученик'},
    ],
    ages : {
        all: {name: 'Любой', directions: [1,2,3,4,5,6]},
        from6to8: {name: 'От 6 до 8 лет', directions: [1,6]},
        from12to18: {name: 'От 12 до 18 лет', directions: [2,6]},
        from18: {name: 'Старше 18 лет', directions: [3,4,6]},
    },
    tickets: [
        {id: 1, directionId: 1, price: '1000', description: 'Первое посещение занятия', count: 4, title: 'Абонемент на 4 занятия', order: 3},
        {id: 2, directionId: 1, price: '2500', description: 'Первое посещение занятия', count: 4, title: 'Абонемент на 8 занятий', order: 4},
        {id: 3, directionId: 1, price: '300', description: 'Первое посещение занятия', count: 4, title: 'Пробное занятие', order: 1},
        {id: 4, directionId: 1, price: '700', description: 'Первое посещение занятия', count: 4, title: 'Разовое занятие', order: 2},
        {id: 5, directionId: 1, price: '1200', description: 'Первое посещение занятия', count: 4, title: 'Индивидуальное занятие', order: 5},
        {id: 6, directionId: 2, price: '1000', description: 'Первое посещение занятия', count: 4, title: 'Абонемент на 4 занятия', order: 3},
        {id: 7, directionId: 2, price: '2500', description: 'Первое посещение занятия', count: 4, title: 'Абонемент на 8 занятий', order: 4},
        {id: 8, directionId: 2, price: '300', description: 'Первое посещение занятия', count: 4, title: 'Пробное занятие', order: 1},
        {id: 9, directionId: 2, price: '700', description: 'Первое посещение занятия', count: 4, title: 'Разовое занятие', order: 2},
        {id: 10, directionId: 2, price: '1200', description: 'Первое посещение занятия', count: 4, title: 'Индивидуальное занятие', order: 5},
    ]
}