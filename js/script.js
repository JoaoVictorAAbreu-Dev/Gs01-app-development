/* ========================================
   SPACE PREDICTIVE ANALYTICS CENTER
   Projeto Acadêmico - FIAP Application Development

   Arquivo: js/script.js
   Descrição: Lógica JavaScript para funcionalidades dinâmicas,
   manipulação DOM, tema claro/escuro e simulação de IA
   ======================================== */

// ========================================
// 1. CONSTANTES E VARIÁVEIS GLOBAIS
// ========================================

// Tema padrão
const THEME_KEY = 'spac-theme';
const DEFAULT_THEME = 'light';

// Intervalos de atualização (em milissegundos)
const UPDATE_INTERVAL = 3000;
const CLOCK_INTERVAL = 1000;

// Ranges de dados simulados para os sensores
const DATA_RANGES = {
    temperature: { min: -40, max: 50, unit: '°C' },
    energy: { min: 40, max: 100, unit: '%' },
    communication: { min: 50, max: 100, unit: 'Mbps' },
    status: { min: 70, max: 100, unit: '%' },
    sensor1: { min: -60, max: -40, unit: '°C' },
    sensor2: { min: 30, max: 60, unit: 'PSI' },
    sensor3: { min: 0.5, max: 1.5, unit: 'Sv/h' },
    sensor4: { min: 25, max: 50, unit: '%' },
    sensor5: { min: 1.5, max: 3.0, unit: 'Hz' },
    sensor6: { min: 400, max: 500, unit: 'km/s' }
};

// Mensagens de status dos sensores
const STATUS_MESSAGES = {
    excellent: 'Excelente',
    good: 'Bom',
    warning: 'Atencao',
    critical: 'Critico'
};

// Recomendações de IA
const IA_RECOMMENDATIONS = [
    'Aumentar frequencia de verificacao de sensores criticos',
    'Realizar manutencao preventiva em 7 dias',
    'Otimizar consumo energetico em 15%',
    'Calibrar sensores de temperatura',
    'Verificar integridade dos paineis solares',
    'Atualizar firmware do sistema de comunicacao',
    'Analisar padroes de radiacao solar',
    'Implementar redundancia de sensores criticos'
];

// ========================================
// 2. INICIALIZAÇÃO
// ========================================

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('SPAC iniciado');

    // Inicializa o tema
    initializeTheme();

    // Inicializa os dados
    updateAllMetrics();
    updateAllSensors();
    updateDateTime();

    // Configura intervalos de atualização automática
    setInterval(updateAllMetrics, UPDATE_INTERVAL);
    setInterval(updateAllSensors, UPDATE_INTERVAL);
    setInterval(updateDateTime, CLOCK_INTERVAL);

    // Adiciona listeners de eventos
    attachEventListeners();

    console.log('Inicializacao completa');
});

// ========================================
// 3. GERENCIAMENTO DE TEMA (Claro/Escuro)
// ========================================

/**
 * Inicializa o tema da página baseado na preferência salva
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    applyTheme(savedTheme);
}

/**
 * Aplica o tema selecionado à página
 * @param {string} theme - 'light' ou 'dark'
 */
function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector("#themeToggle .theme-icon");

    if (theme === "dark") {
        body.classList.add("dark-mode");
        if (themeIcon) {
            themeIcon.classList.remove("bi-moon-stars-fill");
            themeIcon.classList.add("bi-sun-fill");
        }
        localStorage.setItem(THEME_KEY, "dark");
    } else {
        body.classList.remove("dark-mode");
        if (themeIcon) {
            themeIcon.classList.remove("bi-sun-fill");
            themeIcon.classList.add("bi-moon-stars-fill");
        }
        localStorage.setItem(THEME_KEY, "light");
    }
}

/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// ========================================
// 4. GERAÇÃO DE DADOS ALEATÓRIOS
// ========================================

/**
 * Gera um número aleatório dentro de um range
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @param {number} decimals - Casas decimais (padrão: 2)
 * @returns {number} Número aleatório
 */
function generateRandomValue(min, max, decimals = 2) {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
}

/**
 * Determina o status baseado em um percentual
 * @param {number} value - Valor de 0 a 100
 * @returns {object} Objeto com status e cor
 */
function getStatusFromValue(value) {
    if (value >= 90) return { status: 'excellent', color: '#00cc88' };
    if (value >= 75) return { status: 'good', color: '#ffaa00' };
    if (value >= 50) return { status: 'warning', color: '#ff6b35' };
    return { status: 'critical', color: '#ff3333' };
}

// ========================================
// 5. ATUALIZAÇÃO DE MÉTRICAS DO DASHBOARD
// ========================================

