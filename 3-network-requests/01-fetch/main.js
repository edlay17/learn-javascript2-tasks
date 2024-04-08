/*
Получите данные о пользователях GitHub
Создайте асинхронную функцию getUsers(names), которая получает на вход массив 
логинов пользователей GitHub, запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей.

Информация о пользователе GitHub с логином USERNAME доступна по ссылке: https://api.github.com/users/USERNAME.

В песочнице есть тестовый пример.

Важные детали:

На каждого пользователя должен приходиться один запрос fetch.
Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, 
то функция должна возвращать null в массиве результатов.
*/

const result = [];

const getUsers = (names) => {
    return new Promise((resolve, reject) => {
        const getUrl = (name) => {
            return `https://api.github.com/users/${name}`;
        }
    
        let finallyCount = 0;
        const length = names.length;
    
        const checkIsFinal = () => {
            finallyCount++;
            if (finallyCount === length) {
                resolve(result);
            }
        }
    
        names.map(async (name, index) => {
            result.push(undefined); 
    
            const url = getUrl(name);
    
            const response = await fetch(url);
    
            if (response.ok) {
                const data = await response.json();
    
                result[index] = data;
                console.log(`user ${name}:`);
                console.log(data);
            }
            else {
                result[index] = null;
                console.log(`user ${name}:`);
                console.log(null);
            }
    
            checkIsFinal();
        })
    })
} 

getUsers([
    '5211no-users213r1235132',
    'edlay17',
    'test',
    'HardhatChad',
    'lm-sys',
    '5235no-users213r1235132'
]).then(result => {
    console.log(result);
});