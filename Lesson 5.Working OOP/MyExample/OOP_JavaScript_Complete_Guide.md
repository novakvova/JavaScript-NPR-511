# ООП у JavaScript — Повний Посібник

## Зміст
1. Основи ООП
2. Класи та об'єкти
3. Властивості та методи
4. Геттери та сеттери
5. Prototype
6. Успадкування
7. Поліморфізм
8. Винятки
9. Практичні приклади

---

## 1. Основи ООП

### Що таке ООП?

Об'єктно-орієнтоване програмування (ООП) — це парадигма, яка структурує код навколо **об'єктів**, що поєднують дані (властивості) та поведінку (методи).

### Три фундаментальні принципи

#### 1. Інкапсуляція (Encapsulation)

Приховування внутрішніх деталей та надання публічного інтерфейсу.

```javascript
class BankAccount {
  #balance = 0; // приватне поле (з #)
  
  constructor(owner) {
    this.owner = owner; // публічна властивість
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount('John');
account.deposit(100);
console.log(account.getBalance()); // 100
console.log(account.#balance); // SyntaxError: приватне поле недоступне
```

**Переваги інкапсуляції:**
- Контроль над доступом до даних
- Можливість додавати валідацію
- Захист від випадкових змін

---

#### 2. Успадкування (Inheritance)

Дозволяє класу перебирати властивості та методи іншого класу.

```javascript
// Батьківський клас
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  eat() {
    console.log(`${this.name} їсть`);
  }
  
  sleep() {
    console.log(`${this.name} спить`);
  }
}

// Підклас
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // виклик конструктора батька
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} гавкає!`);
  }
  
  eat() { // перевизначення методу
    console.log(`${this.name} їсть кісточку`);
  }
}

const dog = new Dog('Rex', 3, 'Лабрадор');
dog.eat();   // Rex їсть кісточку (перевизначений метод)
dog.sleep(); // Rex спить (успадкований метод)
dog.bark();  // Rex гавкає! (власний метод)
```

**Переваги успадкування:**
- Код переиспользуется
- Логічна структура класів
- Ієрархія та організація

---

#### 3. Поліморфізм (Polymorphism)

Здатність об'єктів різних типів реагувати на один виклик по-різному.

```javascript
class Shape {
  getArea() {
    throw new Error('Метод повинен бути реалізований в підклассі');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  
  getArea() {
    return (this.base * this.height) / 2;
  }
}

// Поліморфізм в дії
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Triangle(3, 8)
];

shapes.forEach(shape => {
  console.log(shape.getArea());
});
// Вивід:
// 78.53981633974483 (площа кола)
// 24 (площа прямокутника)
// 12 (площа трикутника)
```

**Переваги поліморфізму:**
- Гнучкість кода
- Легко додавати нові типи
- Уніфікований інтерфейс

---

## 2. Класи та об'єкти

### Синтаксис класів

```javascript
// Оголошення класу
class Car {
  // Конструктор - викликається при створенні об'єкта
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.mileage = 0;
  }
  
  // Instance метод
  drive(distance) {
    this.mileage += distance;
  }
  
  getInfo() {
    return `${this.brand} ${this.model} (${this.year}), пройдено: ${this.mileage} км`;
  }
}

// Створення об'єктів (екземплярів)
const car1 = new Car('Toyota', 'Camry', 2020);
const car2 = new Car('BMW', 'X5', 2021);

car1.drive(100);
console.log(car1.getInfo()); // Toyota Camry (2020), пройдено: 100 км
```

### Конструктор

Спеціальний метод `constructor`, який:
- Викликається автоматично при `new ClassName()`
- Ініціалізує властивості об'єкта
- Може містити будь-яку логіку ініціалізації

```javascript
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.isActive = true;
    this.createdAt = new Date();
    this.posts = [];
    
    console.log(`Користувач ${username} створений`);
  }
}

