import {
  useBlockProps, InspectorControls, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, AlignmentControl
} from '@wordpress/block-editor';
import {
  Panel, PanelBody, PanelRow, ToggleControl, TextControl, TextareaControl, Spinner, ToolbarButton,
  SelectControl, RangeControl, __experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import './editor.css'

export default function (props) {
  const {
    attributes: {
      slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize,
      alignCopy, alignMedia, slideIndex, sliderId, slideInterval, backdropOpacity,
      showCta, ctaText, ctaUrl, ctaOpenNewTab, ctaStyle,
      mediaType, videoID, videoURL, videoAutoplay, videoMuted, videoControls, videoLoop, videoPoster, embedURL
    },
    setAttributes, context, isSelected, style
  } = props;

  const [mediaPreview, setMediaPreview] = useState(mediaURL);
  const [videoPreview, setVideoPreview] = useState(videoURL);

  // Convert common watch URLs to embeddable URLs
  const toEmbedURL = (url) => {
    if (!url) return url;
    console.log("url: ", url);
    // YouTube: watch URL or short URL → embed URL
    const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
    // Vimeo: vimeo.com/ID → player.vimeo.com/video/ID
    const vimeo = url.match(/(?:^|vimeo\.com\/)(\d+)$/);
    if (vimeo && !url.includes('player.vimeo.com')) return `https://player.vimeo.com/video/${vimeo[1]}`;
    console.log("Embed URL: ", url);
    return url;
  };

  // --- Image handlers ---
  const selectMedia = (media) => {
    let newMediaURL = null;
    if (isBlobURL(media.url)) {
      newMediaURL = media.url;
    } else {
      newMediaURL = media.sizes ? media.sizes.full.url : media.media_details.sizes.full.source_url;
      setAttributes({ mediaID: media.id, mediaAlt: media.alt, mediaURL: newMediaURL, mediaSize, mediaPosition: 'center', mediaRepeat: 'no-repeat' });
      revokeBlobURL(mediaPreview);
    }
    setMediaPreview(newMediaURL);
  };

  const selectMediaURL = (url) => {
    setAttributes({ mediaID: null, mediaAlt: null, mediaURL: url });
    setMediaPreview(url);
  };

  // --- Video handlers ---
  const selectVideo = (media) => {
    let newVideoURL = null;
    if (isBlobURL(media.url)) {
      newVideoURL = media.url;
    } else {
      newVideoURL = media.url;
      setAttributes({ videoID: media.id, videoURL: newVideoURL });
      revokeBlobURL(videoPreview);
    }
    setVideoPreview(newVideoURL);
  };

  const selectVideoURL = (url) => {
    setAttributes({ videoID: null, videoURL: url });
    setVideoPreview(url);
  };

  // --- Derived styles ---
  const bgCheck = mediaURL ? 'has-background' : '';
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const mediaClass = `slide-image wp-image-${mediaID}`;
  const opacity = (backdropOpacity ?? 100) / 100;

  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover',
    opacity
  } : {};

  const blockProps = useBlockProps({ dataSlide: slideIndex });

  return (
    <>
      {/* --- Block controls (toolbar) --- */}
      {mediaType === 'image' && mediaPreview && (
        <BlockControls group="inline">
          <MediaReplaceFlow
            name={__('Replace Image', 'custom-cut')}
            mediaId={mediaID}
            mediaURL={mediaURL}
            allowedTypes={['image']}
            accept={'image/*'}
            onError={error => console.error(error)}
            onSelect={selectMedia}
            onSelectURL={selectMediaURL}
          />
          <ToolbarButton onClick={() => { setAttributes({ mediaID: 0, mediaAlt: '', mediaURL: '' }); setMediaPreview(''); }}>
            {__('Remove Image', 'custom-cut')}
          </ToolbarButton>
        </BlockControls>
      )}

      {mediaType === 'video' && videoPreview && (
        <BlockControls group="inline">
          <MediaReplaceFlow
            name={__('Replace Video', 'custom-cut')}
            mediaId={videoID}
            mediaURL={videoURL}
            allowedTypes={['video']}
            accept={'video/*'}
            onError={error => console.error(error)}
            onSelect={selectVideo}
            onSelectURL={selectVideoURL}
          />
          <ToolbarButton onClick={() => { setAttributes({ videoID: 0, videoURL: '' }); setVideoPreview(''); }}>
            {__('Remove Video', 'custom-cut')}
          </ToolbarButton>
        </BlockControls>
      )}

      {addText && (
        <BlockControls group="inline">
          <AlignmentControl value={alignCopy} onChange={alignCopy => setAttributes({ alignCopy })} />
        </BlockControls>
      )}

      {/* --- Inspector: Settings --- */}
      <InspectorControls group="settings">
        <PanelBody title={__('Slide Settings', 'custom-cut')}>
          <SelectControl
            label={__('Media Type', 'custom-cut')}
            value={mediaType}
            options={[
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
              { label: 'Embed (YouTube / Vimeo)', value: 'embed' },
            ]}
            onChange={mediaType => setAttributes({ mediaType })}
            __nextHasNoMarginBottom={true}
          />

          {mediaType === 'image' && mediaPreview && !isBlobURL(mediaPreview) && (
            <TextareaControl
              label={__('Alt Attribute', 'custom-cut')}
              value={mediaAlt}
              onChange={mediaAlt => setAttributes({ mediaAlt })}
              help={__('Description of your image for screen readers.', 'custom-cut')}
              __nextHasNoMarginBottom={true}
            />
          )}

          {mediaType === 'video' && (
            <>
              <ToggleControl
                label={__('Autoplay', 'custom-cut')}
                checked={videoAutoplay}
                onChange={videoAutoplay => setAttributes({ videoAutoplay, videoMuted: videoAutoplay ? true : videoMuted })}
                help={__('Autoplay requires muted video (browser policy).', 'custom-cut')}
                __nextHasNoMarginBottom={true}
              />
              <ToggleControl
                label={__('Muted', 'custom-cut')}
                checked={videoMuted || videoAutoplay}
                onChange={videoMuted => setAttributes({ videoMuted })}
                __nextHasNoMarginBottom={true}
              />
              <ToggleControl
                label={__('Show Controls', 'custom-cut')}
                checked={videoControls}
                onChange={videoControls => setAttributes({ videoControls })}
                __nextHasNoMarginBottom={true}
              />
              <ToggleControl
                label={__('Loop Video', 'custom-cut')}
                checked={videoLoop}
                onChange={videoLoop => setAttributes({ videoLoop })}
                __nextHasNoMarginBottom={true}
              />
              <TextControl
                label={__('Poster Image URL', 'custom-cut')}
                help={__('Thumbnail shown before the video plays.', 'custom-cut')}
                value={videoPoster}
                onChange={videoPoster => setAttributes({ videoPoster })}
                __nextHasNoMarginBottom={true}
              />
            </>
          )}

          {mediaType === 'embed' && (
            <TextControl
              label={__('Embed URL', 'custom-cut')}
              help={__('Paste any YouTube or Vimeo URL — watch and short URLs are converted automatically.', 'custom-cut')}
              value={embedURL}
              onChange={url => setAttributes({ embedURL: toEmbedURL(url) })}
              __nextHasNoMarginBottom={true}
            />
          )}

          <ToggleControl
            label={__('Add Text', 'custom-cut')}
            checked={addText}
            onChange={addText => setAttributes({ addText })}
            help={addText ? __('Add some text to this slide', 'custom-cut') : __('Not displaying slide text', 'custom-cut')}
            __nextHasNoMarginBottom={true}
          />
          {addText && (
            <>
              <TextareaControl
                label={__('Slide Text', 'custom-cut')}
                value={slideCopy}
                onChange={slideCopy => setAttributes({ slideCopy })}
                help={__('Add text to this slide here', 'custom-cut')}
                __nextHasNoMarginBottom={true}
              />
              <TextControl
                label={__('Title', 'custom-cut')}
                help={__('Give this slide a title', 'custom-cut')}
                value={title}
                onChange={title => setAttributes({ title })}
                __nextHasNoMarginBottom={true}
              />
            </>
          )}
          <NumberControl
            label={__('Custom Slide Duration (ms)', 'custom-cut')}
            help={__('Override the slider interval for this slide. Leave blank to use slider default.', 'custom-cut')}
            value={slideInterval ?? ''}
            min={500}
            max={99999}
            step={100}
            onChange={val => setAttributes({ slideInterval: val ? parseInt(val) : undefined })}
            __nextHasNoMarginBottom={true}
          />
        </PanelBody>

        <PanelBody title={__('Call to Action', 'custom-cut')} initialOpen={false}>
          <ToggleControl
            label={__('Show CTA Button', 'custom-cut')}
            checked={showCta}
            onChange={showCta => setAttributes({ showCta })}
            __nextHasNoMarginBottom={true}
          />
          {showCta && (
            <>
              <TextControl
                label={__('Button Text', 'custom-cut')}
                value={ctaText}
                onChange={ctaText => setAttributes({ ctaText })}
                __nextHasNoMarginBottom={true}
              />
              <TextControl
                label={__('Button URL', 'custom-cut')}
                value={ctaUrl}
                onChange={ctaUrl => setAttributes({ ctaUrl })}
                __nextHasNoMarginBottom={true}
              />
              <ToggleControl
                label={__('Open in new tab', 'custom-cut')}
                checked={ctaOpenNewTab}
                onChange={ctaOpenNewTab => setAttributes({ ctaOpenNewTab })}
                __nextHasNoMarginBottom={true}
              />
              <SelectControl
                label={__('Button Style', 'custom-cut')}
                value={ctaStyle}
                options={[
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Outline', value: 'outline' },
                ]}
                onChange={ctaStyle => setAttributes({ ctaStyle })}
                __nextHasNoMarginBottom={true}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      {/* --- Inspector: Styles --- */}
      <InspectorControls group="styles">
        <Panel header="Custom Slide Styles">
          <PanelBody title={__('Slide Styles', 'custom-cut')} initialOpen={true}>
            {addText && (
              <PanelRow>
                {__('Align copy', 'custom-cut')}
                <AlignmentControl value={alignCopy} onChange={alignCopy => setAttributes({ alignCopy })} />
              </PanelRow>
            )}
            {mediaType === 'image' && mediaURL && (
              <PanelRow>
                {__('Align media', 'custom-cut')}
                <AlignmentControl value={alignMedia} onChange={alignMedia => setAttributes({ alignMedia })} />
              </PanelRow>
            )}
            <RangeControl
              label={__('Media Opacity', 'custom-cut')}
              value={backdropOpacity ?? 100}
              onChange={backdropOpacity => setAttributes({ backdropOpacity })}
              min={0}
              max={100}
              __nextHasNoMarginBottom={true}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>

      {/* --- Block preview --- */}
      <div {...blockProps}>
        {/* Image */}
        {mediaType === 'image' && mediaPreview && (
          <div className='backdrop' style={slideStyle}>
            <img src={mediaPreview} alt={mediaAlt} className={mediaClass} />
          </div>
        )}
        {mediaType === 'image' && isBlobURL(mediaPreview) && <Spinner />}
        {mediaType === 'image' && (
          <MediaPlaceholder
            allowedTypes={['image']}
            accept={'image/*'}
            icon="format-image"
            onSelect={selectMedia}
            onError={error => console.error(error)}
            disableMediaButtons={mediaPreview}
            onSelectURL={selectMediaURL}
          />
        )}

        {/* Video */}
        {mediaType === 'video' && (
          <>
            {videoPreview ? (
              <div className='backdrop backdrop-video' style={{ opacity }}>
                {isBlobURL(videoPreview) && <Spinner />}
                <video
                  src={videoPreview}
                  poster={videoPoster || undefined}
                  controls
                  muted
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            ) : (
              <MediaPlaceholder
                allowedTypes={['video']}
                accept={'video/*'}
                icon="format-video"
                onSelect={selectVideo}
                onError={error => console.error(error)}
                onSelectURL={selectVideoURL}
                labels={{ title: __('Slide Video', 'custom-cut') }}
              />
            )}
          </>
        )}

        {/* Embed */}
        {mediaType === 'embed' && (
          <div className='backdrop backdrop-embed' style={{ opacity }}>
            {embedURL ? (
              <iframe
                className='slide-embed'
                src={embedURL}
                style={{ border: 'none' }}
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={title || name || 'Embedded content'}
              />
            ) : (
              <p className='embed-prompt'>{__('Add an embed URL in the Slide Settings panel.', 'custom-cut')}</p>
            )}
          </div>
        )}

        {/* Text & CTA overlay */}
        <div className={copyClass}>
          <RichText
            placeholder={__('Slide Name', 'custom-cut')}
            tagName="strong"
            onChange={name => setAttributes({ name })}
            value={name}
          />
          <br />
          {addText && (
            <>
              <RichText
                {...blockProps}
                placeholder={__('Title', 'custom-cut')}
                tagName="h3"
                className="slide-title"
                onChange={title => setAttributes({ title })}
                value={title}
                allowedFormats={['core/bold']}
              />
              <RichText
                {...blockProps}
                placeholder={__('Add some text to this slide?', 'custom-cut')}
                tagName='p'
                className="slide-text"
                onChange={slideCopy => setAttributes({ slideCopy })}
                value={slideCopy}
                allowedFormats={['core/bold']}
              />
            </>
          )}
          {showCta && (
            <a
              className={`slide-cta slide-cta-${ctaStyle}`}
              href={ctaUrl || '#'}
              target={ctaOpenNewTab ? '_blank' : '_self'}
              rel={ctaOpenNewTab ? 'noopener noreferrer' : undefined}
              onClick={e => e.preventDefault()}
            >
              {ctaText || __('Learn More', 'custom-cut')}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
