<?php
/**
 * This core file should strictly be overwritten via your child theme.
 *
 * We strongly recommend to read Beans documentation to find out more how to
 * customize Beans theme.
 *
 * @author Beans
 * @link   http://www.getbeans.io
 */
// Loading from beans single.php

add_filter('beans_post_append_markup', 'add_share_links');
function add_share_links() {

  if ( function_exists( 'sharing_display' ) ) {
	?>
	<br><p>
	  <?php echo  sharing_display( '', true ) ; ?> 
	</p>
	<?php	
	}
}
?> <!-- <h1>Loading from beans single.php</h1> --> <?php
beans_load_document();
