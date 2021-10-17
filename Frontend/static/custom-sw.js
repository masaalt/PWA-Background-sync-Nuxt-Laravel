importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
	new RegExp('/.*\/articles\/.*/,'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'articles',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000
			}),
			new workbox.cacheableResponse.Plugin({
				statuses: [200]
			})
		]
	})
);

const networkFirstHandler = new workbox.strategies.NetworkFirst({
	cacheName: 'dynamic',
	plugins: [
		new workbox.expiration.Plugin({
			maxEntries: 500
		}),
		new workbox.cacheableResponse.Plugin({
			statuses: [200]
		})
	]
});

const FALLBACK_URL = workbox.precaching.getCacheKeyForURL('/offline.html');
const matcher = ({ event }) => event.request.mode === 'navigate';
const handler = args =>
	networkFirstHandler
		.handle(args)
		.then(response => response || caches.match(FALLBACK_URL))
		.catch(() => caches.match(FALLBACK_URL));

workbox.routing.registerRoute(matcher, handler);

const showNotification = () => {
	self.registration.showNotification('Background sync success!', {
	  body: '🎉`🎉`🎉`'
	});
  };
  
const bgSyncPlugin = new workbox.backgroundSync.Plugin(
	'dashboardr-queue',
	{
		callbacks: {
		  queueDidReplay: showNotification
		  // other types of callbacks could go here
		},
		
	  });

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
	/\/articles/,
  networkWithBackgroundSync,
  'POST'
);