const user = new User('john_doe', 'john@example.com');
// Користувач john_doe створений
```

### Різниця між класом та об'єктом

```javascript
// КЛАС - шаблон, структура
class Dog {
  constructor(name) {
    this.name = name;
  }
  
  bark() {
    return `${this.name} гавкає`;
  }
}

// ОБ'ЄКТ - конкретний екземпляр з реальними даними
const myDog = new Dog('Rex');     // об'єкт
const yourDog = new Dog('Buddy');  // інший об'єкт

console.log(myDog.bark());   // Rex гавкає
console.log(yourDog.bark()); // Buddy гавкає
console.log(myDog instanceof Dog); // true
```

---

## 3. Властивості та методи

### Властивості (Properties)

Змінні, які належать об'єкту:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;    // публічна властивість
    this.age = age;      // публічна властивість
    this._email = '';    // умовно приватна (за конвенцією)
  }
}

const person = new Person('Alice', 28);
console.log(person.name); // Alice
person.name = 'Bob';      // змінення властивості
console.log(person.name); // Bob
```

### Instance методи (методи екземпляра)

Функції, які мають доступ до контексту через `this`:

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  // Instance методи
  getArea() {
    return this.width * this.height;
  }
  
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
  
  scale(factor) {
    this.width *= factor;
    this.height *= factor;
  }
  
  printInfo() {
    console.log(`Розмір: ${this.width}×${this.height}`);
    console.log(`Площа: ${this.getArea()}`);
    console.log(`Периметр: ${this.getPerimeter()}`);
  }
}

const rect = new Rectangle(10, 5);
rect.getArea();      // 50
rect.scale(2);       // ширина=20, висота=10
rect.printInfo();    // виведе інформацію
```

### Ключове слово this

`this` посилається на поточний об'єкт:

```javascript
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }
  
  add(num) {
    this.value += num;    // цей this посилається на об'єкт
    return this;          // повернення this для ланцюга
  }
  
  multiply(num) {
    this.value *= num;
    return this;
  }
  
  getValue() {
    return this.value;
  }
}

const calc = new Calculator(5);
const result = calc.add(10).multiply(2).getValue();
console.log(result); // 30 (5+10=15, 15*2=30)
```

### Статичні методи (Static Methods)

Методи класу, а не екземпляра:

```javascript
class MathUtils {
  // Статичні методи
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static isPositive(num) {
    return num > 0;
  }
  
  // Instance метод
  constructor(name) {
    this.name = name;
  }
}

// Виклик статичних методів на класі
console.log(MathUtils.add(5, 3));        // 8
console.log(MathUtils.multiply(4, 7));   // 28
console.log(MathUtils.isPositive(-5));   // false

// Instance методи доступні на об'єктах
const utils = new MathUtils('calculator');
console.log(utils.name); // calculator

// Статичні методи недоступні на екземплярі
console.log(utils.add); // undefined
```

**Практичне використання статичних методів:**

```javascript
class User {
  constructor(username, password) {
    this.username = username;
    this.password = this.constructor.hashPassword(password);
  }
  
  // Статичний метод - фабрика
  static createGuest() {
    return new User('guest', 'temporary');
  }
  
  // Статичний метод - утиліта
  static hashPassword(password) {
    return btoa(password); // просто приклад, в реальності використовувати bcrypt
  }
}

const user1 = new User('john', 'secret123');
const guest = User.createGuest();

console.log(user1.username);  // john
console.log(guest.username);  // guest
```

---

## 4. Геттери та сеттери

### Геттер (get)

Метод для читання властивості:

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  // Геттер - викликається без дужок
  get radius() {
    console.log('Читання radius');
    return this._radius;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
  
  get diameter() {
    return 2 * this._radius;
  }
}

const circle = new Circle(5);
console.log(circle.radius);    // Читання radius, потім 5
console.log(circle.area);      // 78.53981633974483
console.log(circle.diameter);  // 10
```

### Сеттер (set)

