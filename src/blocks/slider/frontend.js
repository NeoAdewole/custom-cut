import {
  useBlockProps, InnerBlocks
} from '@wordpress/block-editor';
import { render, useState, useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n';
// slider
export default function ({ attributes }) {
  const {
    slideCopy, addText, mediaURL, mediaAlt, mediaID
  } = attributes;
  const blockProps = useBlockProps.save();
  // const innerBlockProps = useInnerBlockProps.save()

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );

}


document.addEventListener('DOMContentLoaded', () => {
  console.log("Frontend slider script loaded")
  const slider = document.querySelector('#slider')
  if (slider) {

    const slides = document.querySelectorAll('.wp-block-custom-cut-slide')

    const slide_count = 0
    slides.forEach(slide => {
      slide.addEventListener('click', event => {
        event.preventDefault()
        slide_count = + 1
        console.log('This is slide ' + slide_count)
        console.log(slide)
      })
    })

  }

})