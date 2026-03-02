<?php

function customcut_register_blocks()
{
  $blocks = [
    ['name' => 'slide'],   // register before slider so it's available for InnerBlocks
    ['name' => 'slider'],
    ['name' => 'control'],
    ['name' => 'dynamo'],
  ];

  foreach ($blocks as $block) {
    register_block_type(
      get_theme_file_path() . '/build/blocks/' . $block['name'] . '/block.json',
      isset($block['options']) ? $block['options'] : []
    );
  }
}
add_action('init', 'customcut_register_blocks');