/**
 * Atualiza todas as métricas do dashboard
 */
function updateAllMetrics() {
    updateMetric('temperature', 'temp');
    updateMetric('energy', 'energy');
    updateMetric('communication', 'comm');
    updateMetric('status', 'status');
}

/**
 * Atualiza uma métrica específica
 * @param {string} metricType - Tipo de métrica
 * @param {string} prefix - Prefixo dos IDs dos elementos
 */
function updateMetric(metricType, prefix) {
    const range = DATA_RANGES[metricType];
    const value = generateRandomValue(range.min, range.max);

    // Calcula percentual para barra de progresso
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;

    // Determina status
    const status = getStatusFromValue(percentage);
    const statusText = STATUS_MESSAGES[status.status];

    // Atualiza elementos DOM
    const valueElement = document.getElementById(`${prefix}Value`);
    const progressElement = document.getElementById(`${prefix}Progress`);
    const statusElement = document.getElementById(`${prefix}Status`);

    if (valueElement) {
        valueElement.textContent = `${value}`;
        valueElement.style.color = status.color;
    }

    if (progressElement) {
        progressElement.style.width = `${Math.min(percentage, 100)}%`;
    }

    if (statusElement) {
        statusElement.textContent = statusText;
        statusElement.style.color = status.color;
    }
}

// ========================================
// 6. ATUALIZAÇÃO DE SENSORES
// ========================================

/**
 * Atualiza todos os sensores
 */
function updateAllSensors() {
    for (let i = 1; i <= 6; i++) {
        updateSensor(i);
    }
}

/**
 * Atualiza um sensor específico
 * @param {number} sensorNumber - Número do sensor (1-6)
 */
function updateSensor(sensorNumber) {
    const sensorKey = `sensor${sensorNumber}`;
    const range = DATA_RANGES[sensorKey];
    const value = generateRandomValue(range.min, range.max);

    // Calcula percentual para barra visual
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;

    // Atualiza valor
    const valueElement = document.getElementById(`sensor${sensorNumber}`);
    if (valueElement) {
        valueElement.textContent = `${value} ${range.unit}`;
    }

    // Atualiza barra de progresso
    const barElement = document.getElementById(`sensorBar${sensorNumber}`);
    if (barElement) {
        barElement.style.width = `${percentage}%`;
    }
}

// ========================================
// 7. ATUALIZAÇÃO DE DATA E HORA
// ========================================

/**
 * Atualiza a data e hora no footer e header
 */
function updateDateTime() {
    const now = new Date();

    // Formata data
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateString = now.toLocaleDateString('pt-BR', options);

    // Formata hora
    const timeString = now.toLocaleTimeString('pt-BR');

    // Atualiza footer
    const footerDate = document.getElementById('footerDate');
    const footerTime = document.getElementById('footerTime');
    const lastUpdate = document.getElementById('lastUpdate');

    if (footerDate) footerDate.textContent = dateString;
    if (footerTime) footerTime.textContent = timeString;
    if (lastUpdate) {
        lastUpdate.textContent = `Última atualização: ${timeString}`;
    }
}

// ========================================
// 8. GERENCIAMENTO DE FORMULÁRIO
// ========================================

/**
 * Submete o formulário e exibe mensagem de feedback
 */
function handleFormSubmit(event) {
    event.preventDefault();

    // Obtém dados do formulário
    const form = document.getElementById('reportForm');
    const formData = new FormData(form);

    // Validações adicionais
    const engineerName = formData.get('engineerName').trim();
    const engineerEmail = formData.get('engineerEmail').trim();
    const description = formData.get('description').trim();

    if (!engineerName || !engineerEmail || !description) {
        showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Valida email
    if (!isValidEmail(engineerEmail)) {
        showFormMessage('Por favor, insira um email válido.', 'error');
        return;
    }

    // Simula envio
    const submitBtn = document.getElementById('submitBtn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
        // Simula sucesso
        showFormMessage(
            `Relatorio enviado com sucesso!\nPor: ${engineerName} (${engineerEmail})`,
            'success'
        );

        // Reseta formulário
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;

        console.log('Formulario enviado:', {
            engineerName,
            engineerEmail,
            reportType: formData.get('reportType'),
            priority: formData.get('priority'),
            description,
            recommendation: formData.get('recommendation')
        });
    }, 1500);
}

/**
 * Exibe mensagem de feedback do formulário
 * @param {string} message - Mensagem a exibir
 * @param {string} type - 'success' ou 'error'
 */
function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';

    // Remove mensagem após 5 segundos
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

/**
 * Valida se uma string é um email válido
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Reseta o formulário
 */
function handleFormReset() {
    document.getElementById('formMessage').style.display = 'none';
    console.log('Formulario resetado');
}

