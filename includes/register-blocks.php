<?php

function customcut_register_blocks()
{
  $blocks = [
    ['name' => 'slide'],   // register before slider so it's available for InnerBlocks
    ['name' => 'slider'],
    // ['name' => 'slider', 'options' => ['render_callback' => 'customcut_slider_render_cb']],
    ['name' => 'dynamo'],
  ];

  foreach ($blocks as $block) {
    register_block_type(
      CUSTOMCUT__BLOCK_DIR . '/build/blocks/' . $block['name'],
      isset($block['options']) ? $block['options'] : []
    );
  }
}
add_action('init', 'customcut_register_blocks');
