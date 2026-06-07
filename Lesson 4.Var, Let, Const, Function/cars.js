//ініціалізує роботу нашого сайту
function initApp() {
    // якщо немає var або let - Тоді змінні cars буде видна за мережами фукнції
    // var - для обмеження області видимості змінної у межах фукнції
    var cars = [
        {
            image: "https://cdn0.riastatic.com/photosnew/auto/photo/ford_focus-c-max__642259320fx.webp",
            model: "Focus C-Max",
            mark: "Ford"
        },
        {
            image: "https://cdn1.riastatic.com/photosnew/auto/photo/dodge_journey__636783491fx.webp",
            model: "Journey",
            mark: "Dodge"
        },
    ];
    const n = cars.length;
    for (let i = 0; i < n; i++) {
        var item = `
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${cars[i].image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${cars[i].model}</h5>
    <p class="card-text">${cars[i].mark}</p>
    <a href="#" class="btn btn-primary">Датальніше ...</a>
  </div>
</div>
    `;
        document.writeln(item);
    }




}
initApp(); //оніціалізія сайту - викли фукнції
//Перевірка чи данна змінна існує і ми до неї можемо звертатися
if(typeof cars !== "undefined") { // якщо змінна існує і вона не undefined
    console.log("--cars--", cars);
}