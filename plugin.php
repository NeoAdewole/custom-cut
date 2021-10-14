<?php
/*
Plugin Name: Trax
Description: Small plugin included in theme to load tracking scripts
Version: 1.0
Author: Niyi Adewole
Author URI: https://clearcutcomms.ca
Plugin URI: https://clearcutcomms.ca
*/

  function traxJS() {
    wp_enqueue_script(
      'custom_script',
      plugins_url( '/assets/tags.js', __FILE__ ),
      array( 'jquery' )
    );
  }
  add_action( 'wp_enqueue_scripts',  'traxJS' );

  // add_action( 'wp_enqueue_scripts', 'prefix_add_my_stylesheet' );

  // function prefix_add_my_stylesheet() {
  //   wp_register_style( 'prefix-style', plugins_url( '/css/your-stylesheet.css', __FILE__ ) );
  //   wp_enqueue_style( 'prefix-style' );
  // }

?>