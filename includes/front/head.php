<?php

function custom_cut_head()
{
  // adds google font preconnect
  // adds fb verification meta tracking script
  // adds Google tracking script
?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <meta name="facebook-domain-verification" content="6mfd7kvlnyzzqkp41gbz853woswor2" />
  <meta name="google-site-verification" content="3YrBysmOrzCEgvPvEKydbXcQAx_1VPDNi_qiaowzE2c" />
<?php
}
