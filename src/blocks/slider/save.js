import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
// slider
export default function ({ attributes }) {
  const {
    slideCopy, addText, mediaURL, mediaAlt, mediaID
  } = attributes;
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div className='inner-slide'>
        {
          addText ?
            <RichText.Content
              tagName='h2'
              value={slideCopy}
            /> :
            <h2>{__('Generic Slider', 'custom-cut')}</h2>
        }
      </div>
    </div>
  );

}