
//Створив клас Book
//Зберігає назву, авто, кількість сторінок
class Book {
    //викликається коли ми пишемо new Book()
    constructor(name, author, pages) {
        this.author = author;
        this.name = name;
        this.pages = pages;
    }
}
//На основі класу створив об'єкт(екземпляр) parata
const parata = new Book("С++", "Стивен Парата", 1423);
console.log(parata);