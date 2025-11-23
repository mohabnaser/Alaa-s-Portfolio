const typingText = document.querySelector('.typing-text');
const titles = ['Backend Developer', 'Software Engineer', 'Competitive Programmer'];
let idx = 0;
let charIdx = 0;
let deleting = false;

function startTyping() 
{
    const current = titles[idx];
    if (deleting) 
    {
        typingText.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } 
    else 
    {
        typingText.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }
    typingText.style.fontSize = '38px';
    if (!deleting && charIdx === current.length) 
    {
        deleting = true;
        setTimeout(startTyping, 2000);
    } 
    else if (deleting && charIdx === 0)
    {
        deleting = false;
        idx = (idx + 1) % titles.length;
        setTimeout(startTyping, 500);
    }
    else 
    {
        setTimeout(startTyping, deleting ? 50 : 100);
    }
}

window.addEventListener('load', () => {
    setTimeout(startTyping, 1000);
});

const nav = document.getElementById('navbar');
const links = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    let active = '';
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach(sec => {
        const top = sec.offsetTop;
        
        if (window.scrollY >= top - 150) {
            active = sec.getAttribute('id');
        }
    });
    
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === `#${active}`) {
            l.classList.add('active');
        }
    });
});

const burger = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    const lines = burger.querySelectorAll('span');
    if (menu.classList.contains('active')) 
    {
        lines[0].style.transform = 'rotate(45deg) translateY(10px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } 
    else 
    {
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
    }
});

links.forEach(l => {
    l.addEventListener('click', () => {
        menu.classList.remove('active');
        const lines = burger.querySelectorAll('span');
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
    });
});

links.forEach(l => {
    l.addEventListener('click', (e) => {
        e.preventDefault();
        const target = l.getAttribute('href');
        const section = document.querySelector(target);
        
        if (section) {
            const offset = section.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    });
});

const topBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const opts = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, opts);

const elements = document.querySelectorAll('.skill-box, .project-card, .info-item, .highlight-item');

elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    obs.observe(el);
});

const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userName = document.getElementById('name').value;
    
    alert(`Thank you, ${userName}! Your message has been sent successfully. I'll get back to you soon!`);
    
    form.reset();
});

const cards = document.querySelectorAll('.project-card');

cards.forEach(c => {
    c.addEventListener('mousemove', (e) => {
        const box = c.getBoundingClientRect();
        const mouseX = e.clientX - box.left;
        const mouseY = e.clientY - box.top;
        
        const midX = box.width / 2;
        const midY = box.height / 2;
        
        const rotX = (mouseY - midY) / 20;
        const rotY = (midX - mouseX) / 20;
        
        c.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-12px)`;
    });
    
    c.addEventListener('mouseleave', () => {
        c.style.transform = '';
    });
});

const skills = document.querySelectorAll('.skill-box');

skills.forEach((s, i) => {
    s.style.animationDelay = `${i * 0.1}s`;
    
    s.addEventListener('mouseenter', () => {
        s.style.animation = 'none';
        setTimeout(() => {
            s.style.animation = '';
        }, 10);
    });
});

const secs = document.querySelectorAll('section');

const secObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) 
        {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

secs.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
    s.style.transition = 'all 0.8s ease';
    secObs.observe(s);
});

const items = document.querySelectorAll('.info-item');

items.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.2}s`;
});

const btns = document.querySelectorAll('.project-btn, .submit-btn, .social-icon, .social-icon-circle');

btns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const wave = document.createElement('span');
        const box = this.getBoundingClientRect();
        const sz = Math.max(box.width, box.height);
        const posX = e.clientX - box.left - sz / 2;
        const posY = e.clientY - box.top - sz / 2;
        
        wave.style.cssText = `
            position: absolute;
            width: ${sz}px;
            height: ${sz}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${posX}px;
            top: ${posY}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(wave);
        
        setTimeout(() => wave.remove(), 600);
    });
});

if (!document.querySelector('#ripple-style')) 
{
    const css = document.createElement('style');
    css.id = 'ripple-style';
    css.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(css);
}

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});