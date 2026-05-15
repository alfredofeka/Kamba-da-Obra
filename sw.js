// ==========================================
// 🤖 KAMBA DA OBRA — SERVICE WORKER
// O cérebro que faz o Império funcionar OFFLINE!
// ==========================================

const CACHE_NAME = 'kamba-imperio-v2';
const OFFLINE_URL = '/index.html';

// 📦 Ficheiros que a Kamba guarda para sempre (cache permanente)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/tecnicos.html',
  '/servicos.html',
  '/fornecedores.html',
  '/contactos.html',
  '/sobre-nos.html',
  '/denuncias.html',
  '/admin.html',
  '/kamba-assistant.js',
  '/kamba-avatar.svg'
];

// 🚀 INSTALAÇÃO — Guarda tudo no cache
self.addEventListener('install', (event) => {
  console.log('🤖 KAMBA: A instalar o Império...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 KAMBA: Cache preenchido com ' + PRECACHE_ASSETS.length + ' ficheiros!');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// ⚡ ACTIVAÇÃO — Limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('👑 KAMBA: Império ACTIVO! Versão 2 online!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ KAMBA: A limpar cache antigo: ' + cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 🌐 FETCH — Intercepta TUDO e serve do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // ✅ Se está no cache → devolve! (OFFLINE FRIENDLY!)
        if (cachedResponse) {
          return cachedResponse;
        }

        // 🌐 Se não está → vai buscar à rede
        return fetch(event.request)
          .then((networkResponse) => {
            // 💾 Guarda nova resposta no cache para a próxima vez
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // 📴 Se NÃO há rede E NÃO há cache → devolve a página principal
            return caches.match(OFFLINE_URL);
          });
      })
  );
});

// 🔔 NOTIFICAÇÕES (opcional — podes ativar depois)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/index.html')
  );
});

console.log('🤖 KAMBA SW: Service Worker carregado! O Império nunca para! 👑');
