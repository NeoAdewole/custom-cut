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
  console.log("slider block props from save", blockProps)

  return (
    <>
      {current && `{<h3>Current Slide save: ${current}</h3>}`}
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    </>
  );

}