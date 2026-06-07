// ========================================
// ООП У JAVASCRIPT - ПРАКТИЧНІ ПРИКЛАДИ
// Копіюйте та використовуйте безпосередньо
// ========================================

// ================== 1. ІНКАПСУЛЯЦІЯ ==================

// Приватні поля з #
class BankAccount {
  #balance = 0;
  #pin = null;
  
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  
  // Публічний метод з валідацією
  deposit(amount) {
    if (amount <= 0) throw new Error('Сума повинна бути більше нуля');
    this._updateBalance(this.#balance + amount);
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Недостатньо коштів');
    this._updateBalance(this.#balance - amount);
    return this.#balance;
  }
  
  // Приватний метод
  _updateBalance(newBalance) {
    console.log(`Баланс змінений на: ${newBalance}`);
    this.#balance = newBalance;
  }
  
  // Геттер
  get balance() {
    return this.#balance;
  }
}

// Использование
const account = new BankAccount('John', 1000);
account.deposit(500);  // Баланс змінений на: 1500
console.log(account.balance); // 1500
// account.#balance; // Error - приватне


// ================== 2. УСПАДКУВАННЯ ==================

// Батьківський клас
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  eat() {
    return `${this.name} їсть`;
  }
  
  sleep() {
    return `${this.name} спить ${8 + Math.random() * 4} годин`;
  }
  
  getAge() {
    return `${this.name} має вік ${this.age} років`;
  }
}

// Підклас
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }
  
  // Перевизначення методу
  eat() {
    return `${this.name} їсть кісточку`;
  }
  
  // Новий метод
  bark() {
    return `${this.name} гавкає: Гав-гав!`;
  }
  
  // Виклик методу батька
  getFullInfo() {
    return `${super.getAge()}, порода: ${this.breed}`;
  }
}

class Cat extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }
  
  eat() {
    return `${this.name} їсть рибку`;
  }
  
  meow() {
    return `${this.name} мяукає: Мяу!`;
  }
}

// Використання
const dog = new Dog('Rex', 5, 'Лабрадор');
const cat = new Cat('Мурка', 3, 'рудий');

console.log(dog.bark());       // Rex гавкає: Гав-гав!
console.log(dog.eat());        // Rex їсть кісточку
console.log(dog.sleep());      // Rex спить X годин
console.log(dog.getFullInfo()); // Rex має вік 5 років, порода: Лабрадор

console.log(cat.meow());       // Мурка мяукає: Мяу!
console.log(cat.eat());        // Мурка їсть рибку


// ================== 3. ПОЛІМОРФІЗМ ==================

// Різні класи з одним методом
class Shape {
  constructor(name) {
    this.name = name;
  }
  
  // Метод, який переозначається в дочірніх класах
  getArea() {
    throw new Error(`${this.constructor.name} повинен реалізувати getArea()`);
  }
  
  describe() {
    return `${this.name}: площа = ${this.getArea().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Коло');
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Прямокутник');
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super('Трикутник');
    this.base = base;
    this.height = height;
  }
  
  getArea() {
    return (this.base * this.height) / 2;
  }
}

// Один код - різні результати (поліморфізм)
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Triangle(3, 8)
];

shapes.forEach(shape => {
  console.log(shape.describe());
});
// Коло: площа = 78.54
// Прямокутник: площа = 24.00
// Трикутник: площа = 12.00


// ================== 4. СТАТИЧНІ МЕТОДИ ==================

class MathUtils {
  // Статичні методи - викликаються на класі
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static factorial(n) {
    if (n < 0) throw new Error('Факторіал від\'ємного числа');
    if (n === 0 || n === 1) return 1;
    return n * MathUtils.factorial(n - 1);
  }
  
  static isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}

// Використання
console.log(MathUtils.add(5, 3));        // 8
console.log(MathUtils.multiply(4, 7));   // 28
console.log(MathUtils.factorial(5));     // 120
console.log(MathUtils.isPrime(17));      // true


// ================== 5. ГЕТТЕРИ ТА СЕТТЕРИ ==================

class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  // Геттер - читання без дужок
  get celsius() {
    return this._celsius;
  }
  
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  get kelvin() {
    return this._celsius + 273.15;
  }
  
  // Сеттер - встановлення з валідацією
  set celsius(value) {
    if (typeof value !== 'number') {
      throw new TypeError('Температура повинна бути числом');
    }
    if (value < -273.15) {
      throw new RangeError('Температура нижче абсолютного нуля');
    }
    this._celsius = value;
  }
  
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

// Використання
const temp = new Temperature(0);
console.log(temp.celsius);    // 0
console.log(temp.fahrenheit); // 32
console.log(temp.kelvin);     // 273.15

temp.fahrenheit = 98.6;
console.log(temp.celsius);    // 37


// ================== 6. PROTOTYPE ==================

// Функція-конструктор (старий стиль)
function Vehicle(brand) {
  this.brand = brand;
}

// Методи в прототипу (ефективніше)
Vehicle.prototype.honk = function() {
  console.log(`${this.brand} гудить!`);
};

Vehicle.prototype.getInfo = function() {
  return `Марка: ${this.brand}`;
};

// Успадкування через прототип
function Car(brand, model) {
  Vehicle.call(this, brand);
  this.model = model;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.describe = function() {
  return `${this.getInfo()}, модель: ${this.model}`;
};

// Використання
const myCar = new Car('Toyota', 'Camry');
console.log(myCar.describe()); // Марка: Toyota, модель: Camry
myCar.honk();                  // Toyota гудить!


// ================== 7. ВИНЯТКИ ==================

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    Error.captureStackTrace(this, this.constructor);
  }
}

class User {
  constructor(email, password) {
    this.validateEmail(email);
    this.validatePassword(password);
    this.email = email;
    this.password = password;
  }
  
  validateEmail(email) {
    if (!email.includes('@')) {
      throw new ValidationError('Невалідна електронна пошта', 'email');
    }
  }
  
  validatePassword(password) {
    if (password.length < 8) {
      throw new ValidationError('Пароль повинен бути мінімум 8 символів', 'password');
    }
  }
}

// Обробка винятків
try {
  const user = new User('invalid-email', 'short');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Помилка в полі "${error.field}": ${error.message}`);
  } else {
    console.error('Невідома помилка:', error.message);
  }
}


