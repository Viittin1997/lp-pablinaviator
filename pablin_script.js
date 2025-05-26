// Variável global para o intervalo de progresso
let progressInterval;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dataLayer para GTM
    window.dataLayer = window.dataLayer || [];
    
    // Funções para o loading overlay
    // Mostrar o loading overlay imediatamente ao carregar a página
    progressInterval = showLoadingOverlay();
    
    // Iniciar o contador de pessoas entrando
    updatePeopleCounter();
    
    // Iniciar o temporizador para redirecionamento automático após 5 segundos
    console.log('Iniciando temporizador para redirecionamento automático...');
    setTimeout(autoRedirect, 5000); // 5000 ms = 5 segundos
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hover effects for feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add touch events for mobile
        box.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        }, { passive: true });
        
        box.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, { passive: true });
    });
    
    // Hover effects for benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add touch events for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.05)';
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = '';
            }
        }, { passive: true });
    });
    
    // Pulse effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        // Add pulse animation
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        }, 3000);
        
        // Rastrear cliques nos botões e enviar dados para o n8n antes de redirecionar
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir o comportamento padrão do link
            
            // URL de destino do Telegram
            const telegramUrl = this.getAttribute('href');
            
            // Rastrear evento de clique no Facebook Pixel (Lead)
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: 'Pablin Aviator - Grupo de Lives',
                    content_category: 'Telegram Subscription'
                });
            }
            
            // Obter todos os parâmetros da URL de uma vez
            const params = getAllUrlParameters();
            
            // Dados para enviar ao n8n
            const data = {
                expert: 'pablinaviator'
            };
            
            // Adicionar todos os parâmetros da URL ao objeto data
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    data[key] = params[key];
                    console.log(`Adicionando parâmetro ao objeto de dados: ${key}=${params[key]}`);
                }
            }
            
            console.log('Dados para enviar ao n8n:', data);
            
            // Endpoint do n8n
            const n8nEndpoint = 'https://whkn8n.meumenu2023.uk/webhook/fbclid-landingpage';
            
            // Enviar dados para o n8n via POST
            const jsonData = JSON.stringify(data);
            console.log('JSON a ser enviado:', jsonData);
            
            // Função para tentar novamente o envio em caso de falha
            const sendData = () => {
                fetch(n8nEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=UTF-8',
                    },
                    body: jsonData,
                    mode: 'no-cors'
                })
                .then(response => {
                    console.log('Resposta do servidor recebida');
                    // Redirecionar para o Telegram após o envio dos dados
                    window.location.href = telegramUrl;
                })
                .catch(error => {
                    console.error('Erro ao enviar dados:', error);
                    // Em caso de erro, redirecionar mesmo assim
                    window.location.href = telegramUrl;
                });
            };
            
            // Tentar enviar os dados
            sendData();
        });
    });
    
    // Add animation to icons
    const icons = document.querySelectorAll('.feature-icon, .benefit-icon');
    icons.forEach(icon => {
        icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
    });
    
    // Add floating animation to icons
    const allIcons = document.querySelectorAll('.feature-icon, .benefit-icon');
    allIcons.forEach((icon, index) => {
        // Add a slight delay to each icon for a staggered effect
        const delay = index * 0.2;
        icon.style.animation = `float 3s ease-in-out ${delay}s infinite`;
    });
    
    // Check if it's a mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // Add touch events for mobile
    if (isMobile) {
        const touchElements = document.querySelectorAll('.feature-box, .benefit-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }
});

// Função para obter todos os parâmetros da URL de uma vez
function getAllUrlParameters() {
    const params = {};
    
    try {
        // Obter a string de consulta da URL
        const queryString = window.location.search.substring(1);
        
        // Log para depuração
        console.log('Query string completa:', queryString);
        
        if (queryString) {
            // Dividir a string de consulta em pares de chave=valor
            const pairs = queryString.split('&');
            
            // Log para depuração
            console.log('Número de parâmetros encontrados:', pairs.length);
            
            // Processar cada par
            for (let i = 0; i < pairs.length; i++) {
                try {
                    // Dividir o par em chave e valor
                    const pair = pairs[i].split('=');
                    
                    // Decodificar a chave
                    const key = decodeURIComponent(pair[0]);
                    
                    // Decodificar o valor (se existir)
                    const value = pair.length > 1 ? decodeURIComponent(pair[1].replace(/\+/g, ' ')) : '';
                    
                    // Adicionar ao objeto de parâmetros
                    params[key] = value;
                    
                    // Log para depuração
                    console.log(`Parâmetro capturado: ${key} = ${value}`);
                } catch (pairError) {
                    console.error('Erro ao processar par de parâmetros:', pairs[i], pairError);
                }
            }
        }
    } catch (error) {
        console.error('Erro ao processar parâmetros da URL:', error);
    }
    
    // Verificar se algum parâmetro UTM está presente
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'lp'];
    let utmFound = false;
    
    utmParams.forEach(param => {
        if (params[param]) {
            console.log(`Parâmetro ${param} encontrado: ${params[param]}`);
            utmFound = true;
        }
    });
    
    if (!utmFound) {
        console.warn('Nenhum parâmetro UTM ou fbclid encontrado na URL');
    }
    
    // Log final com todos os parâmetros
    console.log('Todos os parâmetros capturados:', JSON.stringify(params));
    
    return params;
}

