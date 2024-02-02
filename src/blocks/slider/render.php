<?php
/* 
* Path: src/blocks/slider/render.php
* Slider block template file
* 
*/

// slideId: '01', title: 'Slide 1', content: 'Slide 1 content', image: 'https://picsum.photos/200/300'

$slides = isset($attributes['slides']) ? $attributes['slides'] : [];
$slider_id = isset($attributes['sliderId']) ? $attributes['sliderId'] : 'slider-1';
$inner_blocks_html = '';
foreach ($block->inner_blocks as $inner_block) {
  $inner_blocks_html .= $inner_block->render();
}


// get slides from the innerblock attributes
$slide_count = $block->inner_blocks->count();
// var_dump($slides);
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
  <?php
  echo ($inner_blocks_html);
  foreach ($slides as $index => $slide) { ?>
    <div id="<?php echo $slide['slideId'] ?>" class="slide_<?php echo $index + 1 ?>">
      <img src="<?php echo $slide['image'] ?>" alt='<?php echo $slide['title'] ?>' />
      <h3><?= $slide['title'] ?></h3>
      <p><?php echo $slide['content'] ?></p>
    </div>
  <?php } ?>
</div>