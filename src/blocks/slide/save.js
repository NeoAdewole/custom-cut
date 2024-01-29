import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize, alignCopy, alignMedia
  } = attributes;
  // const title = "Slide one!";
  const blockProps = useBlockProps.save();

  const bgCheck = mediaURL ? 'has-background' : ''
  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const slideStyle = `background: url(${mediaURL}) ${mediaPosition} ${mediaRepeat}; background-size: ${mediaSize}`

  return (
    <>
      <div className={mediaClass} {...blockProps} >
        <div className='inner-slide'>
          {mediaURL && <div className='backdrop' style={slideStyle} > <img src={mediaURL} className={mediaClass} alt={mediaAlt} /> </div>}
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