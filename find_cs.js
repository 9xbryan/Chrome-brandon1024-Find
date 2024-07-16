'use strict';

function initialize( browser ) {

}
( async function ( browser ) {
	globalThis.Find = await import( browser.runtime.getURL( "./app.mjs" ) );
	const entityhandler = await import( browser.runtime.getURL( "./lib/html-entity-handler/entityhandler.js" ) );
	Object.assign( globalThis, entityhandler );
	await import( browser.runtime.getURL( "./content/content.js" ) );
	await import( browser.runtime.getURL( "./content/parser.js" ) );
	await import( browser.runtime.getURL( "./content/highlighter.js" ) );

	initialize( browser );

} )( globalThis.browser || chrome )