Метод для встановлення властивості з валідацією:

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    if (typeof value !== 'number') {
      throw new Error('Температура повинна бути числом');
    }
    if (value < -273.15) {
      throw new Error('Температура не може бути нижче абсолютного нуля');
    }
    this._celsius = value;
  }
  
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(0);
console.log(temp.celsius);    // 0
console.log(temp.fahrenheit); // 32

temp.celsius = 25;
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 98.6;
console.log(temp.celsius);    // 37
```

### Валідація через сеттери

```javascript
class BankAccount {
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this._balance = initialBalance;
  }
  
  get balance() {
    return this._balance;
  }
  
  set balance(amount) {
    if (amount < 0) {
      throw new Error('Баланс не може бути від\'ємним');
    }
    this._balance = amount;
  }
  
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Сума повинна бути більше нуля');
    }
    this.balance += amount;
    return this.balance;
  }
  
  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error('Недостатньо коштів');
    }
    this.balance -= amount;
    return this.balance;
  }
}

const account = new BankAccount('John', 1000);
console.log(account.balance);      // 1000

account.deposit(500);
console.log(account.balance);      // 1500

account.withdraw(200);
console.log(account.balance);      // 1300

// account.balance = -100; // Error: Баланс не може бути від'ємним
```

---

## 5. Prototype

### Що таке Prototype?

Кожен об'єкт в JavaScript має приховане посилання `[[Prototype]]` на об'єкт-прототип. Це забезпечує успадкування властивостей та методів.

```javascript
// Традиційний синтаксис функцій-конструкторів
function Car(brand) {
  this.brand = brand;
}

// Додавання методу в prototype
Car.prototype.honk = function() {
  console.log(`${this.brand} гудить!`);
};

const myCar = new Car('Toyota');
console.log(myCar.brand); // Toyota
myCar.honk();             // Toyota гудить!

// Перевірка наслідування
console.log(myCar.hasOwnProperty('honk'));    // false (у об'єкта)
console.log('honk' in myCar);                 // true (наслідований)
console.log(Car.prototype.hasOwnProperty('honk')); // true (у прототипу)
```

### Ланцюг Прототипів (Prototype Chain)

Коли ви звертаєтесь до властивості, JavaScript шукає її в такому порядку:

1. У самого об'єкта
2. У його прототипу
3. У прототипу батька
4. І так далі до `null`

```javascript
const arr = [1, 2, 3];

// Методи Array знаходяться в Array.prototype
console.log(arr.push);    // function
console.log(arr.map);     // function
console.log(arr.hasOwnProperty('push')); // false

// Перевірка ланцюга
console.log(Object.getPrototypeOf(arr) === Array.prototype);      // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));             // null

// Вся ланцюг: arr → Array.prototype → Object.prototype → null
```

### Цілі та завдання Prototype

**1. Економія пам'яті:**

```javascript
function Dog(name) {
  this.name = name;
}

// ХІ (неправильно) - копіюється для кожного об'єкта
function DogBad(name) {
  this.name = name;
  this.bark = function() {
    console.log(`${this.name} гавкає`);
  };
}

// ✓ (правильно) - один раз в прототипу
Dog.prototype.bark = function() {
  console.log(`${this.name} гавкає`);
};

const dog1 = new Dog('Rex');
const dog2 = new Dog('Buddy');

// dog1 і dog2 діляться одним методом bark
console.log(dog1.bark === dog2.bark); // true (один і той же метод)
```

**2. Успадкування:**

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} їсть`);
};

function Dog(name, breed) {
  Animal.call(this, name); // виклик конструктора батька
  this.breed = breed;
}

// Встановлення ланцюга прототипів
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} гавкає`);
};

const dog = new Dog('Rex', 'Лабрадор');
dog.eat();  // Rex їсть (від Animal)
dog.bark(); // Rex гавкає (від Dog)
```

**3. Розширення вбудованих об'єктів:**

