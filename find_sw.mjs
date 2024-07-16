
// import * as Find from "./app.mjs";
// import * as ACTIONPROXY from "./background/browser-action-proxy.js";
// import * as CONTENTPROXY from "./background/content-proxy.js";
// import * as BACKGROUND from "./background/background.js";
// import * as OMNI from "./background/omni.js";





// 'use strict';

// (async function initialize(browser) {

// 	// // const [APP, ACTIONPROXY, CONTENTPROXY, BACKGROUND, OMNI] = [
// 	// // 	await import( "app.js"),
// 	// // 	await import("/background/browser-action-proxy.js"),
// 	// // 	await import( "/background/content-proxy.js"),
// 	// // 	await import( "/background/background.js"),
// 	// // 	await import( "/background/omni.js" )
// 	// // ]
// 	// // console.log( `done importing files`, [ APP, ACTIONPROXY, CONTENTPROXY, BACKGROUND, OMNI ] )

// 	// const myHtml = `<div>Ciao<span>amico</span>come <b id="foo">va?</b></div>`;
// 	// // await browser.offscreen.createDocument( {
// 	// // 	url: 'osd.html',
// 	// // 	justification: 'ignored',
// 	// // 	reasons: [ 'dom_scraping' ]
// 	// // } );
// 	// let hd = await browser.offscreen.hasDocument();
// 	// if ( hd ) {
// 	// 	let reply = await browser.runtime.sendMessage( { 'html': myHtml } );
// 	// 	await browser.offscreen.closeDocument();
// 	// 	console.log( reply )
// 	// }

// })(globalThis.browser || chrome);

'use strict';
function check( it ) {
	// Math is known to exist as a global in every environment.
	return it && it.Math === Math && it;
}

const globalObject =
	check( typeof globalThis === "object" && globalThis ) ||
	check( typeof window === "object" && window ) ||
	check( typeof self === "object" && self ) ||
	check( typeof global === "object" && global ) ||//global is for NodeJS
	// This returns undefined when running in strict mode
	( function () {
		return this;
	} )() ||
	Function( "return this" )();