// ================== 8. КОМПЛЕКСНИЙ ПРИКЛАД ==================

class Student {
  #grades = [];
  
  constructor(name, studentId) {
    this.name = name;
    this.studentId = studentId;
    this.enrolledCourses = [];
  }
  
  enrollCourse(course) {
    this.enrolledCourses.push(course);
    console.log(`${this.name} записався на ${course.name}`);
  }
  
  addGrade(subject, grade) {
    if (grade < 0 || grade > 100) {
      throw new RangeError('Оцінка повинна бути від 0 до 100');
    }
    this.#grades.push({ subject, grade, date: new Date() });
  }
  
  get averageGrade() {
    if (this.#grades.length === 0) return 0;
    const sum = this.#grades.reduce((acc, g) => acc + g.grade, 0);
    return sum / this.#grades.length;
  }
  
  getTranscript() {
    return {
      name: this.name,
      studentId: this.studentId,
      averageGrade: this.averageGrade.toFixed(2),
      totalGrades: this.#grades.length,
      courses: this.enrolledCourses.map(c => c.name)
    };
  }
}

class Course {
  #maxStudents = 30;
  #students = [];
  
  constructor(name, instructor) {
    this.name = name;
    this.instructor = instructor;
  }
  
  enrollStudent(student) {
    if (this.#students.length >= this.#maxStudents) {
      throw new Error('Курс переповнений');
    }
    this.#students.push(student);
  }
  
  get enrolledCount() {
    return this.#students.length;
  }
  
  get availableSeats() {
    return this.#maxStudents - this.#students.length;
  }
}

// Використання
const math101 = new Course('Математика 101', 'Др. Сміт');
const student1 = new Student('Алісія', 'S001');
const student2 = new Student('Боб', 'S002');

student1.enrollCourse(math101);
student2.enrollCourse(math101);

student1.addGrade('Математика', 92);
student1.addGrade('Математика', 88);
student1.addGrade('Математика', 95);

console.log(student1.getTranscript());
// {
//   name: 'Алісія',
//   studentId: 'S001',
//   averageGrade: '91.67',
//   totalGrades: 3,
//   courses: ['Математика 101']
// }


// ================== 9. MIXINS (МНОЖИННЕ УСПАДКУВАННЯ) ==================

// Mixin - об'єкт з методами
const canFly = {
  fly() {
    return `${this.name} летить в небі`;
  }
};

const canSwim = {
  swim() {
    return `${this.name} плаває в воді`;
  }
};

const canRun = {
  run() {
    return `${this.name} біжить по землі`;
  }
};

class Bird {
  constructor(name) {
    this.name = name;
  }
}

// Додавання методів з mixins
Object.assign(Bird.prototype, canFly, canRun);

class Duck extends Bird {
}

// Додавання умовно мінімум одного методу до Duck
Object.assign(Duck.prototype, canSwim);

// Використання
const duck = new Duck('Качка');
console.log(duck.fly());   // Качка летить в небі
console.log(duck.swim());  // Качка плаває в воді
console.log(duck.run());   // Качка біжить по землі


// ================== 10. ПАТТЕРНИ ДИЗАЙНУ ==================

// Паттерн Singleton
class Database {
  static #instance = null;
  
  constructor(connectionString) {
    if (Database.#instance) {
      return Database.#instance;
    }
    this.connectionString = connectionString;
    Database.#instance = this;
  }
  
  connect() {
    console.log(`Підключення до ${this.connectionString}`);
  }
  
  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database('localhost');
    }
    return Database.#instance;
  }
}

// Використання Singleton
const db1 = new Database('server1');
const db2 = new Database('server2');
console.log(db1 === db2); // true - один і той же об'єкт


// Паттерн Observer
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

// Використання Observer
const news = new Observable();

const subscriber1 = (data) => console.log(`Підписник 1: ${data}`);
const subscriber2 = (data) => console.log(`Підписник 2: ${data}`);

news.subscribe(subscriber1);
news.subscribe(subscriber2);

news.notify('Нова новина!');
// Підписник 1: Нова новина!
// Підписник 2: Нова новина!


// Паттерн Factory
class AnimalFactory {
  static createAnimal(type, name) {
    switch (type) {
      case 'dog':
        return new Dog(name, 0, 'Невідома');
      case 'cat':
        return new Cat(name, 0, 'Невідома');
      case 'bird':
        return { name, type: 'bird', sing: () => `${name} поює` };
      default:
        throw new Error(`Невідомий тип тварини: ${type}`);
    }
  }
}

// Використання Factory
const animal1 = AnimalFactory.createAnimal('dog', 'Rex');
const animal2 = AnimalFactory.createAnimal('cat', 'Мурка');

console.log(animal1.bark()); // Rex гавкає: Гав-гав!
console.log(animal2.meow()); // Мурка мяукає: Мяу!