```javascript
// Додавання методу до String
if (!String.prototype.capitalizeFirst) {
  String.prototype.capitalizeFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}

console.log('hello'.capitalizeFirst()); // Hello

// Додавання методу до Array
if (!Array.prototype.sum) {
  Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
  };
}

console.log([1, 2, 3, 4].sum()); // 10
```

### Object.create() для створення об'єктів

```javascript
const parent = {
  greet() {
    console.log(`Привіт, я ${this.name}`);
  }
};

const child = Object.create(parent);
child.name = 'Катя';
child.greet(); // Привіт, я Катя

// Перевірка
console.log(parent.isPrototypeOf(child)); // true
```

---

## 6. Успадкування

### Синтаксис extends (сучасний)

```javascript
// Батьківський клас
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
  }
  
  accelerate() {
    this.speed += 10;
    console.log(`${this.brand} ${this.model} прискорюється до ${this.speed} км/ч`);
  }
  
  stop() {
    this.speed = 0;
    console.log('Транспортний засіб зупинений');
  }
}

// Підклас
class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model); // виклик конструктора батька
    this.doors = doors;
  }
  
  openTrunk() {
    console.log('Багажник відкритий');
  }
}

// Подвійний підклас
class ElectricCar extends Car {
  constructor(brand, model, doors, batteryCapacity) {
    super(brand, model, doors);
    this.batteryCapacity = batteryCapacity;
    this.battery = batteryCapacity;
  }
  
  charge() {
    this.battery = this.batteryCapacity;
    console.log(`Батарея заряджена: ${this.battery}%`);
  }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 4, 100);
tesla.accelerate();      // Tesla Model 3 прискорюється до 10 км/ч
tesla.openTrunk();       // Багажник відкритий
tesla.charge();          // Батарея заряджена: 100%
```

### super в конструкторі та методах

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  
  getInfo() {
    return `${this.name}: ${this.salary}$`;
  }
}

class Manager extends Employee {
  constructor(name, salary, department) {
    super(name, salary); // обов'язковий виклик батьківського конструктора
    this.department = department;
  }
  
  getInfo() {
    const parentInfo = super.getInfo(); // виклик методу батька
    return `${parentInfo}, відділ: ${this.department}`;
  }
}

const manager = new Manager('Alice', 5000, 'IT');
console.log(manager.getInfo());
// Alice: 5000$, відділ: IT
```

### Правильний порядок у конструкторі

```javascript
class Parent {
  constructor() {
    this.parentValue = 'батько';
  }
}

class Child extends Parent {
  constructor() {
    super(); // ПЕРШИМ РЯДКОМ - обов'язково!
    this.childValue = 'дитина';
    console.log(this.parentValue); // тепер доступне
  }
}

// const child = new Child(); // OK
```

### Множинне успадкування через Mixins

JavaScript не підтримує класичне множинне успадкування, але можна використовувати Mixins:

```javascript
// Mixin - об'єкт з методами
const flyingMixin = {
  fly() {
    console.log(`${this.name} летить в небі`);
  }
};

