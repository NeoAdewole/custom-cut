<?php
/*
Plugin Name: Trax
Description: Small plugin included in theme to load tracking scripts
Version: 1.0
Author: Niyi Adewole
Author URI: https://clearcutcomms.ca
Plugin URI: https://clearcutcomms.ca
*/

  // Setup
  define( 'PLUGS', __FILE__ );

  // function traxJS() {
  //   wp_enqueue_script(
  //     'custom_trax',
  //     get_stylesheet_directory_uri() . '/assets/tags.js'
  //   );
  // }
  // add_action( 'wp_enqueue_scripts',  'traxJS' );

  function custom_cut_metadata() {
    // add fb verification meta
  ?>
    <meta name="facebook-domain-verification" content="6mfd7kvlnyzzqkp41gbz853woswor2" />    
  <?php
    }
  add_action('wp_head', 'custom_cut_metadata');

  // add_action( 'wp_enqueue_scripts', 'prefix_add_my_stylesheet' );

  // function prefix_add_my_stylesheet() {
  //   wp_register_style( 'prefix-style', plugins_url( '/css/your-stylesheet.css', __FILE__ ) );
  //   wp_enqueue_style( 'prefix-style' );
  // }

?>