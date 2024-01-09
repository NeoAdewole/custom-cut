<?php

/**
 * Title: Page Masthead
 * Slug: customcut/masthead
 * Categories: featured
 * Description: A visual identifier ideal for top of a page contianing a featured image and page/post title
 * 
 **/
?>
<!-- wp:group {"className":"masthead","layout":{"type":"constrained"}} -->
<div class="wp-block-group masthead">
  <!-- wp:post-featured-image {"aspectRatio":"auto","style":{"layout":{"selfStretch":"fit","flexSize":null}}} /-->
  <!-- wp:group {"className":"info glow-effect","style":{"layout":{"selfStretch":"fit","flexSize":null}}} -->
  <div class="wp-block-group info glow-effect">
    <!-- wp:post-title {"align":"full"} /-->
    <!-- wp:template-part {"slug":"post-meta","theme":"custom-cut","area":"uncategorized"} /-->
    <svg class="glow-container"></svg>
    <svg class="glow-line"></svg>
  </div>
</div>
<!-- /wp:group -->