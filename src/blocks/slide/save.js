import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaStyle
  } = attributes;
  // const title = "Slide one!";
  const blockProps = useBlockProps.save();

  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;
  const copyClass = `slide-copy ${name}`;
  const slideStyle = `background: ${mediaStyle.image} ${mediaStyle.size} ${mediaStyle.position} ${mediaStyle.repeat}`

  return (
    <>
      <div className={mediaClass} {...blockProps} >
        <div className='inner-slide' style={{ slideStyle }} >
          {mediaURL && <img src={mediaURL} alt={mediaAlt} className={mediaClass} />}
          {addText &&
            (<div className={copyClass} >
              <RichText.Content
                tagName='h3'
                className="slide-title"
                value={title}
              />
              <RichText.Content
                tagName='p'
                className="slide-text"
                value={slideCopy}
              />
            </div>)
          }
        </div>
      </div >
    </>
  )
}