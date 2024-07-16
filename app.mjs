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
		module.exports = Object.assign({}, Find)
	} else {

		globalNS.Find = Find;
	}

} )( globalObject )
