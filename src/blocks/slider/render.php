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
$inner_blocks_html .= '';

$slider_attributes = [
  'id' => $slider_id,
  'current' => $currentSlide,
  'data-interval' => $slideInterval,
  'slide-count' => $slideCount,
  'class' => 'carousel'
];

// print_r($slider_controls);
?>
<div <?php echo get_block_wrapper_attributes($slider_attributes) ?>>
  <?php echo $inner_blocks_html ?>
  <div class='controls'>
    <button class='btn left'>
      <span class='previous'>
        <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7'></path>
        </svg>
        <span class='hidden'>Previous</span>
      </span>
    </button>
    <button class='btn center'>
      <span class='pause'>Pause</span>
    </button>
    <button class='btn right'>
      <span class='next'>
        <svg class='w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5l7 7-7 7'></path>
        </svg>
        <span class='hidden'>Next</span>
      </span>
    </button>
    <!-- Slider indicators -->
    <div class='indicators flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2'>
      <?php if ($slideCount > 0) {
        for ($i = 0; $i < $slideCount; $i++) {
      ?>
          <button type='button' class='dot <?php echo ($currentSlide == $i) ? "current " : ""  ?>w-3 h-3 rounded-full' aria-current='false' aria-label='Slide <?= $i ?>' data-carousel-slide-to='<?= $i ?>'></button>
      <?php }
      } ?>
    </div>
  </div>
</div>

<?php
// echo sprintf(
//   '<div %s>%s%s</div>',
//   get_block_wrapper_attributes($slider_attributes),
//   $inner_blocks_html,
//   $slider_controls
// ); 
?>