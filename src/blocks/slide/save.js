import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize, alignCopy, alignMedia, slideIndex
  } = attributes;
  // const title = "Slide one!";

  const bgCheck = mediaURL ? 'has-background' : ''
  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover'
  } : {};

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} data-slide={slideIndex}  >
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
        </div>
        )}
    </div>
  );
}