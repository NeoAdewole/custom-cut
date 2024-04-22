<?php
function customcut_slider_render_cb($atts, $content, $block)
{
  $showCategory = isset($atts['showCategory']) ? $atts['showCategory'] : false;
  $showImage = isset($atts['showImage']) ? $atts['showImage'] : true;
  $mediaURL = isset($atts['mediaURL']) ? esc_url($atts['mediaURL']) : '';
  $mediaAlt = isset($atts['mediaAlt']) ? $atts['mediaAlt'] : '';
  $mediaID = isset($atts['mediaID']) ? $atts['mediaID'] : '';

  $heading = esc_html($atts['content']);

  $sliderID = $block->context['postId'];

  if ($atts['showCategory']) {
    $heading = get_the_archive_title();
  }
  echo ('Dynamic slider block loaded \n');
  var_dump($atts);

  ob_start();
?>
  <div class="wp-block-customcut-slider dynamic" id="slider" data-post-id="<?php echo $sliderID; ?>">
    <?php
    echo ('Load inner blocks here');
    echo do_blocks($content);
    ?>

    <div class="slide <?= $mediaID ?>">
      <img src="<?php echo $mediaURL; ?>" alt="<?php echo $mediaAlt; ?>" />
    </div>
    <div className="inner-slide">
      <h1><?php echo $heading; ?></h1>
    </div>
  </div>
<?php

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}
