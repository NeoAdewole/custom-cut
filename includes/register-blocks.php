<?php

function customcut_register_blocks()
{
  $blocks = [
    ['name' => 'slider', 'options' => ['render_callback' => 'customcut_slider_render_cb']],
    ['name' => 'slide'],
  ];

  foreach ($blocks as $block) {
    register_block_type(
      CUSTOMCUT__BLOCK_DIR . '/build/blocks/' . $block['name'],
      isset($block['options']) ? $block['options'] : []
    );
  }
}
