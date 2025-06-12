function sendTelegramMessage(message) {
    const token = "7868034655:AAHxxpmgkJkmNupEymPQYoJj_a26K8q3now";
    const chatId = "1082279573";

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    }).catch(err => console.error("Ошибка отправки", err));
}

const clickSound = new Audio('click.mp3');
const openModal = new Audio('open.mp3');
const clickCry = new Audio('cry.mp3');
const clickwow = new Audio('wow.mp3');
const clickYeah = new Audio('yeah.mp3');
openModal.volume=0.3;
clickYeah.volume=0.5;
function playClickSound() {
    clickSound.play();
}
function playCrySound() {
    clickCry.play();
}
function playOpenSound() {
    openModal.play();
}
function playWowSound() {
    clickwow.play();
}
function playYeahSound() {
    clickYeah.play();
}



function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤";
    // Случайная позиция по ширине
    heart.style.left = Math.random() * 100 + "vw";
    // Случайный размер сердечек
    heart.style.fontSize = (20 + Math.random() * 30) + "px";
    // Случайное направление вращения
    const rotation = Math.random() < 0.5 ? -1 : 1;
    // Случайная скорость вращения
    const rotationSpeed = 360 + Math.random() * 360; 
    // Записываем кастомную анимацию
    heart.style.animation = `fall 5s linear forwards, spin ${rotation * rotationSpeed}deg`;

    // Используем кастомную анимацию через переменную
    heart.style.setProperty('--rotation', rotation * rotationSpeed + 'deg');

    document.querySelector(".hearts").appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);




document.getElementById("startButton").addEventListener("click", function() {
    const music = document.getElementById("bg-music");
    music.volume = 0.5;  // громкость на 50%
    music.play();
    document.getElementById("screen1").style.display = "none";
    document.getElementById("screen2").style.display = "block";
    playWowSound();
    sendTelegramMessage("Кнопка старт нажата");
});
document.getElementById("no-button").addEventListener("click", function() {
    document.getElementById("screen2").style.display = "none";
    document.getElementById("screen3").style.display = "block";
    sendTelegramMessage("Нажал не читать");
    playCrySound();
});
document.getElementById("repeat-button").addEventListener("click", function() {
    document.getElementById("screen3").style.display = "none";
    document.getElementById("screen1").style.display = "block";
    sendTelegramMessage("повторил");
    playClickSound();
});
document.getElementById("yes-button").addEventListener("click", function() {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("screen2").style.display = "none";
    document.getElementById("screen4").style.display = "block";
    sendTelegramMessage("Читает письмо");
    playOpenSound();
});
document.getElementById("us-button").addEventListener("click", function() {
    document.getElementById("screen4").style.display = "none";
    document.getElementById("screen5").style.display = "block";
    sendTelegramMessage("Мы!");
    playClickSound();
});


const closeModalButton = document.getElementById("closeModalButton");
const modal = document.getElementById("modal");



const modalContent = document.querySelector(".modal-content");
// функция для закрытия модалки с анимацией
function closeModal() {
    playOpenSound();
    modalContent.classList.add("fade-out");

    setTimeout(function() {
        modal.classList.add("hidden");
        modalContent.classList.remove("fade-out");
    }, 500);
}

closeModalButton.addEventListener("click", function(event) {
    if (event.target === closeModalButton) {
        closeModal();
    }
});

// закрытие при клике вне письма
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});




let noClickCount = 0;

const yesButton = document.getElementById("ye-but");
const noButton = document.getElementById("no-but");

yesButton.addEventListener("click", function() {
    confetti({
        particleCount: 200,
        spread: 70,
        zIndex: 9999,
        origin: { y: 0.6 }
    });
    document.getElementById("happy").classList.remove("hidden");
    sendTelegramMessage("Согласился выйти замуж!");
    playYeahSound();
});

noButton.addEventListener("click", function() {
    noClickCount++;
    sendTelegramMessage("НЕ СОГЛАСЕН ЗАМУЖ!!");
    playCrySound();
    // Увеличиваем ДА
    let newYesScale = 1 + noClickCount * 0.1;
    yesButton.style.transform = `scale(${newYesScale})`;

    // Уменьшаем НЕТ
    let newNoScale = 1 - noClickCount * 0.1;
    if (newNoScale < 0) newNoScale = 0;
    noButton.style.transform = `scale(${newNoScale})`;

    if (noClickCount >= 5) {
        noButton.style.opacity = '0';

        setTimeout(() => {
            noButton.style.display = 'none';
            
            // Центрируем ДА и ещё увеличиваем
            yesButton.style.left = '50%';
            yesButton.style.transform = `scale(2)`;
        }, 500);
    }
});

