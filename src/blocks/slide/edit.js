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
      slideCopy, addText, name, title, mediaURL, mediaAlt, mediaID, mediaPosition, mediaRepeat, mediaSize, alignCopy, alignMedia, slideIndex,
      sliderId, slideInterval, backdropOpacity, showCta, ctaText, ctaUrl, ctaOpenNewTab, ctaStyle
    },
    setAttributes, context, isSelected, style
  } = props;

  // let { backgroundImage, url } = mediaStyle;

  const [mediaPreview, setMediaPreview] = useState(mediaURL)
  // A slide can have images, text (media) etc

  const selectMedia = (media) => {
    let newMediaURL = null
    if (isBlobURL(media.url)) {
      newMediaURL = media.url
    } else {
      newMediaURL = media.sizes ? media.sizes.full.url : media.media_details.sizes.full.source_url
      setAttributes({
        mediaID: media.id,
        mediaAlt: media.alt,
        mediaURL: newMediaURL,
        mediaSize: mediaSize,
        mediaPosition: "center",
        mediaRepeat: "no-repeat"
      })
      revokeBlobURL(mediaPreview)
    }
    setMediaPreview(newMediaURL)
  }

  const selectMediaURL = (url) => {
    setAttributes({ mediaID: null, mediaAlt: null, mediaURL: url });
    setMediaPreview(url);
  }

  const bgCheck = mediaURL ? 'has-background' : ''
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const mediaClass = `slide-image wp-image-${mediaID}`;
  const isActive = slideIndex == 0 ? 'active' : '';

  const slideStyle = mediaURL ? {
    backgroundImage: `url(${mediaURL})`,
    backgroundPosition: mediaPosition || 'center',
    backgroundRepeat: mediaRepeat || 'no-repeat',
    backgroundSize: mediaSize || 'cover',
    opacity: (backdropOpacity ?? 100) / 100
  } : {};

  const blockProps = useBlockProps({ dataSlide: slideIndex });

  return (
    <>
      {mediaPreview && (
        <BlockControls group="inline">
          <MediaReplaceFlow
            name={__('Replace Image', 'custom-cut')}
            mediaId={mediaID}
            mediaURL={mediaURL}
            allowedTypes={['image']}
            accept={'image/*'}
            onError={error => console.erorr(error)}
            onSelect={selectMedia}
            onSelectURL={selectMediaURL}
          />
          <ToolbarButton
            onClick={() => {
              setAttributes({ mediaID: 0, mediaAlt: "", mediaURL: "" });
              setMediaPreview("");
            }}
          >
            {__('Remove Image', 'custom-cut')}
          </ToolbarButton>
        </BlockControls>
      )}

      {addText &&
        <BlockControls group="inline">
          <AlignmentControl
            value={alignCopy}
            onChange={alignCopy => setAttributes({ alignCopy })}
          />
        </BlockControls>
      }

      <InspectorControls group="settings">
        <PanelBody title={__('Slide Settings', 'custom-cut')}>
          {mediaPreview && !isBlobURL(mediaPreview) && (
            <TextareaControl
              label={__('Alt Attribute', 'custom-cut')}
              value={mediaAlt}
              onChange={mediaAlt => setAttributes({ mediaAlt })}
              help={__('Description of your image for screen readers.', 'custom-cut')}
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

      <InspectorControls group="styles">
        <Panel header="Custom Slide Styles">
          <PanelBody title={__('Slide Styles', 'custom-cut')} initialOpen={true} >
            {addText && (
              <PanelRow>
                {__('Align copy', 'custom-cut')}
                <AlignmentControl
                  value={alignCopy}
                  onChange={alignCopy => setAttributes({ alignCopy })}
                />
              </PanelRow>
            )}
            {mediaURL && (
              <PanelRow>
                {__('Align media', 'custom-cut')}
                <AlignmentControl
                  value={alignMedia}
                  onChange={alignMedia => setAttributes({ alignMedia })}
                />
              </PanelRow>
            )}
            {mediaURL && (
              <RangeControl
                label={__('Background Opacity', 'custom-cut')}
                value={backdropOpacity ?? 100}
                onChange={backdropOpacity => setAttributes({ backdropOpacity })}
                min={0}
                max={100}
                __nextHasNoMarginBottom={true}
              />
            )}
          </PanelBody>
        </Panel>
      </InspectorControls>

      <div {...blockProps} >
        {mediaPreview && (
          <div className='backdrop' style={slideStyle}>
            <img src={mediaPreview} alt={mediaAlt} className={mediaClass} />
          </div>
        )}
        {isBlobURL(mediaPreview) && <Spinner />}
        <MediaPlaceholder
          allowedTypes={['image']}
          accept={'image/*'}
          icon="admin-users"
          onSelect={selectMedia}
          onError={error => console.error(error)}
          disableMediaButtons={mediaPreview}
          onSelectURL={selectMediaURL}
        />
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
                allowedFormats={["core/bold"]}
              />
              <RichText
                {...blockProps}
                placeholder={__("Add some text to this slide?", "custom-cut")}
                tagName='p'
                className="slide-text"
                onChange={slideCopy => setAttributes({ slideCopy })}
                value={slideCopy}
                allowedFormats={["core/bold"]}
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