( async function initialize( globalNS ) {
	/**
 * Micro-framework specifically built for the find+ browser extension.
 *
 * This design was inspired from Stoyan Stefanov's nested namespace pattern outlined in
 * his book JavaScript Patterns.
 * */

	// const self = {};

	// const browserId = ( () => {
	// 	if ( typeof globalThis.browser !== 'undefined' ) {
	// 		return 'Firefox';
	// 	} else {
	// 		return 'Chrome';
	// 	}
	// } )();

	// const browser = ( () => {
	// 	return typeof chrome === 'undefined' ? browser : chrome;
	// } )();

	// const incognito = ( () => {
	// 	return browser.extension.inIncognitoContext;
	// } )();

	// /**
	//  * This callback function is used to initialize the namespace.
	//  * @callback registerCallback
	//  * @param {object} self - Object used to create public functions and variables.
	//  * */

	// /**
	//  * Register a new namespace, and initialize it using a callback function.
	//  *
	//  * The callback function is invoked with the new namespace as an argument. This argument
	//  * must be used in the callback to initialize the namespace.
	//  *
	//  * Once the namespace is initialized using the callback function, if the namespace contains
	//  * an init() function, it will be invoked once the DOM is ready. This avoids the need to use
	//  * win.onload or attach win load event listeners manually. As such, the init function may be used
	//  * to safely register all DOM component listeners and start or initialize the application.
	//  *
	//  * Intermediate namespaces are created if necessary. For example, the namespace 'Popup.Storage.'
	//  * would allow you to reference this namespace through Find.Popup.Storage.
	//  *
	//  * @param {string} path - The namespace path.
	//  * @param {registerCallback} callback - A function that initializes the namespace.
	//  * @return the namespace
	//  * */
	// function register( path, callback ) {
	// 	let pathKeys = path.split( '.' );
	// 	let parent = self;

	// 	for ( let keyIndex = 0; keyIndex < pathKeys.length; keyIndex++ ) {
	// 		let key = pathKeys[ keyIndex ];
	// 		if ( typeof parent[ key ] === 'undefined' ) {
	// 			parent[ key ] = {};
	// 		}

	// 		parent = parent[ key ];
	// 	}

	// 	callback( parent );
	// 	if ( parent && isFunction( parent.init ) ) {
	// 		if ( document.readyState === 'complete' ) {
	// 			parent.init();
	// 		} else {
	// 			win.addEventListener( 'load', () => {
	// 				parent.init();
	// 			}, { once: true } );
	// 		}
	// 	}

	// 	// console.log(JSON.stringify(parent, null, 4))

	// 	return parent;
	// };

	// /**
	//  * Retrieve a given namespace using a string path.
	//  *
	//  * @param {string} path - The namespace path.
	//  * @return the namespace.
	//  * */
	// function getContext( path ) {
	// 	let pathKeys = path.split( '.' );
	// 	let parent = self;

	// 	for ( let keyIndex = 0; keyIndex < pathKeys.length; keyIndex++ ) {
	// 		let key = pathKeys[ keyIndex ];
	// 		if ( typeof parent[ key ] === 'undefined' ) {
	// 			return undefined;
	// 		}

	// 		parent = parent[ key ];
	// 	}

	// 	return parent;
	// };

	// /**
	//  * Determine if a given object is an invokable function.
	//  *
	//  * @private
	//  * @param {object} obj - The object in question
	//  * @return boolean true if the object is a function, false otherwise
	//  * */
	// function isFunction( obj ) {
	// 	return !!( obj && obj.constructor && obj.call && obj.apply );
	// }

	const Find = ( function () {
		const self = {};

		self.browserId = ( () => {
			if ( typeof globalNS.browser !== 'undefined' ) {
				return 'Firefox';
			} else {
				return 'Chrome';
			}
		} )();

		self.browser = ( () => {
			return typeof chrome === 'undefined' ? browser : chrome;
		} )();

		self.incognito = ( () => {
			return self.browser.extension.inIncognitoContext;
		} )();

		/**
		 * This callback function is used to initialize the namespace.
		 * @callback registerCallback
		 * @param {object} self - Object used to create public functions and variables.
		 * */

		/**
		 * Register a new namespace, and initialize it using a callback function.
		 *
		 * The callback function is invoked with the new namespace as an argument. This argument
		 * must be used in the callback to initialize the namespace.
		 *
		 * Once the namespace is initialized using the callback function, if the namespace contains
		 * an init() function, it will be invoked once the DOM is ready. This avoids the need to use
		 * globalNS.onload or attach globalNS load event listeners manually. As such, the init function may be used
		 * to safely register all DOM component listeners and start or initialize the application.
		 *
		 * Intermediate namespaces are created if necessary. For example, the namespace 'Popup.Storage.'
		 * would allow you to reference this namespace through Find.Popup.Storage.
		 *
		 * @param {string} path - The namespace path.
		 * @param {registerCallback} callback - A function that initializes the namespace.
		 * @return the namespace
		 * */
		self.register = function ( path, callback ) {
			let pathKeys = path.split( '.' );
			let parent = self;

			for ( let keyIndex = 0; keyIndex < pathKeys.length; keyIndex++ ) {
				let key = pathKeys[ keyIndex ];
				if ( typeof parent[ key ] === 'undefined' ) {
					parent[ key ] = {};
				}

				parent = parent[ key ];
			}

			callback( parent );
			if ( parent && isFunction( parent.init ) ) {
				if ( document.readyState === 'complete' ) {
					parent.init();
				} else {
					globalNS.addEventListener( 'load', () => {
						parent.init();
					}, { once: true } );
				}
			}

			return parent;
		};

		/**
		 * Retrieve a given namespace using a string path.
		 *
		 * @param {string} path - The namespace path.
		 * @return the namespace.
		 * */
		self.getContext = function ( path ) {
			let pathKeys = path.split( '.' );
			let parent = self;

			for ( let keyIndex = 0; keyIndex < pathKeys.length; keyIndex++ ) {
				let key = pathKeys[ keyIndex ];
				if ( typeof parent[ key ] === 'undefined' ) {
					return undefined;
				}

				parent = parent[ key ];
			}

			return parent;
		};

		/**
		 * Determine if a given object is an invokable function.
		 *
		 * @private
		 * @param {object} obj - The object in question
		 * @return boolean true if the object is a function, false otherwise
		 * */
		function isFunction( obj ) {
			return !!( obj && obj.constructor && obj.call && obj.apply );
		}

		return self;
	} )();

	// Check if we're in a module environment
	if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
		// Export as an ES module
		// console.log(JSON.stringify({...Find}, null,4));
		const toExport = {}
		module.exports = Object.assign( {}, Find )
	} else {

		globalNS.Find = Find;
	}

} )( globalObject )


'use strict';

/**
 * Create the Background ContentProxy namespace. Serves as mediator between the background scripts
 * and the browser action popup.
 * */
