import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID
  } = attributes;
  // const title = "Slide one!";
  const blockProps = useBlockProps.save();

  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;

  return (
    <div className={mediaClass} {...blockProps} >
      <div className='inner-slide'>
        {mediaURL && <img src={mediaURL} alt={mediaAlt} className={mediaClass} />}
        <div className='slide-copy'>
          <h2>{name}</h2>
          {
            addText ?
              <RichText.Content
                tagName='h2'
                value={slideCopy}
              /> :
              <h2>{__({ title }, 'custom-cut')}</h2>
          }
        </div>
      </div>
    </div >
  )
}