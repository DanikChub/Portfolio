
let red = 'rgba(255, 40, 40, 1)',
    purple = 'rgba(147, 66, 202, 1)',
    blue = 'rgba(39, 167, 231, 1)',
    green = 'rgba(39, 230, 133, 1)',
    white = 'rgba(255, 255, 255, 1)';

const myHeight = document.querySelector('.intro').offsetHeight + document.querySelector('.about').offsetHeight;

var canvas = document.querySelector('.canvas'),
    body = document.querySelector('body'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = myHeight,
    particles = [],
    hover = false,
    thisColor = red,
    properties = {
        bgColor             : 'rgba(17, 17, 19, 1)',
        particleColor       : red,
        particleHoverColor  : purple,
        particleRadius      : 2,
        particleCount       : w/12,
        particleMaxVelocity : 1,
        lineLength          : 150,
        particleLife        : 1000,

    };
    
    

    window.onresize = function() {
        w = canvas.width = innerWidth;
        h = canvas.height = myHeight;
    };

    class Particle{
        constructor() {
            this.color = thisColor;
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX *=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY *=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        slowDown() {
            this.velocityX*=0.2;
            this.velocityY*=0.2;
        }
        speedUp() {
            this.velocityX = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
        }
        
        
        repaint(newColor) {
            this.color = newColor;
        }

        reDraw() {
            if (this.y > innerHeight) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = '#000';
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            
           
        }

        reCalculateLife() {
            if(this.life < 1) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }

    function reDrawBackground() {
        
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, innerHeight+15);
        ctx.fillStyle = "rgb(231, 231, 231)";
        ctx.fillRect(0, innerHeight+15, w, h-innerHeight);
    }

    function drawLines() {
        var x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0.5';
                    let newColor = thisColor.slice(0, -2)
                    if (innerHeight < y1 || innerHeight < y2 ) {
                        ctx.strokeStyle =  `rgba(0,0,0,${opacity})`;
                    } else {
                        ctx.strokeStyle =  `${newColor}${opacity})`;
                    }
                    
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles() {
        for (let i in particles) {

            particles[i].reCalculateLife();

            particles[i].position();

            particles[i].reDraw();

        }
    }

    function loop() {
        
        reDrawBackground();
        reDrawParticles();
        drawLines();
       requestAnimationFrame(loop);
    } 

    function init() {
        
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    init();

function reColor(rgba) {
    for (let i in particles) {
        thisColor = rgba;
        particles[i].repaint(rgba);
    }

    
}

const slow = (color) => {
    
    canvas.style.filter = "blur(1px)";
    for (let i in particles) {
        hover = true;
        particles[i].slowDown();
        reColor(color)
    }
}

const fast = (color) => {
   
    canvas.style.filter = "blur(0px)";
    for (let i in particles) {
        hover = false;
        particles[i].speedUp();
        reColor(color)
    }
}

function hoverSlow(item, from, to) {

    if (item.length > 0) {
        item.forEach(i => {
            i.addEventListener('mouseenter', () => {
                slow(to);
                
            })
            
            i.addEventListener('mouseout', () => {
                
                fast(from);
            })
        })
        
    } else {
        item.addEventListener('mouseenter', () => {
            slow(to);
        })
        
        item.addEventListener('mouseout', () => {
            
            fast(from);
        })
    }
}


/*nav*/ 

const nav_links = document.querySelectorAll('.nav_link'),
      intro_title = document.querySelector('.intro_title'),
      intro_button = document.querySelector('.intro_button.blue'),
      intro_button_green = document.querySelector('.intro_button'),
      notification = document.querySelector('.notification'),
      intro_images = document.querySelector('.intro_images');
      

hoverSlow(intro_button, red, blue);
hoverSlow(nav_links, red, purple)






hoverSlow(intro_button_green, red, green);



// scroll

const nav = document.querySelector('.nav'),
      me = document.getElementById('me'); 


window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (scrollTop >= innerHeight) {
        
        nav.style.position = "fixed";
        me.classList.add('active');
    } else {
        nav.style.position = "absolute";
        me.classList.remove('active');
    }
    
}

// animation

const ribbon = document.querySelector('.ribbon'),
      ribbonTwo = document.querySelector('.two');
const ribbonVelocity = 1;
let ribbonLeft = 0;
let ribbonTwoLeft = -1620;

function animLoop() {
    if (ribbonLeft>1620) {
        ribbonLeft = 0;
        ribbonTwoLeft = -1620;
    }
  
    ribbonLeft+=ribbonVelocity;
    ribbonTwoLeft+=ribbonVelocity;
    ribbon.style.left = `${ribbonLeft}px`
    ribbonTwo.style.left = `${ribbonTwoLeft}px`
    requestAnimationFrame(animLoop);
} 


animLoop();


function notificate(message, className, delayFrom = 1000, delayTo = 5000) {
    notification.innerHTML = message;
    className ? notification.classList.add(className) : '';
    setTimeout(() => {
        notification.classList.add('active');
    }, delayFrom)
    
    setTimeout(() => {
        notification.classList.remove('active');
        className ? notification.classList.remove(className) : '';
    }, delayTo)
}

/* STAGE FORM */

const stage_form = document.querySelector('.stage_form'),
      stage_form_button = document.querySelector('.stage_button'),
      stage_inputs = document.querySelectorAll('.stage_input');

async function sendDataToTelegram(formData) {
    const botToken = '7580690311:AAHymUQfau0jqkQ_FXQr--xSteRndo5yF78'; // Токен вашего бота
    const chatId = '765193926'; // ID получателя (пользователя)
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`; // URL для отправки сообщения

    // Формируем сообщение в формате HTML
    const message = `
📩 Вам новая заявка:
        <b>Имя:</b> ${formData.get('name')}
        <b>Номер:</b> ${formData.get('phone')}`


    // Параметры, которые будем отправлять
    const params = {
        chat_id: chatId, // ID чата
        text: message, // Текст сообщения
        parse_mode: 'HTML' // Режим парсинга HTML
    };

    // Отправляем данные с помощью fetch API
    return await fetch(apiUrl, {
        method: 'POST', // Метод отправки
        headers: {
            'Content-Type': 'application/json', // Указываем тип содержимого
        },
        body: JSON.stringify(params) // Преобразуем параметры в JSON
    }).then(response => response.json()); // Возвращаем ответ в формате JSON
}



stage_form.addEventListener('submit', formSend);




async function formSend(e) {
    e.preventDefault();
    let sendTime = localStorage.getItem('sendTime');
    let now = new Date();
    if (sendTime) {
        if (now.getHours() != Number(sendTime)) {
            localStorage.setItem('send', false);
            
        }
    }
    let valid = true;
    stage_inputs.forEach(el => el.value? valid*=true : valid*=false)
    if (valid) {
        if ((localStorage.getItem('send') == 'false' || !localStorage.getItem('send'))) {
            let formData = new FormData(stage_form);
            sendDataToTelegram(formData)
            .then(response => {
                if (response.ok) {
                    let now = new Date();
                    localStorage.setItem('sendTime', now.getHours());
                    localStorage.setItem('send', true);
                    
                    
                    notificate('Отправлено! Скоро перезвоним');
                    stage_inputs.forEach(el => el.value = '');
                }
            });
        } else {
            notificate('Упс! Вы уже отправили заявку!', 'red');
            stage_inputs.forEach(el => el.value = '');
        } 
    } else {
        stage_inputs.forEach(el => el.value? '' : el.style.border = '1px solid rgb(255, 82, 82)')
        notificate('Заполните все элементы формы!', 'red', 500);
    }
    
    
    
}

stage_inputs.forEach(el => el.addEventListener('input', () => {el.style.border = 'none'}))


// Проверяем фокус
stage_inputs[1].addEventListener('input', _ => {
    // Если там ничего нет или есть, но левое
    if(stage_inputs[1].value.length > 12 && stage_inputs[1].value.length != 18) {
        stage_inputs[1].value = stage_inputs[1].value.substring(0, 12);
      }
  });
stage_inputs[1].addEventListener('focus', _ => {
  // Если там ничего нет или есть, но левое
  if(!/^\+\d*$/.test(stage_inputs[1].value))
    // То вставляем знак плюса как значение
    stage_inputs[1].value = '+7';
});

stage_inputs[1].addEventListener('keypress', e => {
  // Отменяем ввод не цифр
  if(!/\d/.test(e.key))
    e.preventDefault();
});

/* HAPPY TEXT */
const happy_text = document.querySelector('.happy_text'),
      happy = document.querySelector('.happy');
var i = 0;
let save_i = 0;
var txt = `This message is shown once a day. To disable it please create the
/home/dan_chub/.hushlogin file.
dan_chub@DESKTOP-DVE77C5:~$ dir/s
-bash: dir/s: No such file or directory
dan_chub@DESKTOP-DVE77C5:~$ bash
dan_chub@DESKTOP-DVE77C5:~$ cowsay
Command 'cowsay' not found, but can be installed with:
sudo apt install cowsay
dan_chub@DESKTOP-DVE77C5:~$ sudo apt install cowsay
[sudo] password for dan_chub:
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  filters cowsay-off
The following NEW packages will be installed:
  cowsay
0 upgraded, 1 newly installed, 0 to remove and 35 not upgraded.
Need to get 18.6 kB of archives.
After this operation, 93.2 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu noble/universe amd64 cowsay all 3.03+dfsg2-8 [18.6 kB]
Fetched 18.6 kB in 0s (38.3 kB/s)
Selecting previously unselected package cowsay.
(Reading database ... 42300 files and directories currently installed.)
Preparing to unpack .../cowsay_3.03+dfsg2-8_all.deb ...
Unpacking cowsay (3.03+dfsg2-8) ...
Setting up cowsay (3.03+dfsg2-8) ...
Processing triggers for man-db (2.12.0-4build2) ...
dan_chub@DESKTOP-DVE77C5:~$ cowsay "hello, friends"
dan_chub@DESKTOP-DVE77C5:~$  sudo apt-get install sl
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  libncurses6
The following NEW packages will be installed:
  libncurses6 sl
0 upgraded, 2 newly installed, 0 to remove and 35 not upgraded.
Need to get 125 kB of archives.
After this operation, 404 kB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://archive.ubuntu.com/ubuntu noble/main amd64 libncurses6 amd64 6.4+20240113-1ubuntu2 [112 kB]
Get:2 http://archive.ubuntu.com/ubuntu noble/universe amd64 sl amd64 5.02-1 [12.7 kB]
Fetched 125 kB in 1s (134 kB/s)
Selecting previously unselected package libncurses6:amd64.
(Reading database ... 42360 files and directories currently installed.)
Preparing to unpack .../libncurses6_6.4+20240113-1ubuntu2_amd64.deb ...
Unpacking libncurses6:amd64 (6.4+20240113-1ubuntu2) ...
Selecting previously unselected package sl.
Preparing to unpack .../archives/sl_5.02-1_amd64.deb ...
Unpacking sl (5.02-1) ...
Setting up libncurses6:amd64 (6.4+20240113-1ubuntu2) ...
Setting up sl (5.02-1) ...
Processing triggers for man-db (2.12.0-4build2) ...
Processing triggers for libc-bin (2.39-0ubuntu8.3) ...
dan_chub@DESKTOP-DVE77C5:~$  sl
dan_chub@DESKTOP-DVE77C5:~$  figlet Welcome
Command 'figlet' not found, but can be installed with:
sudo snap install figlet  # version 2.2.5+git24.202a0a8, or
sudo apt  install figlet  # version 2.2.5-3
sudo apt  install toilet  # version 0.3-1.4
See 'snap info figlet' for additional versions.
dan_chub@DESKTOP-DVE77C5:~$ sudo apt install figlet
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  figlet
0 upgraded, 1 newly installed, 0 to remove and 35 not upgraded.
Need to get 133 kB of archives.

`; /* Текст */ 
var speed = 40; /* Скорость/длительность эффекта в миллисекундах */

let overflow = true;
let work = false;

function typeWriter() {
    if (i < txt.length) {
      if (txt.charAt(i) == '\n') {
          happy_text.innerHTML += '<br>';
      } else {
          happy_text.innerHTML += txt.charAt(i);
      }
      
      i++;
      save_i++
      setTimeout(typeWriter, speed);
    } 
  }
  

happy.addEventListener('click', () => {
    console.log(overflow);
    // happy.style.overflow = overflow ? "visible" : "hidden";
    // happy_text.style.zIndex = overflow ? "-1" : "1";
    // happy_text.style.color = overflow ? "red" : "green";
 
    work ? i = txt.length: typeWriter();
   
    overflow = !overflow;
    work = true;
})