Find.register( "Background.BrowserActionProxy", function () {

	/**
	 * Initialize the port connection with the browser action popup.
	 * */
	Find.browser.runtime.onConnect.addListener( ( browserActionPort ) => {
		if ( browserActionPort.name !== 'popup_to_background_port' ) {
			return;
		}

		if ( Find.Background.installationDetails ) {
			browserActionPort.postMessage( { action: 'install', details: Find.Background.installationDetails } );
			Find.Background.installationDetails = null;
		}

		let activeTab = null;
		Find.browser.tabs.query( { active: true, currentWindow: true }, ( tabs ) => {
			activeTab = tabs[ 0 ];

			// invoke action on message from popup script
			browserActionPort.onMessage.addListener( ( message ) => {
				actionDispatch( message, activeTab, ( resp ) => {
					browserActionPort.postMessage( resp );
				} );
			} );

			// handle extension close
			browserActionPort.onDisconnect.addListener( () => {
				if ( !Find.Background.options || !Find.Background.options.persistent_highlights ) {
					Find.Background.restorePageState( activeTab );
				} else {
					Find.Background.restorePageState( activeTab, false );
				}

				activeTab = null;
			} );
		} );
	} );

	/**
	 * Dispatcher for calls for action by the browser action popup.
	 * Invokes the appropriate function in the Background based on the
	 * message.action field.
	 *
	 * @param {object} message - The message received from the popup
	 * @param {object} tab - Information about the active tab in the current window
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	function actionDispatch( message, tab, sendResponse ) {
		let action = message.action;
		switch ( action ) {
			case 'update':
				Find.Background.updateSearch( message, tab, sendResponse );
				break;
			case 'next':
				Find.Background.seekSearch( message, true, tab, sendResponse );
				break;
			case 'previous':
				Find.Background.seekSearch( message, false, tab, sendResponse );
				break;
			case 'replace_next':
				Find.Background.replaceNext( message, tab, sendResponse );
				break;
			case 'replace_all':
				Find.Background.replaceAll( message, tab, sendResponse );
				break;
			case 'follow_link':
				Find.Background.followLinkUnderFocus( message, tab, sendResponse );
				break;
			case 'browser_action_init':
				Find.Background.initializeBrowserAction( message, tab, sendResponse );
				break;
			case 'get_occurrence':
				Find.Background.extractOccurrences( message, tab, sendResponse );
				break;
		}
	}
} );


'use strict';

/**
 * Create the Background ContentProxy namespace. Serves as mediator between the content
 * in the web page and the background scripts.
 * */
Find.register( "Background.ContentProxy", function ( self ) {

	/**
	 * Request from a given page a representation of the text nodes in the page's document.
	 *
	 * @param {object} tab - The tab to which the request will be made.
	 * @param {function} callback - The callback function that will utilize the document object model.
	 * @param {function} [error] - Callback function for handing an error.
	 * */
	self.buildDocumentRepresentation = function ( tab, callback, error ) {
		Find.browser.tabs.sendMessage( tab.id, { action: 'init' }, ( response ) => {
			if ( response && response.model ) {
				callback( response.model );
			} else if ( error ) {
				error();
			}
		} );
	};

	/**
	 * Restore the page by removing reference markup to next nodes in the page. Highlight marking will not be removed.
	 *
	 * @param {object} tab - The tab from which all markup will be removed.
	 * @param {array} nodeReferences - Array of node reference UUIDs.
	 * @param {function} [callback] - Callback invoked when the page is restored.
	 * */
	self.restoreWebPage = function ( tab, nodeReferences, callback ) {
		Find.browser.tabs.sendMessage( tab.id, {
			action: 'restore',
			uuids: nodeReferences
		}, callback );
	};

	/**
	 * Update the highlights in the page once the search query or options change.
	 *
	 * @param {object} tab - The tab that will be updated
	 * @param {string} regex - The regular expression or query
	 * @param {number} index - The index of the first occurrence
	 * @param {object} occurrenceMap - A special object that maps occurrences of the regex to individual text nodes.
	 * @param {object} options - The search options
	 * @param {function} [callback] - Callback invoked when the page highlights are updated.
	 * */
	self.updatePageHighlights = function ( tab, regex, index, occurrenceMap, options, callback ) {
		Find.browser.tabs.sendMessage( tab.id, {
			action: 'update',
			occurrenceMap: occurrenceMap,
			index: index,
			regex: regex,
			options: options
		}, callback );
	};

	/**
	 * Seek the search forward or backward.
	 *
	 * @param {object} tab - The tab that will be updated
	 * @param {number} index - The index of the occurrence to seek to
	 * @param {object} options - The search options
	 * @param {function} [callback] - Callback invoked when complete.
	 * */
	self.seekHighlight = function ( tab, index, options, callback ) {
		Find.browser.tabs.sendMessage( tab.id, {
			action: 'seek',
			index: index,
			options: options
		}, callback );
	};

	/**
	 * Remove all highlights from the page.
	 *
	 * @param {object} tab - The tab from which to remove all highlights
	 * @param {function} [callback] - Callback invoked when the highlights are removed from the page.
	 * */
	self.clearPageHighlights = function ( tab, callback ) {
		Find.browser.tabs.sendMessage( tab.id, { action: 'highlight_restore' }, callback );
	};

	/**
	 * Replace a single occurrence of the regular expression with a given piece of text in the page.
	 *
	 * @param {object} tab - The tab that will be updated
	 * @param {number} index - The specific index of the occurrence that will be replaced
	 * @param {string} replaceWith - The text that will replace the occurrence of the regex
	 * @param {object} options - The search options
	 * @param {function} [callback] - Callback invoked when the occurrence is replaced.
	 * */
	self.replaceOccurrence = function ( tab, index, replaceWith, options, callback ) {
		Find.browser.tabs.sendMessage( tab.id, {
			action: 'replace',
			index: index,
			replaceWith: replaceWith,
			options: options
		}, callback );
	};

	/**
	 * Replace all occurrences of the regular expression with a given piece of text in the page.
	 *
	 * @param {object} tab - The tab that will be updated
	 * @param {string} replaceWith - The text that will replace each occurrence of the regex
	 * @param {object} options - The search options
	 * @param {function} [callback] - Callback invoked when the occurrences are replaced.
	 * */
	self.replaceAllOccurrences = function ( tab, replaceWith, options, callback ) {
		Find.browser.tabs.sendMessage( tab.id, {
			action: 'replace_all',
			replaceWith: replaceWith,
			options: options
		}, callback );
	};

	/**
	 * Follow the link in the page at the current index.
	 *
	 * @param {object} tab - The tab with the search
	 * @param {function} [callback] - Callback invoked once the operation is complete.
	 * */
	self.followLinkUnderFocus = function ( tab, callback ) {
		Find.browser.tabs.sendMessage( tab.id, { action: 'follow_link' }, callback );
	};

	/**
	 * Send a fetch message to the given tab to ensure that it responds. A successful response
	 * indicates that the content scripts were loaded successfully.
	 *
	 * @param {object} tab - The tab to fetch.
	 * @param {function} callback - Callback invoked once the operation is complete.
	 * */
	self.fetch = function ( tab, callback ) {
		Find.browser.tabs.sendMessage( tab.id, { action: 'fetch' }, callback );
	};

	/**
	 * Execute a given script in a specific tab.
	 *
	 * @param {object} tab - The tab with the search.
	 * @param {object} details - Details of the script to run. Either the code or the file property must be set, but
	 * both may not be set at the same time.
	 * @param {function} [callback] - Callback invoked once the operation is complete.
	 * */
	self.executeScript = function ( tab, details, callback ) {
		if ( Find.browser.tabs.executeScript ) Find.browser.tabs.executeScript( tab.id, details, callback );
		else {

			Find.browser.scripting.executeScript( convertV2ToV3ExecuteScriptDetails(tab, details) ).then(callback)
		}
	};
} );
function convertV2ToV3ExecuteScriptDetails(tab,details) {
	const { allFrames, code, file, frameId, matchAboutBlank, runAt } = details;
	const toExecute = {
		target: { tabId: tab.id },
		world: 'MAIN', //default is "ISOLATED"
		injectImmediately: true,
	}
	if ( frameId ) {
		toExecute.target.frameIds = [ frameId ];
	} else {
		toExecute.target.allFrames = allFrames
	}
	if ( code ) {
		toExecute.func = function wrapper() {
			return console.log('cant inject code in manifest V3', ...arguments);
		}
		toExecute.args = [code];
	} else if (file) {
		toExecute.files = [file];
		Find.browser.scripting.registerContentScripts([
			{id: 'injectedFile' + file,
				matches: ['<all_urls>'],
				js: [file]
			}
		]);//allows scripts to be unregistered at a later time.
	}

	//Old V2 version: missing args, injectImmediately
	return toExecute;
}
'use strict';

/**
 * Create the Background namespace. The background coordinates activities between the browser
 * action popup and the content in the web page. The background keeps track of the state of the
 * search, along with other necessary data to seek, replace, and perform other actions efficiently.
 * */
Find.register( "Background", function ( self ) {

	/**
	 * Allocated on the namespace to allow the BrowserActionProxy to communicate installation
	 * details to the browser action popup if the extension was recently installed or updated.
	 * */
	self.installationDetails = null;
	self.options = null;

	let documentRepresentation = null;
	let regexOccurrenceMap = null;
	let index = null;

	Find.browser.contextMenus.removeAll( () => {
		Find.browser.contextMenus.create( {
			title: "Show Help",
			contexts: [ "browser_action" ],
			id: 'show-help'
		} );

		Find.browser.contextMenus.onClicked.addListener( ( info ) => {
			if ( info.menuItemId === 'show-help' ) {
				Find.browser.tabs.create( { url: Find.browser.extension.getURL( "docs/index.html" ) } );
			}
		} );
	} );

	/**
	 * Inject content scripts into pages once installed (not performed automatically in Chrome).
	 */
	Find.browser.runtime.onInstalled.addListener( ( installation ) => {
		self.installationDetails = installation;

		if ( Find.browserId !== 'Firefox' ) {
			let scripts = Find.browser.runtime.getManifest().content_scripts[ 0 ].js;
			Find.browser.tabs.query( {}, ( tabs ) => {
				for ( let tabIndex = 0; tabIndex < tabs.length; tabIndex++ ) {
					let url = tabs[ tabIndex ].url;
					if ( url.match( /chrome:\/\/.*/ ) || url.match( /https:\/\/chrome.google.com\/webstore\/.*/ ) ) {
						continue;
					}

					for ( let i = 0; i < scripts.length; i++ ) {
						Find.Background.ContentProxy.executeScript( tabs[ tabIndex ], { file: scripts[ i ] } );
					}
				}
			} );
		}

		if ( installation.reason === 'install' ) {
			Find.browser.tabs.create( { url: Find.browser.extension.getURL( "docs/index.html" ) } );
		}
	} );

	/**
	 * Initialize the browser action. Fetches the web page to ensure that the content scripts
	 * have been properly injected. If the content script responds, the selected text is retrieved
	 * from the page and included in the response to the popup.
	 *
	 * If the content script still has state variables, such as the index and regex of the last search,
	 * this information is used to initialize the extension.
	 *
	 * @param {object} message - The message containing the details about the action.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.initializeBrowserAction = function ( message, tab, sendResponse ) {
		let resp = {};
		resp.activeTab = tab;

		Find.Background.ContentProxy.fetch( tab, ( response ) => {
			resp.isReachable = response && response.success;
			if ( resp.isReachable ) {
				resp.selectedText = response.selection;
				resp.regex = response.regex;
				resp.iframes = response.iframes;
				index = response.index || 0;
			}

			sendResponse( { action: 'browser_action_init', response: resp } );
		} );
	};

	/**
	 * Initialize the extension by constructing the page document representation.
	 *
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} callback - Optional callback .
	 * */
	self.initializePage = function ( tab, callback ) {
		Find.Background.ContentProxy.buildDocumentRepresentation( tab, ( model ) => {
			documentRepresentation = model;

			if ( callback ) {
				callback();
			}
		} );
	};

	/**
	 * Remove any highlights and markup from the active tab in the current window. Also resets
	 * any state variables, such as the current index, document representation and occurrence map.
	 *
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {boolean} [restoreHighlights] - If undefined or true, remove highlights. If false,
	 * highlights are not removed, and are persisted in the page.
	 * */
	self.restorePageState = function ( tab, restoreHighlights ) {
		if ( restoreHighlights === undefined || restoreHighlights ) {
			Find.Background.ContentProxy.clearPageHighlights( tab );
		}

		let uuids = getUUIDsFromModelObject( documentRepresentation );
		Find.Background.ContentProxy.restoreWebPage( tab, uuids );

		documentRepresentation = null;
		regexOccurrenceMap = null;
		index = null;
	};

	/**
	 * Update the search when the search query or search options change. Builds a new occurrence map from the
	 * documentRepresentation object, highlight the occurrence in the page, and send the indices
	 * to the browser action popup through the sendResponse function.
	 *
	 * If the background has not been initialized properly (documentRepresentation is null), simply returns.
	 *
	 * If the regex is invalid, removes all highlights from the page and sends appropriate response
	 * to the popup.
	 *
	 * @param {object} message - The message containing the details about the search, including the search
	 * options and search query.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.updateSearch = function ( message, tab, sendResponse ) {
		try {
			if ( !documentRepresentation ) {
				self.initializePage( tab, () => {
					self.updateSearch( message, tab, sendResponse );
				} );

				return;
			}

			self.options = message.options;
			let regex = message.regex;

			//If searching by string, escape all regex metacharacters
			if ( !self.options.find_by_regex ) {
				regex = regex.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&' );
			}

			//Ensure non-empty search
			if ( regex.length === 0 ) {
				sendResponse( { action: 'empty_regex' } );
				Find.Background.ContentProxy.clearPageHighlights( tab );
				return;
			}

			//Build occurrence map, reposition index if necessary
			regexOccurrenceMap = buildOccurrenceMap( documentRepresentation, regex, self.options );
			if ( index > regexOccurrenceMap.length - 1 ) {
				if ( regexOccurrenceMap.length !== 0 ) {
					index = regexOccurrenceMap.length - 1;
				} else {
					index = 0;
				}
			}

			if ( self.options.max_results !== 0 && index >= self.options.max_results ) {
				index = self.options.max_results - 1;
			}

			//Invoke update action
			Find.Background.ContentProxy.updatePageHighlights( tab, regex, index, regexOccurrenceMap, self.options );

			//If occurrence map empty, viewable index is zero
			let viewableIndex = index + 1;
			if ( regexOccurrenceMap.length === 0 ) {
				viewableIndex = 0;
			}

			//if occurrence map larger than max results, viewable total is max results
			let viewableTotal = regexOccurrenceMap.length;
			if ( self.options.max_results !== 0 && self.options.max_results <= regexOccurrenceMap.length ) {
				viewableTotal = self.options.max_results;
			}

			sendResponse( {
				action: 'index_update',
				index: viewableIndex,
				total: viewableTotal
			} );
		} catch ( e ) {
			sendResponse( { action: 'invalid_regex', error: e.message } );
			Find.Background.ContentProxy.clearPageHighlights( tab );
		}
	};

	/**
	 * Move forward or backward the current search index, and respond to the popup
	 * the new search index.
	 *
	 * @param {object} message - The message containing the details about the search options.
	 * @param {boolean} seekForward - Specifies whether to seek forward or backward.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.seekSearch = function ( message, seekForward, tab, sendResponse ) {
		self.options = message.options;
		let indexCap = self.options.max_results !== 0;

		//If reached end, reset index
		if ( seekForward ) {
			index = computeSubsequentIndex( index, regexOccurrenceMap, self.options );
		} else {
			index = computePrecedingIndex( index, regexOccurrenceMap, self.options );
		}

		//Invoke seek action
		Find.Background.ContentProxy.seekHighlight( tab, index, self.options );

		let viewableIndex = regexOccurrenceMap.length === 0 ? 0 : index + 1;
		let viewableTotal = ( indexCap && self.options.max_results <= regexOccurrenceMap.length ) ?
			self.options.max_results : regexOccurrenceMap.length;
		sendResponse( {
			action: 'index_update',
			index: viewableIndex,
			total: viewableTotal
		} );
	};

	/**
	 * Replace the occurrence of the search query with a given replacement string, and invalidate the search
	 * state.
	 *
	 * @param {object} message - The message containing the details about the action, including the index to
	 * replace, the replacement string, and the search options.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.replaceNext = function ( message, tab, sendResponse ) {
		Find.Background.ContentProxy.replaceOccurrence( tab, message.index - 1, message.replaceWith, message.options );

		//Restore Web Page
		Find.Background.ContentProxy.clearPageHighlights( tab );

		let uuids = getUUIDsFromModelObject( documentRepresentation );
		Find.Background.ContentProxy.restoreWebPage( tab, uuids, () => {
			//Rebuild documentRepresentation and invalidate
			Find.Background.ContentProxy.buildDocumentRepresentation( tab, ( model ) => {
				documentRepresentation = model;
				sendResponse( { action: 'invalidate' } );
			} );
		} );
	};

	/**
	 * Replace all occurrences of the search query with a given replacement string, and invalidate the search
	 * state.
	 *
	 * @param {object} message - The message containing the details about the action, the replacement string,
	 * and the search options.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.replaceAll = function ( message, tab, sendResponse ) {
		Find.Background.ContentProxy.replaceAllOccurrences( tab, message.replaceWith, message.options );

		//Restore Web Page
		Find.Background.ContentProxy.clearPageHighlights( tab );

		let uuids = getUUIDsFromModelObject( documentRepresentation );
		Find.Background.ContentProxy.restoreWebPage( tab, uuids, () => {
			//Rebuild documentRepresentation and invalidate
			Find.Background.ContentProxy.buildDocumentRepresentation( tab, ( model ) => {
				documentRepresentation = model;
				sendResponse( { action: 'invalidate' } );
			} );
		} );
	};

	/**
	 * Follow the link at the current occurrence index in the page.
	 *
	 * @param {object} message - The message containing the details about the action.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.followLinkUnderFocus = function ( message, tab, sendResponse ) {
		Find.Background.ContentProxy.followLinkUnderFocus( tab );
		sendResponse( { action: 'close' } );
	};

	/**
	 * Extract from the regex occurrence map the current or all occurrences of the search query
	 * and respond to the popup. Used to allow the occurrences to be copied to the clipboard.
	 *
	 * If the cardinality is 'all', a line feed separated string of occurrences is returned.
	 * Otherwise, only the current occurrence is returned.
	 *
	 * @param {object} message - The message containing the details about the action.
	 * @param {object} tab - Information about the active tab in the current window.
	 * @param {function} sendResponse - Function used to issue a response back to the popup.
	 * */
	self.extractOccurrences = function ( message, tab, sendResponse ) {
		let cardinality = message.options.cardinality;
		let resp;

		if ( cardinality === 'all' ) {
			let occurrences = [];
			for ( let occIndex = 0; occIndex < regexOccurrenceMap.length; occIndex++ ) {
				occurrences.push( regexOccurrenceMap.occurrenceIndexMap[ occIndex ].occurrence );
			}

			resp = occurrences.join( '\n' );
		} else {
			resp = regexOccurrenceMap.occurrenceIndexMap[ index ].occurrence;
		}

		sendResponse( { action: 'get_occurrence', response: resp } );
	};

	/**
	 * Construct an occurrence map object from a document representation and regular expression.
	 * The occurrence map is used to map occurrences of a given regex to nodes in the DOM.
	 *
	 * The occurrence map will have the following format:
	 * {
	 *     occurrenceIndexMap: {
	 *          1: {
	 *              groupIndex: _index to the parent group of this occurrence_,
	 *              subIndex: _the occurrence subindex of the parent group_,
	 *              occurrence: _the matched text_
	 *          }, ...
	 *     },
	 *     length: _number of occurrences of the regex_,
	 *     groups: _number of occurrence groups_,
	 *     1: {
	 *         uuids: [...],
	 *         count: _number of matches in this group_,
	 *         preformated: _whether or not the text node in the DOM is preformatted_
	 *     }, ...
	 * }
	 *
	 * @private
	 * @param {object} documentRepresentation - The representation of the page's DOM
	 * @param {string} regex - A regular expression
	 * @param {object} options - Options used to alter the creation of the occurrence map.
	 * @return {object} occurrence map
	 * */
	function buildOccurrenceMap( documentRepresentation, regex, options ) {
		let occurrenceMap = { occurrenceIndexMap: {}, length: null, groups: null };
		let count = 0;
		let groupIndex = 0;

		regex = regex.replace( / /g, '\\s' );
		regex = ( options.match_case ) ? new RegExp( regex, 'gm' ) : new RegExp( regex, 'gmi' );

		//Loop over all text nodes in documentRepresentation
		for ( let key in documentRepresentation ) {
			let textNodes = documentRepresentation[ key ].group, preformatted = documentRepresentation[ key ].preformatted;
			let textGroup = '';
			let uuids = [];
			for ( let nodeIndex = 0; nodeIndex < textNodes.length; nodeIndex++ ) {
				textGroup += textNodes[ nodeIndex ].text;
				uuids.push( textNodes[ nodeIndex ].elementUUID );
			}

			let matches = textGroup.match( regex );
			if ( !matches ) {
				continue;
			}

			count += matches.length;
			occurrenceMap[ groupIndex ] = {
				uuids: uuids,
				count: matches.length,
				preformatted: preformatted
			};

			for ( let matchesIndex = 0; matchesIndex < matches.length; matchesIndex++ ) {
				let occMapIndex = matchesIndex + ( count - matches.length );
				occurrenceMap.occurrenceIndexMap[ occMapIndex ] = { groupIndex: groupIndex, subIndex: matchesIndex, occurrence: matches[ matchesIndex ] };
			}

			groupIndex++;

			//If reached maxIndex, exit
			if ( options.max_results !== 0 && count >= options.max_results ) {
				break;
			}
		}

		occurrenceMap.length = count;
		occurrenceMap.groups = groupIndex;
		return occurrenceMap;
	}

	/**
	 * Increment the given index, wrapping back to zero if reached end of occurrence map or index cap.
	 *
	 * @private
	 * @param {number} index - The current index
	 * @param {object} regexOccurrenceMap - The occurrence map object
	 * @param {object} options - The search options
	 * @return {number} the new index
	 * */
	function computeSubsequentIndex( index, regexOccurrenceMap, options ) {
		//If reached end, reset index
		let indexCap = self.options.max_results !== 0;
		if ( index >= regexOccurrenceMap.length - 1 || ( indexCap && index >= options.max_results - 1 ) ) {
			return 0;
		}

		return index + 1;
	}

	/**
	 * Decrement the given index, wrapping back to the end if reached zero.
	 *
	 * @private
	 * @param {number} index - The current index
	 * @param {object} regexOccurrenceMap - The occurrence map object
	 * @param {object} options - The search options
	 * @return {number} the new index
	 * */
	function computePrecedingIndex( index, regexOccurrenceMap, options ) {
		//If reached start, set index to last occurrence
		let indexCap = self.options.max_results !== 0;
		if ( index <= 0 ) {
			if ( indexCap && options.max_results <= regexOccurrenceMap.length ) {
				return options.max_results - 1;
			}

			return regexOccurrenceMap.length - 1;
		} else {
			return index - 1;
		}
	}

	/**
	 * Extract UUIDs from the document representation object.
	 *
	 * @private
	 * @param {object} documentRepresentation - The document representation object
	 * @return {array} a list of UUIDs
	 * */
	function getUUIDsFromModelObject( documentRepresentation ) {
		let uuids = [];

		for ( let key in documentRepresentation ) {
			let textNodes = documentRepresentation[ key ].group;
			for ( let index = 0; index < textNodes.length; index++ ) {
				uuids.push( textNodes[ index ].elementUUID );
			}
		}

		return uuids;
	}
} );

'use strict';

/**
 * Create the Background Omni namespace. Registers various event listeners which invoke
 * the appropriate background functions.
 * */
Find.register( "Background.Omni", function ( self ) {

	Find.browser.omnibox.onInputStarted.addListener( () => {
		Find.browser.tabs.query( { active: true, currentWindow: true }, ( tabs ) => {
			Find.Background.initializePage( tabs[ 0 ] );
		} );
	} );

	retrieveOptions( ( options ) => {
		Find.browser.omnibox.onInputChanged.addListener( ( regex ) => {
			Find.browser.tabs.query( { active: true, currentWindow: true }, ( tabs ) => {
				Find.Background.updateSearch( { regex: regex, options: options }, tabs[ 0 ], ( result ) => {
					let description;
					if ( !regex ) {
						description = 'Enter a regular expression';
					} else if ( result.action === 'index_update' ) {
						description = `${ result.total } matches found`;
					} else if ( result.action === 'invalid_regex' ) {
						description = result.error;
					}

					Find.browser.omnibox.setDefaultSuggestion( { description: description } );
				} );
			} );
		} );
	} );

	Find.browser.omnibox.onInputCancelled.addListener( () => {
		Find.browser.tabs.query( { active: true, currentWindow: true }, ( tabs ) => {
			Find.Background.restorePageState( tabs[ 0 ] );
		} );
	} );

	Find.browser.omnibox.onInputEntered.addListener( () => {
		Find.browser.tabs.query( { active: true, currentWindow: true }, ( tabs ) => {
			Find.Background.restorePageState( tabs[ 0 ], false );
		} );
	} );

	/**
	 * Default options. This object and all of it's properties are immutable.
	 * To use this object, it must be cloned into a mutable object.
	 *
	 * To clone this object:
	 * let mutableOptions = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
	 * */
	const DEFAULT_OPTIONS = Object.freeze( {
		find_by_regex: true,
		match_case: true,
		persistent_highlights: false,
		persistent_storage_incognito: false,
		hide_options_button: false,
		hide_saved_expressions_button: false,
		hide_clipboard_button: true,
		hide_find_replace_button: true,
		max_results: 0,
		index_highlight_color: Object.freeze( {
			hue: 34,
			saturation: 0.925,
			value: 1,
			hexColor: '#ff9813'
		} ),
		all_highlight_color: Object.freeze( {
			hue: 56,
			saturation: 1,
			value: 1,
			hexColor: '#fff000'
		} )
	} );

	/**
	 * Retrieve the search options from the browser local storage, and pass
	 * to the callback function. The data from the storage is passed as a single
	 * argument to the callback function.
	 *
	 * @param {function} callback - The callback function to handle the data.
	 * @return {object} The search options, or null if it does not exist or cannot be retrieved.
	 * */
	function retrieveOptions( callback ) {
		Find.browser.storage.local.get( 'options', ( data ) => {
			let options = data[ 'options' ];
			if ( !options ) {
				return callback( JSON.parse( JSON.stringify( DEFAULT_OPTIONS ) ) );
			}

			callback( options );
		} );
	}
} );
