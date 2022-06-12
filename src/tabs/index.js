/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
 import { registerBlockType } from '@wordpress/blocks';

 /**
  * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
  * All files containing `style` keyword are bundled together. The code used
  * gets applied both to the front of your site and to the editor.
  *
  * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
  */
 import './style.scss';
 
 /**
  * Internal dependencies
  */
 import Edit from './edit';
 import save from './save';
 import metadata from './block.json';
 
 import { MDCTabBar } from '@material/tab-bar';

 
 // Importing code libraries for this block
 import { __ } from '@wordpress/i18n';
 import { RichText } from '@wordpress/block-editor';
 import { Button } from '@wordpress/components';
 
 /**
  * Every block starts by registering a new block type definition.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
  */
 registerBlockType( metadata.name, {
     /**
      * @see ./edit.js
      */
     edit: Edit,
     /**
      * @see ./save.js
      */
     save,
 } );



//  window.onload = function() {
//     console.log('testing..., bar',document.querySelector('.mdc-tab-bar'))

//     var tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
//     console.log('tabbar',tabBar)

//     var contentEls = document.querySelectorAll('.brand-tab-screen');
//     contentEls[0].classList.add('brand-tab-screen--active');
//     tabBar.listen('MDCTabBar:activated', function(event) {
//     // Hide currently-active content
//     document.querySelector('.brand-tab-screen--active').classList.remove('brand-tab-screen--active');
//     // Show content for newly-activated tab
//     contentEls[event.detail.index].classList.add('brand-tab-screen--active');
//     });
//  } ;
