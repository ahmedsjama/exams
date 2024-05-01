export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.80116f2f.js","app":"_app/immutable/entry/app.17137de5.js","imports":["_app/immutable/entry/start.80116f2f.js","_app/immutable/chunks/scheduler.56f0b95c.js","_app/immutable/chunks/singletons.dcb18b4e.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.17137de5.js","_app/immutable/chunks/scheduler.56f0b95c.js","_app/immutable/chunks/index.231d6169.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
