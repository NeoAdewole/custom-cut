<?php
 /* Template Name: Clear eyes */
?> <!-- <h1>Loading from beans child index.php</h1> --> <?php

	// Add hero after header.
	
	add_action( 'beans_header_after_markup', 'page_hero' );

	function page_hero() {
		// print_r(get_post()->ID);
		if (has_post_thumbnail(get_post()->ID) ){
			$image = wp_get_attachment_image_src(get_post_thumbnail_id(get_post()->ID), 'single-post-thumbnail');
			$image_link = array_values($image)[0];
		}
	  ?>

	  <div class="tm-hero uk-block-large wrapper">
	  	<img class="banner" src="<?php print_r($image_link) ?>" />
	    <div class="uk-container uk-container-center uk-text-center">
	     <!-- Your hero content -->
	    </div>
	  </div>
	
	<?php
	}

// Load Beans document.
beans_load_document();
