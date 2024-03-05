<?php
/* 
* Path: src/blocks/slider/render.php
* Slider block template file
* 
*/

$slider_id = isset($attributes['sliderId']) ? $attributes['sliderId'] : 'slider-1';
$slideCount = isset($attributes['slideCount']) ? $attributes['slideCount'] : 0;
$currentSlide = isset($attributes['current']) ? $attributes['current'] : 0;
$slideInterval = isset($attributes['slideinterval']) ? $attributes['slideinterval'] : 5000;
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