// ========================================
// 9. SIMULAÇÃO DE ANÁLISE POR IA
// ========================================

/**
 * Executa análise simulada de IA
 */
function performAIAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const iaStatus = document.getElementById('iaStatus');
    const recommendationsList = document.getElementById('recommendationsList');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceText = document.getElementById('confidenceText');

    // Desabilita botão
    analyzeBtn.disabled = true;
    const originalContent = analyzeBtn.innerHTML;
    analyzeBtn.textContent = 'Analisando...';

    // Atualiza status
    iaStatus.textContent = 'Processando dados com rede neural...';

    // Simula processamento
    setTimeout(() => {
        // Gera confiança aleatória (70-99%)
        const confidence = generateRandomValue(70, 99, 0);

        // Gera recomendações aleatórias
        const numRecommendations = generateRandomValue(3, 5, 0);
        const selectedRecommendations = [];

        while (selectedRecommendations.length < numRecommendations) {
            const randomIndex = Math.floor(Math.random() * IA_RECOMMENDATIONS.length);
            const rec = IA_RECOMMENDATIONS[randomIndex];
            if (!selectedRecommendations.includes(rec)) {
                selectedRecommendations.push(rec);
            }
        }

        // Atualiza UI
        iaStatus.textContent = `Analise concluida com ${confidence}% de confianca`;

        // Exibe recomendações
        recommendationsList.innerHTML = selectedRecommendations.map(rec => `
            <div class="recommendation-item">
                <span class="rec-icon"><i class="bi bi-lightbulb" aria-hidden="true"></i></span>
                <p>${rec}</p>
            </div>
        `).join('');

        // Atualiza barra de confiança
        confidenceFill.style.width = `${confidence}%`;
        confidenceText.textContent = `${confidence}%`;

        // Reabilita botão
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = originalContent;

        console.log(`Analise IA concluida - Confianca: ${confidence}%`);
    }, 2000);
}

// ========================================
// 10. ATUALIZAÇÃO DE DADOS MANUAL
// ========================================

/**
 * Atualiza todos os dados manualmente
 */
function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    const originalContent = refreshBtn.innerHTML;

    // Desabilita botão
    refreshBtn.disabled = true;
    refreshBtn.textContent = 'Atualizando...';

    // Atualiza dados
    updateAllMetrics();
    updateAllSensors();
    updateDateTime();

    // Simula delay
    setTimeout(() => {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = originalContent;
        console.log('Dados atualizados manualmente');
    }, 500);
}

// ========================================
// 11. SCROLL SUAVE
// ========================================

/**
 * Implementa scroll suave para links de navegação
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignora navegação interna do formulário
            if (this.href === '#') return;

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// 12. ANEXAR EVENT LISTENERS
// ========================================

/**
 * Anexa todos os event listeners necessários
 */
function attachEventListeners() {
    // Tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Formulário
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleFormSubmit);
        reportForm.addEventListener('reset', handleFormReset);
    }

    // Botão de análise IA
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', performAIAnalysis);
    }

    // Botão de atualizar dados
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }

    // Scroll suave
    setupSmoothScroll();
    setupActiveNavSection();

    console.log('Event listeners configurados');
}

/**
 * Destaca o link da seção atual no menu
 */
function setupActiveNavSection() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], aside[id]');

    if (!navLinks.length || !sections.length) return;

    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            rootMargin: '-30% 0px -55% 0px',
            threshold: 0.15
        }
    );

    sections.forEach((section) => observer.observe(section));
}

// ========================================
// 13. FUNÇÕES DE UTILIDADE
// ========================================

/**
 * Log customizado para debugging
 * @param {string} message - Mensagem
 * @param {string} type - 'log', 'warn', 'error'
 */
function log(message, type = 'log') {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.log(`[${timestamp}] ${message}`);
}

/**
 * Valida se um elemento existe no DOM
 * @param {string} elementId - ID do elemento
 * @returns {boolean}
 */
function elementExists(elementId) {
    return document.getElementById(elementId) !== null;
}

// ========================================
// 14. LISTENERS PARA MUDANÇAS DE TAMANHO DE TELA
// ========================================

/**
 * Detecta mudanças no tamanho da tela
 */
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width < 480) {
        console.log('Modo: Mobile');
    } else if (width < 768) {
        console.log('Modo: Tablet');
    } else {
        console.log('Modo: Desktop');
    }
});

// ========================================
// 15. PERFORMANCE E OTIMIZAÇÕES
// ========================================

/**
 * Monitora performance da página
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Pagina carregada em ${loadTime}ms`);
    });
}

// ========================================
// FIM DO ARQUIVO JAVASCRIPT
// ======================================== */


