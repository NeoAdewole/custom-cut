<?php
 
?> <!-- <h1>Loading from beans template archive.php</h1> --> <?php

add_filter( 'the_content', 'beans_child_modify_post_content' );
function beans_child_modify_post_content( $query ) {
  // Only apply to front page.
  if ( !is_archive() )
  	return;

  if ( has_post_thumbnail() ) {		
  	$thumb = '<div class="left inline-image">' . get_the_post_thumbnail() . '</div>';  	
  } else {
  	$thumb = '';
  }
  

  // Return the excerpt() if it exists.
  if ( has_excerpt() )
    	$content = $thumb . '<!-- <p>this is a crazy post</p> --><p class="uk-article-lead">' . get_the_excerpt() . '</p>';
    else 
    	$content = $thumb .  '<!-- <p>Preview:</p> --><p class="uk-article-lead">' . wp_trim_words( get_the_content(), 55, '...') . '</p>';

  // Return content and readmore.
  return $content . '<p class="right more">' . beans_post_more_link() . '</p>';	  
}

add_filter('beans_post_append_markup', 'add_share_links');
function add_share_links() {

  if ( function_exists( 'sharing_display' ) ) {
	?>
	<br><p>
	  <?php echo sharing_display( '', true ) ; ?> 
	</p>
	<?php
	}
}

// Load Beans document.
beans_load_document();
