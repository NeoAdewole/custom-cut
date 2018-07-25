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

	  <div class="tm-hero uk-sticky-placeholder">
			<!-- particles.js container -->
			<div id="particles-js">
			</div>
			<!-- End of ParticleJS -->
	<?php
	}
		add_action('beans_main_before_markup', 'action_calls');

		function action_calls() {
			?>
			<!-- <div data-uk-parallax="{bg: -200}">
			  <div data-uk-parallax="{opacity: '0,1', scale: '0,1'}">...</div>
			</div> -->
			<div class="uk-slidenav-position uk-container uk-container-center" data-uk-slideshow="{animation: 'random-fx', kenburns:true, autoplay:true}">
		  	<?php query_posts('category_name=services'); ?>
			  <?php if (have_posts() ): ?>
		  	<ul class="uk-slideshow">
		  		<?php 
			  		$data_post_count = 0;
			  		while (have_posts()) : the_post();

	  				$thumb_id = get_post_thumbnail_id();
	  				$thumb_url_array = wp_get_attachment_image_src($thumb_id, 'full', true);
	  				$resized_src = beans_edit_image($thumb_url_array[0], array(
	  					'resize' => array(200, 200, true)
	  				));

	  				$slider_excerpt = get_the_excerpt();
	  				$categories_list = get_the_category_list( esc_html_x(', ', 'category seperator', 'sps') );		  		
	  			?>
		  			<li data-uk-slideshow-item> 
				  		<div class="ben">
		            <h2 class="" itemprop="headline"><?php the_title(); ?></h2>
		            <p class="hero-text">
	  					 		<img src="<?php echo $resized_src; ?>" class="left inline-image" />
	  					 		<?php echo $slider_excerpt ?>
		            </p>
		            <a class="action" href="<?php the_permalink(); ?>">Learn More</a>
				  		</div>
		        </li>

		        <?php 
		        $data_post_count =+ 1;
		      	endwhile; ?>
		  	</ul>
		      <?php endif; ?>
		  	<a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slideshow-item="previous"></a>
		    <a href="#" class="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slideshow-item="next"></a>

		      <?php wp_reset_postdata(); ?>
		  </div><!-- end slideshow container -->
		</div><!-- end TM-Hero div -->
	<?php
	}

// Load Beans document.
beans_load_document();
