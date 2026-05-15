// 🤖 KAMBA ASSISTANT LOGIC 🧠
// A inteligência que faz o império funcionar

function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === 'block') {
        chatBox.style.display = 'none';
    } else {
        chatBox.style.display = 'block';
        // Se estiver fechado, abrir e dar olá
        if(document.getElementById('chat-log').innerText.includes("Precisas de material")) {
             addKambaMessage("Olá Chefia! 👋 Estava à tua espera! O que é que partiu hoje? 🔧");
        }
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.toLowerCase();
    const log = document.getElementById('chat-log');
    
    // Adicionar mensagem do user
    log.innerHTML += `<p><strong>Tu:</strong> ${input.value}</p>`;
    input.value = "";
    
    // Lógica da Kamba (Simples mas Eficaz)
    setTimeout(() => {
        let response = "";
        
        if (text.includes("tv") || text.includes("televisão") || text.includes("ecrã")) {
            response = "😟 Oh não! A TV avariou? Calma, Chefia! 👑<br>Já chamei os melhores!<br>🏆 <strong>João Silva</strong> (Samsung) está a 30 min de ti!<br>Queres o número dele? 👇";
        } 
        else if (text.includes("ac") || text.includes("ar condicionado") || text.includes("frio")) {
            response = "❄️ Ui, está calor aí! 🔥<br>A Kamba manda já a <strong>Maria Santos</strong> (LG Certified)!<br>Ela resolve isso num instante! 🛠️<br>Queres ligar agora?";
        }
        else if (text.includes("obrigad") || text.includes("valeu")) {
            response = "De nada, Irmão! 🫡 É para isso que a Kamba existe! 💪👑<br>Se precisares de mais alguma coisa, chia!";
        }
        else if (text.includes("preço") || text.includes("quanto")) {
            response = "💰 Os preços são justos, Chefia!<br>Materiais desde 3.000 Kz.<br>Técnicos desde 5.000 Kz.<br>Tudo transparente, sem roubos! ✅";
        }
        else {
            response = "Hmm... 🤔 Deixa-me pensar...<br>Ah já sei! Vai à aba <strong>'Encontrar Técnico'</strong> que lá estão os craques todos! 🦸‍♂️ Ou diz-me o que precisas!";
        }
        
        addKambaMessage(response);
    }, 1000);
    
    log.scrollTop = log.scrollHeight;
}

function addKambaMessage(text) {
    const log = document.getElementById('chat-log');
    log.innerHTML += `<p><strong>Kamba:</strong> ${text}</p>`;
    log.scrollTop = log.scrollHeight;
}

// Efeito de fala quando clica em comprar
function kambaSpeak(text) {
    alert("👑 KAMBA: " + text);
}