// Create particle effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        particleContainer.appendChild(particle);
    }
}

// Create particle effect
createParticles();

// Função para mostrar o loading overlay
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('loadingProgressBar');
    
    if (overlay && progressBar) {
        // Mostrar o overlay
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        overlay.classList.add('active');
        
        // Animar a barra de progresso
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 50); // 5 segundos total (50ms * 100 = 5000ms)
        
        return interval;
    }
    return null;
}

// Função para atualizar o contador de pessoas entrando
function updatePeopleCounter() {
    const peopleCountElement = document.getElementById('peopleCount');
    if (!peopleCountElement) return;
    
    // Valor inicial
    let count = 48;
    peopleCountElement.textContent = count;
    
    // Atualizar o contador a cada 2-5 segundos
    setInterval(() => {
        // Adicionar ou remover 1-3 pessoas aleatoriamente
        const change = Math.floor(Math.random() * 3) + 1;
        const isAdding = Math.random() > 0.3; // 70% de chance de adicionar
        
        if (isAdding) {
            count += change;
        } else {
            count = Math.max(30, count - change); // Nunca abaixo de 30
        }
        
        // Limitar o máximo a 60 pessoas
        count = Math.min(60, count);
        
        // Atualizar o texto
        peopleCountElement.textContent = count;
        
        // Efeito de destaque
        peopleCountElement.classList.add('highlight');
        setTimeout(() => {
            peopleCountElement.classList.remove('highlight');
        }, 500);
        
    }, Math.floor(Math.random() * 3000) + 2000); // Entre 2 e 5 segundos
}

// Função de redirecionamento automático
function autoRedirect() {
    // URL de destino do Telegram
    const telegramUrl = 'https://t.me/+JhVqCplD3Qg5N2Ux';
    
    // Rastrear evento de clique no Facebook Pixel (Lead)
    if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
            content_name: 'PABLIN AVIATOR - Grupo VIP',
            content_category: 'Telegram Subscription'
        });
    }
    
    // Obter todos os parâmetros da URL de uma vez
    const params = getAllUrlParameters();
    
    // Dados para enviar ao n8n
    const data = {
        expert: 'pablinaviator'
    };
    
    // Adicionar todos os parâmetros da URL ao objeto data
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            data[key] = params[key];
            console.log(`Adicionando parâmetro ao objeto de dados: ${key}=${params[key]}`);
        }
    }
    
    console.log('Dados para enviar ao n8n:', data);
    
    // Endpoint do n8n
    const n8nEndpoint = 'https://whkn8n.meumenu2023.uk/webhook/fbclid-landingpage';
    
    // Enviar dados para o n8n via POST
    // Converter para string JSON e registrar no console para depuração
    const jsonData = JSON.stringify(data);
    console.log('JSON a ser enviado:', jsonData);
    
    // Enviar dados para o webhook
    fetch(n8nEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: jsonData,
        mode: 'no-cors'
    })
    .then(response => {
        console.log('Resposta do servidor recebida');
        // Garantir que a barra de progresso esteja completa antes de redirecionar
        const progressBar = document.getElementById('loadingProgressBar');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Limpar o intervalo se ainda estiver ativo
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        // Pequeno delay para garantir que o usuário veja o loading completo
        setTimeout(() => {
            // Redirecionar para o Telegram após o envio dos dados
            window.location.href = telegramUrl;
        }, 500);
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        
        // Limpar o intervalo se ainda estiver ativo
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        // Garantir que a barra de progresso esteja completa antes de redirecionar
        const progressBar = document.getElementById('loadingProgressBar');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Pequeno delay para garantir que o usuário veja o loading completo
        setTimeout(() => {
            // Em caso de erro, redirecionar mesmo assim
            window.location.href = telegramUrl;
        }, 500);
    });
}

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(204, 0, 0, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(204, 0, 0, 0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.particle-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}

.particle {
    position: absolute;
    background-color: rgba(204, 0, 0, 0.5);
    border-radius: 50%;
    pointer-events: none;
}

.touch-active {
    transform: translateY(-5px) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}
</style>
`);
