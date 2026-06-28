// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => { //тут оголошується аноміна функція, яка є закритою для іншого коду
    'use strict' //Вказуємо, що у нас буде строгий режим - новий JavaScript ES5 - підтримуємо веб браузер

    //Фото, яке знаходиться в модальному вікні
    const imgCrop = document.getElementById("imgCrop");
    const exampleModal = document.getElementById('exampleModal');
    //сам кропер, який буде обрізати фото
    var cropper = null; // на початку роботи cropper не активний
    //Налаштовуємо подію, якщо вікно намалювалося, нам потрібно відкрити редактор для коду
    const myModal = new bootstrap.Modal(exampleModal) //тобто, щоб модалка була 1 для двох виликів
    //кнопка для збережння зображення із Cropper
    const btnSaveImage = document.getElementById('btnSaveImage');
    let blobImage = null;
    btnSaveImage.addEventListener('click', () => {
       if(cropper) {
            // const imageBase64 = cropper.getCroppedCanvas().toDataURL();
            // const avatarView = document.querySelector('#avatarView');
            // avatarView.src = imageBase64;
            // myModal.hide(); //Відображаю модальне вікно Bootsrap
           cropper.getCroppedCanvas().toBlob((blob) => {
              console.log('cropper cropped', blob);
               const avatarView = document.querySelector('#avatarView');
               avatarView.src = URL.createObjectURL(blob); //відображаю зображення через blob
               blobImage = blob;
               myModal.hide(); //Відображаю модальне вікно Bootsra
           });
            // console.log("base64 Image", imageBase64);
       }
    });

    if(exampleModal) { //якщо вікно існує тоді ми починаємо привязувати події
        exampleModal.addEventListener('shown.bs.modal', event => { //до відображення
            if(cropper) {
                cropper.destroy(); //для того, щоб безпечно створити новий cropper якщо він був
            }

            //Коли модалка готова - ми працюємо із кропером
            cropper = new Cropper(imgCrop, {
                aspectRatio: 1/1,
                viewMode: 1, //обрізка не буде виходити за межі зображення
            });
            console.log("Модальне вікно відобразилося :)");
        });
    }

    //Шукаю інпут із id = file
    //якщо стоїть . - то пошук по класу
    const file = document.querySelector('#file');
    file.addEventListener('change', (e) => {
        var files = e.target.files;
        //виводимо файл на консоль, який ми обрали
        console.log("Select file", e.target.files);
        if (files && files.length) {
            const file = files[0];
            if (/^image\/\w+/.test(file.type)) {
                //Відображення фото забираємо
                //const avatarView = document.querySelector('#avatarView');
                //avatarView.src = URL.createObjectURL(file);
                //Виводимо у модалці наше фото
                imgCrop.src = URL.createObjectURL(file);
                //Шукаю модальне вікно по id
                //const myModal = new bootstrap.Modal(exampleModal)
                myModal.show(); //Відображаю модальне вікно Bootsrap
            }
            else
            {
                alert("Оберіть файл фото. Не вірний формат")
            }
        }
        else
        {
            alert("Ви не обрали жодного фалу!")
        }
    });

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //Елементів із класом .needs-validation - може бути багато через це - тут масив
    const forms = document.querySelectorAll('.needs-validation') // Шукаємо елемент із класом .needs-validation

    // Loop over them and prevent submission
    //Перебираємо усі елементи масиву
    //Елементи масиву містять у собі форму
    Array.from(forms).forEach(form => {
        //Для певної форми прив'язуємо обробку події
        //submit - коли нажимаємо кнопку Реєструватися
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) { //Викликаємо checkValidity для форми і воно саме робить валідацію
                event.preventDefault() //Якщо не валідна форма, то роботу форми зупиняємо
                event.stopPropagation() //Видміняємо усі інші події
            }
            else {
                event.preventDefault() //тут я перехоплюю роботу форми і хочу подивитися дані форми
                const firstName = form.elements['firstName'].value; //із форми отримую значення firstName
                const lastName = form.elements['lastName'].value;
                const email = form.elements['email'].value;
                const password = form.elements['password'].value;
                //якщо існує Cropper
                // const image = form.elements['file'].files[0];

                const strInfo = "ПІБ: " + firstName + " " + lastName + " " + email + " " + password;
                //Коли ми збираємо дані на сервер ми маємо знати, як сервер буде їх приймати
                //бо якщо не вірно вказати дані, нічого не вийде.
                //https://p32-native.itstep.click/swagger/index.html
                //графічний інтерфейс swagger - для тестування чи працює сервер
                //і розуміння того, які дані і як мають предаватися на сервер.
                //swagger - #1 - має знати тестувальник
                //p32 - це наш тестовий сервер

                //Для віправки запитів на сервер ми можемо використовуватися
                //fetch - вбудований новий спосіб відправки запитів на сервер
                //axios - це спеціальна бібліотека, яка більш продвинута і
                //має високий usability - використання і аудиторію

                //Об'єднує усі дані в собі
                const model = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    // imageFile: image
                }
                // console.log("data send server ", model);
                // alert(strInfo);
                //console.log("Усе добре. Я тут працюю");
                if(blobImage == null)
                {
                    alert("Оберіть фото :(");
                }
                else
                {
                    alert("Ми Вас вітаємо будемо реєструвати користувача на сервер :)");
                    //Використовую axios для відправки запиту на сервер
                    const formData = new FormData();
                    formData.append("firstName", firstName);
                    formData.append("lastName", lastName);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("imageFile", blobImage, 'myImage.png');

                    try
                    {
                        axios.post("https://p32-native.itstep.click/api/account/register", formData)
                        .then(res => {
                            alert("Користувача успішно створено :)")
                        })
                        .catch(err => {
                            console.error("Помилка запиту", err);
                            alert("Сталася халепа. Помилка "+ err);
                        })
                    }
                    catch(ex)
                    {
                        console.error("Щось пішло не так", ex);
                    }
                }

            }

            //Додаємо клас до форми
            form.classList.add('was-validated') //Відображаємо помилки по валідації для форми
        }, false)
    })
})() //Тут ми викликаємо анонімну функцію, щоб код запустився JavaScript