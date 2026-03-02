<?php

function customcut_register_assets()
{
  // use for scripts and styles scoped to just the block editor scoped 
  // Note: CUSTOMCUT__BLOCK_DIR is a filesystem path, not a URL.
  // This file isn't currently hooked/enqueued, but keep paths correct.
  $editorAssets = include(CUSTOMCUT__BLOCK_DIR . '/build/index.asset.php');

  PRINT_R($editorAssets);

  wp_register_script(
    'customcut-editor',
    get_theme_file_uri('/build/index.js'),
    $editorAssets['dependencies'] ?? [],
    $editorAssets['version'] ?? null
  );

  wp_register_style(
    'customcut-editor',
    get_theme_file_uri('/build/index.css'),
    [],
    $editorAssets['version'] ?? null
  );
}
