<?php
 /* Template Name: Clear Contact */
?> <!-- <h1>Loading Contact template from beans child contct.php</h1> --> <?php

// Add fb chat markup into contact page
if ( is_page('contact')){
	add_action('beans_body_prepend_markup', 'custom_add_fb_chat_script');
  
  function custom_add_fb_chat_script(){
  	?>
			<!-- Load Facebook SDK for JavaScript -->
			<div id="fb-root"></div>
			<script>(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script>

			<!-- Your customer chat code -->
			<div class="fb-customerchat"
			  attribution=setup_tool
			  page_id="180227266069867"
			  theme_color="#9933cc">
			</div>
  	<?php
  }
}

// Load Beans document.
beans_load_document();
