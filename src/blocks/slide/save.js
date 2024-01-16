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
  const copyClass = `slide-copy ${name}`;

  return (
    <>
      <div className={mediaClass} {...blockProps} >
        <div
          className='inner-slide'
          style={mediaURL && `background: no-repeat center url(${mediaURL}); background-size: cover;`}
        >
          {mediaURL && <img src={mediaURL} alt={mediaAlt} className={mediaClass} />}
          {addText &&
            (<div className={copyClass}>
              <h3 className='slide-title'>{__(`${title}`, 'custom-cut')}</h3>
              <RichText.Content
                tagName='p'
                wrapperClassName='slide-text'
                value={slideCopy}
              />
            </div>)
          }
        </div>
      </div >
    </>
  )
}