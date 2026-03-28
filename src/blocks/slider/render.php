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
$autoplay = isset($block_attributes['autoplay']) ? $block_attributes['autoplay'] : true;
$keyboardNav = isset($block_attributes['keyboardNav']) ? $block_attributes['keyboardNav'] : true;
$swipeNav = isset($block_attributes['swipeNav']) ? $block_attributes['swipeNav'] : true;
$indicatorPosition = isset($block_attributes['indicatorPosition']) ? $block_attributes['indicatorPosition'] : 'bottom';
$indicatorStyle = isset($block_attributes['indicatorStyle']) ? $block_attributes['indicatorStyle'] : 'dots';
$transitionType = isset($block_attributes['transitionType']) ? $block_attributes['transitionType'] : 'fade';
$transitionDuration = isset($block_attributes['transitionDuration']) ? $block_attributes['transitionDuration'] : 800;
$autoplayMode = isset($block_attributes['autoplayMode']) ? $block_attributes['autoplayMode'] : 'forward';
$enableLoop = isset($block_attributes['enableLoop']) ? $block_attributes['enableLoop'] : true;
$inner_blocks_html = '';
foreach ($block->inner_blocks as $inner_block) {
  $inner_blocks_html .= $inner_block->render();
}
$inner_blocks_html .= '';

$slider_attributes = [
  'id' => $slider_id,
  'current' => $currentSlide,
  'data-slide-interval' => $slideInterval,
  'data-autoplay' => ($autoplay == true) ? "true" : "false",
  'data-slide-count' => $slideCount,
  'data-keyboard-nav' => ($keyboardNav == true) ? "true" : "false",
  'data-swipe-nav' => ($swipeNav == true) ? "true" : "false",
  'data-transition-type' => $transitionType,
  'data-transition-duration' => $transitionDuration,
  'data-autoplay-mode' => $autoplayMode,
  'data-enable-loop' => ($enableLoop == true) ? "true" : "false",
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
    <div class='indicators indicators-<?php echo esc_attr($indicatorPosition); ?> indicators-<?php echo esc_attr($indicatorStyle); ?>'>
      <?php if ($slideCount > 0) {
        for ($i = 0; $i < $slideCount; $i++) {
          $is_current = ($currentSlide == $i);
          $label = 'Slide ' . ($i + 1) . ' of ' . $slideCount;
          $content = ($indicatorStyle === 'numbers') ? ($i + 1) : '';
      ?>
          <button
            type='button'
            class='indicator <?php echo $is_current ? 'current' : ''; ?>'
            aria-current='<?php echo $is_current ? 'true' : 'false'; ?>'
            aria-label='<?php echo esc_attr($label); ?>'
            data-carousel-slide-to='<?php echo $i; ?>'
          ><?php echo $content; ?></button>
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