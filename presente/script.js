// Variáveis globais
let musicPlaying = false;
let audioContext;

// Função para criar corações flutuantes
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('floatingHearts').appendChild(heart);
    
    // Remove o coração após a animação
    setTimeout(() => {
        if (heart && heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Criar corações continuamente
setInterval(createFloatingHeart, 1500);

// Função para mostrar mensagem das fotos
function showPhotoMessage(photoNumber) {
    const messages = {
        1: "Nossa primeira foto juntos! Desde dessa época eu ja era apaixonado pelo seu sorriso",
        2: "Na minha opinião essa é nossa foto favorita amor, e você tá PERFEITA nela como sempre KKKKKK",
        3: "Esse dia a minha barriga chegou até a doer com o quanto que a gnt riu juntos amor",
        4: "Nossa primeira e com certeza a mais marcante viagem nossa juntos",
        5: "Aqui, a gente ja se conhecia bem mais, integração desse ano, quem diria q eu teria q lidar com algo tão estranho, não ter vc por perto todo dia. Logo eu que sempre dava um jeito de sair da aula pra ir te ver",
        6: "Gosto muito dessa foto pq da pra ver eu cuidando de vc minha princesinha linda"
    };
    
    alert(messages[photoNumber]);
    createSparkles(event.target);
}

// Função para criar brilhos
function createSparkles(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle && sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

// Função para alternar música
function toggleMusic() {
    const playBtn = document.getElementById('playBtn');
    
    if (!musicPlaying) {
        // Simular reprodução de música
        playBtn.innerHTML = '⏸️';
        musicPlaying = true;
        
        // Criar contexto de áudio (mesmo sem arquivo, para efeito visual)
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('AudioContext não suportado');
            }
        }
        
        // Animação do botão
        playBtn.style.animation = 'pulse 1s infinite';
        
        alert('🎵 Música do coração tocando! (Para adicionar música real, substitua este código por um player de áudio HTML5) 🎵');
    } else {
        playBtn.innerHTML = '▶️';
        musicPlaying = false;
        playBtn.style.animation = '';
    }
}

// Função para abrir presente
function openGift() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'flex';
    
    // Criar mais corações
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
    
    // Efeito sonoro simulado
    setTimeout(() => {
        alert('🎉 Isso que fiz não é nada perto do que você merece, dps de ler o "presente" vem me dar um abraço e olhar seus outros presentes meu amor! 💘');
    }, 500);
}

// Função para fechar presente
function closeGift() {
    const modal = document.getElementById('giftModal');
    modal.style.display = 'none';
}

// Adicionar efeitos de hover nos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Efeito nos corações flutuantes
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart')) {
            e.target.style.animation = 'none';
            e.target.style.transform = 'scale(2)';
            e.target.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                e.target.style.opacity = '0';
            }, 300);
        }
    });

    // Efeito nas fotos
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(255, 107, 157, 0.4)';
            createSparkles(this);
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
    });

    // Efeito nos itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 1)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.9)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToObserve = document.querySelectorAll('.timeline-item, .photo-frame, .love-letter');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGift();
    }
});

// Efeito de digitação na carta
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Inicializar efeitos quando a página carregar
window.addEventListener('load', function() {
    // Efeito de digitação na carta (opcional)
    const loveLetterP = document.querySelector('.love-letter p');
    if (loveLetterP) {
        const originalText = loveLetterP.textContent;
        // Descomentar a linha abaixo para ativar efeito de digitação
        // typeWriter(loveLetterP, originalText, 30);
    }

    // Criar corações iniciais
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
});

// Função para mudança de tema (modo noturno romântico)
function toggleTheme() {
    const body = document.body;
    const isNight = body.classList.contains('night-theme');
    
    if (!isNight) {
        body.classList.add('night-theme');
        body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        body.classList.remove('night-theme');
        body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
    }
}

