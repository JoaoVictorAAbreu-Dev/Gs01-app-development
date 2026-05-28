# Space Predictive Analytics Center (SPAC)

## 1. Contexto
Este repositório contém uma aplicação web acadêmica para monitoramento simulado de missão espacial, desenvolvida para a disciplina de Application Development (FIAP). O sistema apresenta telemetria em tempo real simulada, painel de sensores, formulário técnico e módulo de análise preditiva simulada, com foco em organização de código front-end e experiência de uso.

## 2. Objetivo
Disponibilizar uma interface responsiva e semanticamente estruturada para:
- Visualização contínua de indicadores operacionais.
- Acompanhamento de sensores com atualização periódica.
- Registro de relatórios técnicos com validação client-side.
- Simulação de recomendações automatizadas de análise.

## 3. Escopo Técnico
- Stack: HTML5, CSS3, JavaScript (Vanilla).
- Sem uso de frameworks front-end.
- Sem backend e sem persistência remota.
- Compatível com execução local em navegador moderno.

## 4. Arquitetura de Arquivos
```text
2026-1-application-development/
├── assets/
│   └── logo.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── integrantes.txt
└── README.md
```

## 5. Estrutura Funcional
### 5.1 Dashboard de Monitoramento
- Exibição de temperatura, energia, comunicação e status operacional.
- Barras de progresso com atualização automática.
- Atualização manual por ação do usuário.

### 5.2 Monitoramento de Sensores
- Seis sensores simulados com faixas de leitura distintas.
- Indicadores visuais de atividade e variação por barra.

### 5.3 Formulário Técnico
- Campos obrigatórios com validação de preenchimento.
- Validação de e-mail no cliente.
- Mensageria de sucesso/erro em interface.

### 5.4 Análise Inteligente Simulada
- Processamento assíncrono simulado.
- Geração de recomendações textuais.
- Indicador de confiança percentual.

### 5.5 Tema e Navegação
- Alternância de tema claro/escuro com persistência em `localStorage`.
- Navegação interna por âncoras com scroll suave.
- Destaque automático da seção ativa no menu.

## 6. Padrões e Boas Práticas Aplicadas
- HTML semântico (`header`, `main`, `section`, `article`, `aside`, `footer`).
- CSS com variáveis (`:root`) para padronização de tema e manutenção.
- Organização modular de responsabilidades por arquivo.
- Acessibilidade básica: `aria-label`, foco visível e contraste funcional.
- Interface com ícones vetoriais via Bootstrap Icons (CDN).

## 7. Execução
### 7.1 Requisitos
- Navegador atualizado (Chrome, Edge, Firefox ou Safari).

### 7.2 Passos
1. Abra o arquivo `index.html` diretamente no navegador.
2. Interaja com os módulos de dashboard, sensores, formulário e análise.

Observação: não há dependência de servidor local para funcionamento.

## 8. Dados Simulados
As métricas são geradas dinamicamente por intervalos predefinidos no arquivo `js/script.js`, representando comportamento operacional plausível para cenário de monitoramento espacial acadêmico.

## 9. Limitações Conhecidas
- Não há integração com API externa.
- Não há persistência de relatórios em banco de dados.
- O módulo de IA é estritamente simulado para fins didáticos.

## 10. Evoluções Recomendadas
- Inclusão de backend REST para armazenamento de relatórios.
- Integração com fonte real de telemetria.
- Testes automatizados de interface e regras de validação.
- Pipeline CI para validação contínua de qualidade.

## 11. Vídeo de Demonstração

🎥 Assista ao vídeo de apresentação do projeto:

[Ver vídeo no YouTube](https://youtu.be/zVY7RyqIEHI?si=00_6nIrkODvlfrva)

## 12. Integrantes
- João Victor Alves de Abreu - RM: 564946
- Luiz Henrique Barbosa Dias - RM: 562399

## 13. Licença e Uso
Projeto de caráter acadêmico, destinado a estudo, demonstração técnica e avaliação educacional.
