import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize, alignCopy, alignMedia, slideIndex,
    slideInterval, backdropOpacity, showCta, ctaText, ctaUrl, ctaOpenNewTab, ctaStyle
  } = attributes;
  // const title = "Slide one!";

  const bgCheck = mediaURL ? 'has-background' : ''
  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover',
    opacity: (backdropOpacity ?? 100) / 100
  } : {};

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} data-slide={slideIndex} {...(slideInterval ? { 'data-slide-interval': slideInterval } : {})}>
      {mediaURL && (
        <div className='backdrop' style={slideStyle}>
          <img src={mediaURL} className={mediaClass} alt={mediaAlt} />
        </div>
      )}
      {(addText || showCta) && (
        <div className={copyClass}>
          {addText && (
            <>
              <RichText.Content tagName='h3' className="slide-title" value={title} />
              <RichText.Content tagName='p' className="slide-text" value={slideCopy} />
            </>
          )}
          {showCta && (
            <a
              className={`slide-cta slide-cta-${ctaStyle}`}
              href={ctaUrl || '#'}
              target={ctaOpenNewTab ? '_blank' : '_self'}
              rel={ctaOpenNewTab ? 'noopener noreferrer' : undefined}
            >
              {ctaText || 'Learn More'}
            </a>
          )}
        </div>
      )}
    </div>
  );
}