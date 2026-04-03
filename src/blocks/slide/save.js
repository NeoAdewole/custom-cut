import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize,
    alignCopy, alignMedia, slideIndex, slideInterval, backdropOpacity,
    showCta, ctaText, ctaUrl, ctaOpenNewTab, ctaStyle,
    mediaType, videoID, videoURL, videoAutoplay, videoMuted, videoControls, videoLoop, videoPoster, embedURL
  } = attributes;

  const bgCheck = mediaURL ? 'has-background' : '';
  const mediaClass = `slide-image wp-image-${mediaID} ${name}`;
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const opacity = (backdropOpacity ?? 100) / 100;

  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover',
    opacity
  } : {};

  const blockProps = useBlockProps.save();

  return (
    <div
      {...blockProps}
      data-slide={slideIndex}
      {...(slideInterval ? { 'data-slide-interval': slideInterval } : {})}
    >
      {/* Image backdrop */}
      {(!mediaType || mediaType === 'image') && mediaURL && (
        <div className='backdrop' style={slideStyle}>
          <img src={mediaURL} className={mediaClass} alt={mediaAlt} />
        </div>
      )}

      {/* Video backdrop */}
      {mediaType === 'video' && videoURL && (
        <div className='backdrop backdrop-video' style={{ opacity }}>
          <video
            className={`slide-video${videoID ? ` wp-video-${videoID}` : ''}`}
            src={videoURL}
            {...(videoPoster ? { poster: videoPoster } : {})}
            {...(videoAutoplay ? { autoPlay: true } : {})}
            {...((videoMuted || videoAutoplay) ? { muted: true } : {})}
            {...(videoControls ? { controls: true } : {})}
            {...(videoLoop ? { loop: true } : {})}
            playsInline
          />
        </div>
      )}

      {/* Embed backdrop */}
      {mediaType === 'embed' && embedURL && (
        <div className='backdrop backdrop-embed' style={{ opacity }}>
          <iframe
            className='slide-embed'
            src={embedURL}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title={title || name || 'Embedded content'}
          />
        </div>
      )}

      {/* Text & CTA overlay */}
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
