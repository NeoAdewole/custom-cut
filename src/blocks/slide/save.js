import {
  useBlockProps, RichText
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ({ attributes }) {
  const {
    slideCopy, addText, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize,
    alignCopy, slideIndex, slideInterval, backdropOpacity,
    showCta, ctaText, ctaUrl, ctaOpenNewTab, ctaStyle,
    mediaType, videoID, videoURL, videoAutoplay, videoMuted, videoControls, videoLoop, videoPoster, embedURL,
    copyVerticalAlign, titleTag, gradientOverlay, gradientDirection, gradientStartColor, gradientEndColor,
    titleColor, copyColor, titleSize, copySize
  } = attributes;

  const bgCheck = mediaURL ? 'has-background' : '';
  const mediaClass = `slide-image wp-image-${mediaID}`;
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} valign-${copyVerticalAlign || 'center'}`;
  const opacity = (backdropOpacity ?? 100) / 100;

  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover',
    opacity
  } : {};

  const hasMedia = mediaURL || videoURL || embedURL;
  const gradientStyle = gradientOverlay && hasMedia ? {
    background: `linear-gradient(${gradientDirection || 'to top'}, ${gradientEndColor || 'rgba(0,0,0,0.65)'}, ${gradientStartColor || 'rgba(0,0,0,0)'})`
  } : null;

  const blockProps = useBlockProps.save();

  return (
    <div
      {...blockProps}
      data-slide={slideIndex}
      {...(slideInterval ? { 'data-slide-interval': slideInterval } : {})}
      aria-roledescription="slide"
      aria-label={`Slide ${(slideIndex ?? 0) + 1}`}
    >
      {/* Image backdrop */}
      {(!mediaType || mediaType === 'image') && mediaURL && (
        <div className='backdrop' style={slideStyle}>
          <img src={mediaURL} className={mediaClass} alt={mediaAlt} loading="lazy" />
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
            title={title || 'Embedded content'}
          />
        </div>
      )}

      {/* Gradient overlay (between backdrop and copy) */}
      {gradientStyle && (
        <div className='slide-gradient' style={gradientStyle} aria-hidden="true" />
      )}

      {/* Text & CTA overlay */}
      {(addText || showCta) && (
        <div className={copyClass}>
          {addText && (
            <>
              <RichText.Content
                tagName={titleTag || 'h2'}
                className="slide-title"
                value={title}
                style={{
                  ...(titleColor ? { color: titleColor } : {}),
                  ...(titleSize ? { fontSize: titleSize } : {}),
                }}
              />
              <RichText.Content
                tagName='p'
                className="slide-text"
                value={slideCopy}
                style={{
                  ...(copyColor ? { color: copyColor } : {}),
                  ...(copySize ? { fontSize: copySize } : {}),
                }}
              />
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