// Adicionar botão de tema (pode ser ativado se desejado)
function addThemeToggle() {
    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = '🌙';
    themeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
        transition: all 0.3s ease;
    `;
    
    themeBtn.addEventListener('click', toggleTheme);
    themeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    themeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    // Descomentar para adicionar botão de tema
    // document.body.appendChild(themeBtn);
}

// Função para criar efeito de neve de pétalas
function createPetalSnow() {
    const petals = ['🌸', '🌺', '🌷', '🌹', '💐'];
    const petal = document.createElement('div');
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    petal.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 20 + 15}px;
        z-index: 999;
        pointer-events: none;
        animation: petalFall ${Math.random() * 3 + 4}s linear forwards;
        opacity: 0.8;
    `;
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        if (petal && petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 7000);
}

// Adicionar animação de pétalas
const petalStyle = document.createElement('style');
petalStyle.textContent = `
    @keyframes petalFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(petalStyle);

// Ativar chuva de pétalas periodicamente (opcional)
// setInterval(createPetalSnow, 2000);

// Função para adicionar mensagens surpresa ao clicar em elementos
function addSurpriseMessages() {
    const messages = [
        "Você é a razão do meu sorriso! 😊",
        "Cada dia com você é uma nova aventura! 🌟",
        "Seu amor faz meu mundo mais colorido! 🌈",
        "Você é meu sonho que se tornou realidade! ✨",
        "Amo cada detalhe seu! 💕",
        "Você é minha inspiração diária! 🌹",
        "Grateful for every moment with you! 🙏",
        "Você é meu para sempre! 💍"
    ];

    // Adicionar clique surpresa nos corações flutuantes
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart')) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Criar popup de mensagem
            const popup = document.createElement('div');
            popup.innerHTML = randomMessage;
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                padding: 20px 30px;
                border-radius: 25px;
                font-family: 'Dancing Script', cursive;
                font-size: 1.5rem;
                color: #d63384;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 2001;
                animation: popupAppear 0.5s ease-out;
                text-align: center;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(popup);
            
            setTimeout(() => {
                popup.style.animation = 'popupDisappear 0.5s ease-in forwards';
                setTimeout(() => {
                    if (popup && popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                }, 500);
            }, 2000);
        }
    });
}

// Adicionar animações de popup
const popupStyle = document.createElement('style');
popupStyle.textContent = `
    @keyframes popupAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popupDisappear {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(popupStyle);

// Inicializar mensagens surpresa
addSurpriseMessages();

// Função para criar confete
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti && confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

// Adicionar animação de confete
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Personalização final - você pode editar estas partes

// Para personalizar nomes do casal, edite aqui:
function updateCoupleNames(name1, name2) {
    const coupleElement = document.querySelector('.couple-names');
    if (coupleElement) {
        coupleElement.textContent = `${name1} & ${name2} - Para Sempre 💕`;
    }
}

// Para personalizar a carta de amor, edite aqui:
function updateLoveLetter(newContent) {
    const letterParagraphs = document.querySelectorAll('.love-letter p');
    if (letterParagraphs.length > 0 && newContent.length > 0) {
        newContent.forEach((paragraph, index) => {
            if (letterParagraphs[index]) {
                letterParagraphs[index].textContent = paragraph;
            }
        });
    }
}

// Para personalizar datas da timeline, edite aqui:
function updateTimeline(newEvents) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    newEvents.forEach((event, index) => {
        if (timelineItems[index]) {
            const dateElement = timelineItems[index].querySelector('.timeline-date');
            const descElement = timelineItems[index].querySelector('.timeline-description');
            
            if (dateElement && descElement) {
                dateElement.textContent = event.date;
                descElement.textContent = event.description;
            }
        }
    });
}

// Exemplo de uso das funções de personalização:
/*
updateCoupleNames('Seu Nome', 'Nome dela');

updateLoveLetter([
    'Sua primeira mensagem personalizada aqui...',
    'Segunda mensagem...',
    'Terceira mensagem...',
    'Assinatura final...'
]);

updateTimeline([
    { date: 'Sua Data', description: 'Sua descrição personalizada...' },
    { date: 'Outra Data', description: 'Outra descrição...' }
]);
*/

console.log('💕 Site de Dia dos Namorados carregado com sucesso! 💕');
console.log('📝 Para personalizar: edite os textos diretamente no HTML ou use as funções JavaScript fornecidas.');
console.log('🖼️ Para adicionar fotos: substitua o conteúdo dos .photo-placeholder por tags <img>');
console.log('🎵 Para adicionar música: adicione um elemento <audio> e conecte ao botão de play');