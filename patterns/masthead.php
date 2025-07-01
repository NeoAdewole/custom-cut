<?php

/**
 * Title: Page Masthead
 * Slug: customcut/masthead
 * Categories: featured
 * Description: A visual identifier ideal for top of a page contianing a featured image and page/post title
 * 
 **/
?>
<!-- wp:group {"align":"wide","className":"masthead","layout":{"type":"default"}} -->
<div class="wp-block-group alignwide masthead">
  <!-- wp:post-featured-image {"aspectRatio":"auto","style":{"layout":{"selfStretch":"fit","flexSize":null}}} /-->
  <!-- wp:group {"style":{"layout":{"selfStretch":"fit","flexSize":null}},"className":"info glow-effect"} -->
  <div class="wp-block-group info glow-effect">
    <!-- wp:post-title {"align":"full"} /-->
    <!-- wp:template-part {"slug":"post-meta","theme":"custom-cut","area":"uncategorized"} /-->
  </div>
  <!-- /wp:group -->
</div>
<!-- /wp:group -->