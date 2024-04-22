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
  <!-- wp:post-featured-image {"aspectRatio":"auto","align":"full","style":{"layout":{"selfStretch":"fit","flexSize":null}}} /-->
  <!-- wp:group {"className":"info glow-effect","align":"full"} -->
  <div class="wp-block-group alignfull info glow-effect">
    <!-- wp:post-title {"align":"full"} /-->
    <!-- wp:template-part {"slug":"post-meta","theme":"custom-cut","area":"uncategorized"} /-->
  </div>
  <!-- /wp:group -->
</div>
<!-- /wp:group -->