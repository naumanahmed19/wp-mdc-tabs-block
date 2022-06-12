<?php
/**
 * Plugin Name:       WP MDC Tabs Block
 * Description:       Material design based wordpress guttenborg tabs block 
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mdc-tabs
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * 
 */
function create_block_todo_list_block_init() {
	register_block_type( __DIR__ . '/build/tabs' );
	register_block_type( __DIR__ . '/build/tab' );
}
add_action( 'init', 'create_block_todo_list_block_init' );

/**
 * Frontend assets
 * 
 */

function wp_block_tabs_front_end_assets() {

	wp_enqueue_script( 'material-components-web', 'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js', null, null, true );
	wp_enqueue_style( 'material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', null, null, true );

	wp_enqueue_script( 'wp-mcw-tabs-block', plugin_dir_url( __FILE__ ) . 'main.js' );
}
add_action( 'enqueue_block_assets', 'wp_block_tabs_front_end_assets' );
