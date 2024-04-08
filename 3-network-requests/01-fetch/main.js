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

const getUsers = async (names) => {
    const getUrl = (name) => {
        return `https://api.github.com/users/${name}`;
    }

    const queries = names.map((name) => {
        const url = getUrl(name);

        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .catch(console.log);
    })

    return await Promise.all(queries);
} 

console.log(getUsers([
    '5211no-users213r1235132',
    'edlay17',
    'test',
    'HardhatChad',
    'lm-sys',
    '5235no-users213r1235132'
]));