const swimmingMixin = {
  swim() {
    console.log(`${this.name} плаває в воді`);
  }
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Duck extends Animal {}

// "Змішування" методів
Object.assign(Duck.prototype, flyingMixin, swimmingMixin);

const duck = new Duck('Качка');
duck.fly();   // Качка летить в небі
duck.swim();  // Качка плаває в воді
```

---

## 7. Поліморфізм

### Перевизначення методів (Method Override)

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  makeSound() {
    console.log('Звук...');
  }
}

class Dog extends Animal {
  makeSound() {
    console.log(`${this.name} гавкає: "Гав-гав!"`);
  }
}

class Cat extends Animal {
  makeSound() {
    console.log(`${this.name} мяукає: "Мяу!"`);
  }
}

class Bird extends Animal {
  makeSound() {
    console.log(`${this.name} поє: "Чирик-чирик!"`);
  }
}

// Поліморфізм
const animals = [
  new Dog('Rex'),
  new Cat('Мурка'),
  new Bird('Горобець')
];

animals.forEach(animal => {
  animal.makeSound();
});
// Rex гавкає: "Гав-гав!"
// Мурка мяукає: "Мяу!"
// Горобець поє: "Чирик-чирик!"
```

### Duck Typing

"Якщо це ходить як утка і крякає як утка - це утка"

```javascript
class Duck {
  quack() {
    return 'Кря-кря!';
  }
  
  waddle() {
    return 'Вразливо-вразливо...';
  }
}

class Person {
  quack() {
    return 'Я наслідую утку: кря-кря!';
  }
  
  waddle() {
    return 'Я можу вразливо ходити!';
  }
}

class Robot {
  quack() {
    return '*механічний звук*';
  }
  
  waddle() {
    return '*дріпання сервоприводів*';
  }
}

function makeItQuack(creature) {
  console.log(creature.quack());
  console.log(creature.waddle());
}

makeItQuack(new Duck());     // різні об'єкти
makeItQuack(new Person());   // один інтерфейс
makeItQuack(new Robot());    // різна реалізація
```

### Абстрактні класи (паттерн)

```javascript
class Shape {
  constructor(name) {
    this.name = name;
  }
  
  // "Абстрактний" метод - повинен бути реалізований в підклассі
  getArea() {
    throw new Error(`${this.constructor.name} повинен реалізувати getArea()`);
  }
  
  getInfo() {
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

class Square extends Shape {
  constructor(side) {
    super('Квадрат');
    this.side = side;
  }
  
  getArea() {
    return this.side ** 2;
  }
}

const shapes = [
  new Circle(5),
  new Square(4)
];

shapes.forEach(shape => {
  console.log(shape.getInfo());
});
```

---

## 8. Винятки та обробка помилок

### Що таке виняток?

Виняток — це об'єкт помилки, який порушує нормальний хід виконання програми.

### Try...Catch...Finally

```javascript
try {
  // Код, що може викликати помилку
  const result = riskyOperation();
  console.log('Результат:', result);
  
} catch (error) {
  // Обробка помилки
  console.error('Перехоплена помилка:', error.message);
  
} finally {
  // Код, який виконується в будь-якому випадку
  console.log('Очищення ресурсів');
}
```

### Кидання помилок (Throw)

```javascript
function validateEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Невалідна електронна пошта');
  }
  if (email.length < 5) {
    throw new Error('Електронна пошта занадто коротка');
  }
  return true;
}

try {
  validateEmail('test');
} catch (error) {
  console.error(error.message); // Невалідна електронна пошта
}
```

### Типи вбудованих помилок

```javascript
// SyntaxError - помилка синтаксису
try {
  eval('const x = ;'); // помилка синтаксису
} catch (e) {
  console.log(e instanceof SyntaxError); // true
}

// TypeError - помилка типу
try {
  const x = null;
  x.toString(); // null не має методів
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message); // Cannot read properties of null
}

// ReferenceError - посилання на невизначену змінну
try {
  console.log(undefinedVariable);
} catch (e) {
  console.log(e instanceof ReferenceError); // true
}

// RangeError - значення поза допустимим діапазоном
try {
  new Array(-1); // від'ємна довжина
} catch (e) {
  console.log(e instanceof RangeError); // true
}
```

### Користувацькі класи помилок

```javascript
// Користувацька помилка
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

try {
  throw new ValidationError('Пароль занадто короткий', 'password');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Помилка в полі "${error.field}": ${error.message}`);
  }
}
```

### Вкладені try...catch...finally

```javascript
try {
  console.log('1. Зовнішній блок try');
  
  try {
    console.log('2. Внутрішній блок try');
    throw new Error('Внутрішня помилка');
  } catch (e) {
    console.log('3. Внутрішній catch:', e.message);
    throw new Error('Нова помилка від внутрішнього catch');
  } finally {
    console.log('4. Внутрішній finally');
  }
  
} catch (e) {
  console.log('5. Зовнішній catch:', e.message);
} finally {
  console.log('6. Зовнішній finally');
}

