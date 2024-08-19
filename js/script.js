
let red = 'rgba(255, 40, 40, 1)',
    purple = 'rgba(147, 66, 202, 1)',
    blue = 'rgba(39, 167, 231, 1)',
    green = 'rgba(39, 230, 133, 1)',
    white = 'rgba(255, 255, 255, 1)';

    
var canvas = document.querySelector('.canvas'),
    body = document.querySelector('body'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = body.offsetHeight,
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
        h = canvas.height = document.documentElement.offsetHeight;
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
    intro_title.style.textShadow = "0 0 4px rgb(147, 66, 202)";
    canvas.style.filter = "blur(1px)";
    for (let i in particles) {
        hover = true;
        particles[i].slowDown();
        reColor(color)
    }
}

const fast = (color) => {
    intro_title.style.textShadow = "0 0 4px rgba(255, 40, 40, 1)";
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
                console.log(item, from, to);
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
      intro_imgs = document.querySelectorAll('.intro_inner_img');

hoverSlow(intro_button, red, blue);
hoverSlow(nav_links, red, purple)
hoverSlow(intro_imgs, red, white);

intro_imgs.forEach((intro_img) => {
    intro_img.addEventListener('mouseenter', () => {
        notification.classList.add('active');
    })

    intro_img.addEventListener('mouseleave', () => {
        notification.classList.remove('active');
    })
})



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

//notification



// slider

// const right = document.querySelector('.right'),
//       left  = document.querySelector('.left'),
//       images = document.querySelector('.about_image_inner');
// l = 0;


// right.addEventListener('click', () => {
//     l -= 270;
//     images.style.left = `${l}px`;
// })

// left.addEventListener('click', () => {
//     l += 270;
//     images.style.left = `${l}px`;
// })




