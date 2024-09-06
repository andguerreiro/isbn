const CACHE_NAME = 'isbn-scanner-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',  // Altere para o nome do seu arquivo HTML
  '/logo.png',     // Altere para o caminho correto do seu ícone
  // Adicione outros arquivos que você deseja armazenar em cache
];

// Instala o Service Worker e faz o cache dos arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta requisições e retorna do cache se disponível
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});