// Порядок виконання:
// 1. Зовнішній блок try
// 2. Внутрішній блок try
// 3. Внутрішній catch: Внутрішня помилка
// 4. Внутрішній finally
// 5. Зовнішній catch: Нова помилка від внутрішнього catch
// 6. Зовнішній finally
```

### Практичний приклад: обробка асинхронних помилок

```javascript
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new APIError(
        'Помилка завантаження користувача',
        response.status,
        await response.json()
      );
    }
    
    return await response.json();
    
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API помилка [${error.status}]: ${error.message}`);
    } else if (error instanceof TypeError) {
      console.error('Помилка мережі:', error.message);
    } else {
      console.error('Невідома помилка:', error.message);
    }
    throw error;
  }
}
```

---

## 9. Практичні приклади

### Приклад 1: Система управління бібліотекою

```javascript
class Book {
  constructor(title, author, isbn, year) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
    this.isAvailable = true;
  }
  
  getInfo() {
    return `"${this.title}" автор ${this.author} (${this.year})`;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
  
  addBook(book) {
    if (!(book instanceof Book)) {
      throw new TypeError('Повинна бути книга');
    }
    this.books.push(book);
  }
  
  findByAuthor(author) {
    return this.books.filter(book => book.author === author);
  }
  
  findAvailable() {
    return this.books.filter(book => book.isAvailable);
  }
  
  borrowBook(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    if (!book) {
      throw new Error('Книга не знайдена');
    }
    if (!book.isAvailable) {
      throw new Error('Книга вже видана');
    }
    book.isAvailable = false;
    return book;
  }
  
  returnBook(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    if (!book) {
      throw new Error('Книга не знайдена');
    }
    book.isAvailable = true;
  }
  
  getStatistics() {
    return {
      totalBooks: this.books.length,
      availableBooks: this.findAvailable().length,
      borrowedBooks: this.books.filter(b => !b.isAvailable).length
    };
  }
}

// Використання
const library = new Library('Центральна бібліотека');

library.addBook(new Book('1984', 'George Orwell', 'ISBN001', 1949));
library.addBook(new Book('Мастер и Маргарита', 'Михаил Булгаков', 'ISBN002', 1966));

console.log(library.borrowBook('ISBN001').getInfo());
console.log(library.getStatistics());
// { totalBooks: 2, availableBooks: 1, borrowedBooks: 1 }
```

### Приклад 2: Система управління працівниками

```javascript
class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this._salary = salary;
    this.department = null;
  }
  
  get salary() {
    return this._salary;
  }
  
  set salary(amount) {
    if (amount < 0) {
      throw new Error('Зарплата не може бути від\'ємною');
    }
    this._salary = amount;
  }
  
  getInfo() {
    const dept = this.department ? this.department.name : 'без відділу';
    return `${this.name} (${this.position}) - ${this._salary}$ [${dept}]`;
  }
}

class Manager extends Employee {
  constructor(name, position, salary) {
    super(name, position, salary);
    this.subordinates = [];
  }
  
  addSubordinate(employee) {
    this.subordinates.push(employee);
  }
  
  getTeamInfo() {
    let info = `Менеджер: ${this.getInfo()}\n`;
    info += `Команда (${this.subordinates.length}):\n`;
    this.subordinates.forEach(emp => {
      info += `  - ${emp.getInfo()}\n`;
    });
    return info;
  }
}

class Department {
  constructor(name) {
    this.name = name;
    this.employees = [];
  }
  
  addEmployee(employee) {
    this.employees.push(employee);
    employee.department = this;
  }
  
  getTotalSalary() {
    return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
  }
  
  getAverageSalary() {
    if (this.employees.length === 0) return 0;
    return this.getTotalSalary() / this.employees.length;
  }
}

// Використання
const itDepartment = new Department('IT');

const manager = new Manager('Alice', 'Senior Manager', 5000);
const dev1 = new Employee('Bob', 'Developer', 3000);
const dev2 = new Employee('Charlie', 'Developer', 3500);

itDepartment.addEmployee(manager);
itDepartment.addEmployee(dev1);
itDepartment.addEmployee(dev2);

manager.addSubordinate(dev1);
manager.addSubordinate(dev2);

console.log(manager.getTeamInfo());
console.log(`Середня зарплата: $${itDepartment.getAverageSalary().toFixed(2)}`);
```

