<?php

function customcut_debug_info()
{
  echo 'Block-debug: ' . CUSTOMCUT__BLOCK_DIR;
  echo '</br>';
  echo 'Default template directory: ' . get_template_directory();
  echo '</br>';
  echo 'CUSTOMCUT__THEME_DIR: ' . CUSTOMCUT__THEME_DIR;
  echo '</br>';
  echo 'Current directory: ' . __DIR__;
}
// add_action('init', 'customcut_debug_info');
