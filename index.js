const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
    res.write('FunGuard is moving!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: 'fundom.playserver.pro',
        port: 41059,
        username: 'FunGuard', 
        version: '1.21.11'
    });

    bot.on('spawn', () => {
        console.log("Naka-pasok na si FunGuard at magsisimulang gumalaw!");

        setInterval(() => {
            // 1. TALON MUNA
            bot.setControlState('jump', true);
            
            // 2. BITAW SA TALON pagkatapos ng 500ms
            setTimeout(() => {
                bot.setControlState('jump', false);
                
                // 3. PAGKABABA, MAG-CROUCH NAMAN (sneak)
                setTimeout(() => {
                    bot.setControlState('sneak', true);
                    
                    // 4. TAYO ULIT pagkatapos ng 1 segundo
                    setTimeout(() => {
                        bot.setControlState('sneak', false);
                    }, 1000);
                }, 500); 

            }, 500);

            // Chat para hindi mag-hibernate ang server
            bot.chat("FunDom 24/7 System Active. Checking connection..."); 

        }, 20000); // Ginawa nating bawat 20 seconds ang galaw para mas kitang-kita mo
    });

    bot.on('error', (err) => console.log("Error: " + err.code));

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10s.");
        setTimeout(startBot, 10000);
    });
}

startBot();