### Приклад 3: Система повідомлень з обробкою помилок

```javascript
class Message {
  constructor(sender, recipient, text) {
    if (!sender || !recipient || !text) {
      throw new Error('Усі поля обов\'язкові');
    }
    this.sender = sender;
    this.recipient = recipient;
    this.text = text;
    this.timestamp = new Date();
    this.isRead = false;
  }
  
  getInfo() {
    return `${this.sender} → ${this.recipient}: "${this.text}" (${this.timestamp})`;
  }
}

class User {
  constructor(username) {
    this.username = username;
    this.inbox = [];
    this.sent = [];
  }
  
  sendMessage(recipient, text) {
    try {
      const message = new Message(this.username, recipient, text);
      this.sent.push(message);
      return true;
    } catch (error) {
      console.error('Помилка при відправці:', error.message);
      return false;
    }
  }
  
  receiveMessage(message) {
    if (!(message instanceof Message)) {
      throw new TypeError('Повинна бути повідомлення');
    }
    this.inbox.push(message);
  }
  
  readMessage(index) {
    if (index < 0 || index >= this.inbox.length) {
      throw new RangeError('Невалідний індекс повідомлення');
    }
    this.inbox[index].isRead = true;
    return this.inbox[index].text;
  }
  
  getUnreadCount() {
    return this.inbox.filter(msg => !msg.isRead).length;
  }
  
  getInfo() {
    return {
      username: this.username,
      unread: this.getUnreadCount(),
      totalMessages: this.inbox.length,
      sentMessages: this.sent.length
    };
  }
}

// Використання
const alice = new User('Alice');
const bob = new User('Bob');

alice.sendMessage(bob.username, 'Привіт Бобе!');
alice.sendMessage(bob.username, 'Як справи?');

console.log(alice.getInfo());
// { username: 'Alice', unread: 0, totalMessages: 0, sentMessages: 2 }
```

---

## Вправи для практики

### Вправа 1: Бібліотека фігур
Створіть класи для різних геометричних фігур (трикутник, прямокутник, коло) з методами розрахунку площі та периметра.

### Вправа 2: Система оцінок студентів
Створіть класи `Student` та `Course` з можливістю додавання оцінок, розрахунку середнього балу та отримання результатів.

### Вправа 3: Кошик покупок
Створіть систему управління кошиком e-commerce з товарами, вартістю та можливістю розрахунку загальної суми.

### Вправа 4: Система брони готелю
Створіть класи для кімнат, бронювання та гостей з обробкою помилок.

### Вправа 5: Гра в шахи
Розробіть базову структуру для шахової гри з фігурами та дошкою.

---

## Корисні посилання та ресурси

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN: Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [ECMAScript Specification](https://tc39.es/ecma262/)

---

## Висновок

Об'єктно-орієнтоване програмування є могутнім інструментом для організації коду. Основні моменти:

✓ **Інкапсуляція** - приховуйте внутрішні деталі  
✓ **Успадкування** - переиспользуйте код через класи  
✓ **Поліморфізм** - різні об'єкти, один інтерфейс  
✓ **Prototype** - розумійте механізм успадкування  
✓ **Винятки** - обробляйте помилки правильно  

Практикуйтеся на прикладах та створюйте власні проекти!
