<?php
/* 
* Path: src/blocks/slider/render.php
* Slider block template file
* 
*/

$block_attributes = $block->attributes;
$slider_id = isset($block_attributes['sliderId']) ? $block_attributes['sliderId'] : 'slider-1';
$slideCount = isset($block_attributes['slideCount']) ? $block_attributes['slideCount'] : 0;
$currentSlide = isset($block_attributes['current']) ? $block_attributes['current'] : 0;
$slideInterval = isset($block_attributes['slideInterval']) ? $block_attributes['slideInterval'] : 5000;
$inner_blocks_html = '';
foreach ($block->inner_blocks as $inner_block) {
  $inner_blocks_html .= $inner_block->render();
}
$slider_attributes = [
  'id' => $slider_id,
  'current' => $currentSlide,
  'data-interval' => $slideInterval,
  'slide-count' => $slideCount
];
?>

<?php echo sprintf(
  '<div %s>%s</div>',
  get_block_wrapper_attributes($slider_attributes),
  $inner_blocks_html
); ?>