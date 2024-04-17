import {
  useBlockProps, InnerBlocks
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
export default function ({ attributes }) {
  const { showImage, sliderId, slides, slideCount, start = 0, slideInterval } = attributes;
  const blockProps = useBlockProps.save({
    dataCurrent: current,
    dataInterval: slideInterval,
    count: slideCount
  });

  return (
    <>
      {current && `{<h3>Current Slide save: ${current}</h3>}`}
      <div {...blockProps}>
        <div className='controls'>
          <span className='btn previous'>Prev</span>
          <span className='btn pause'>Pause</span>
          <span className='btn next'>Next</span>
        </div>
        <div className='carousel'>
          <InnerBlocks.Content />
        </div>
      </div>
    </>
  );

}