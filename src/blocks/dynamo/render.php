<?php

$is_dynamo = $attributes['isDynamo'];
$slides = $attributes['slides'];
// $inner_blocks = $block->parsed_block->innerBlocks;

$inner_blocks_html = '';
foreach ($block->inner_blocks as $inner_block) {
  $inner_blocks_html .= $inner_block->render();
}

// add_filter('render_block', function ($block_content, $block) {
//   if ($block['blockName'] === 'dynamo/dynamo') {
//     // $block_content = str_replace('<div class="wp-block-dynamo-dynamo">', '<div class="wp-block-dynamo-dynamo" data-dynamo="true">', $block_content);
//     $block_content = 'Bingo! Dynamo block loaded!';
//   }
//   return $block_content;
// }, 10, 2);

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
  <?php
  // Check how many inner blocks are available
  // $item_count = $block_class->inner_blocks->count();
  // if ($item_count < 1) {
  //   return '';
  // } else {
  //   echo ($block_class->inner_blocks);
  // }

  // Check if the Dynamo block has innerBlocks
  // if ($inner_blocks) {
  //   echo ('Dynamo block has innerBlocks \n </br>');
  //   var_dump($block->parsed_block);
  // } else {
  //   echo ('Dynamo block has no innerBlocks \n </br>');
  //   var_dump($block->parsed_block);
  // }

  echo ($inner_blocks_html);

  if ($is_dynamo) {
    // var_dump($slides);
  ?>
    <h2 class="dynamo">Dynamo block loaded</h2>
    <?php foreach ($slides as $slide) { ?>
      <div class="slide">
        <img src="<?php echo $slide['image'] ?>" alt="<?php echo $slide['title'] ?>">
        <h3><?php echo $slide['title'] ?></h3>
        <p><?php echo $slide['content'] ?></p>
      </div>
    <?php } ?>
  <?php
  } else {
    echo ('Get our Dynamo in here!!!');
    echo ($slides);
  }
  ?>