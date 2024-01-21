import {
  useBlockProps, InspectorControls, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, AlignmentControl
} from '@wordpress/block-editor';
import {
  Panel, PanelBody, PanelRow, PanelColorSettings, ToggleControl, TextareaControl, Spinner, ToolbarButton, SelectControl, BorderControl, Tooltip, Icon, TextControl, Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useState } from '@wordpress/element';

export default function ({ attributes, setAttributes, context, isSelected }) {
  const {
    name, title, addText, slideCopy, mediaID, mediaAlt, mediaURL, mediaPosition, mediaSize, mediaRepeat, alignCopy, alignMedia
  } = attributes;

  const blockProps = useBlockProps();
  // let { backgroundImage, url } = mediaStyle;

  const [mediaPreview, setMediaPreview] = useState(mediaURL)
  // slide can have images, text (media) etc

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
    setAttributes({
      mediaID: null,
      mediaAlt: null,
      mediaURL: url
    });
    setMediaPreview(url);
  }

  const bgCheck = mediaURL ? 'has-background' : ''
  const copyClass = `slide-copy ${alignCopy} ${bgCheck} ${name}`;
  const mediaClass = ` wp-image-${mediaID}`;
  const slideStyle = `background: ${mediaURL} ${mediaPosition} ${mediaRepeat} background-size: ${mediaSize}`

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
              setAttributes({
                mediaID: 0,
                mediaAlt: "",
                mediaURL: ""
              });

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
        </BlockControls>}

      <InspectorControls group="settings">
        <PanelBody title={__('Slide Settings', 'custom-cut')}>
          {
            mediaPreview && !isBlobURL(mediaPreview) &&
            <TextareaControl
              label={__('Alt Attribute', 'custom-cut')}
              value={mediaAlt}
              onChange={mediaAlt => setAttributes({ mediaAlt })}
              help={__(
                'Description of your image for screen readers.',
                'custom-cut'
              )}
            />
          }
          <ToggleControl
            label={__('Add Text', 'custom-cut')}
            checked={addText}
            onChange={addText => setAttributes({ addText })}
            help={addText ? __('Add some text to this slide', 'custom-cut') : __('Not displaying slide text', 'custom-cut')}
          />
          {
            addText &&
            <TextareaControl
              label={__('Slide Text', 'custom-cut')}
              value={slideCopy}
              onChange={slideCopy => setAttributes({ slideCopy })}
              help={__('Add text to this slide here', 'custom-cut')}
            />
          }
          <TextControl
            label={__('Title', 'custom-cut')}
            help={__('Give this slide a title', 'custom-cut')}
            value={title}
            onChange={title => setAttributes({ title })}
          />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="styles">
        <Panel header="Custom Slide Styles">
          <PanelBody title={__('Slide Syles', 'custom-cut')} initialOpen={true} >
            <PanelRow>
              {__('Align copy', 'custom-cut')}
              {addText && <AlignmentControl
                value={alignCopy}
                onChange={alignCopy => setAttributes({ alignCopy })}
              />}
            </PanelRow>
            <PanelRow>
              {__('Align media', 'custom-cut')}
              {mediaURL &&
                <AlignmentControl
                  value={alignMedia}
                  onChange={alignMedia => setAttributes({ alignMedia })}
                />
              }
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>
      <div {...blockProps}>
        <div className="inner-slide" style={{ slideStyle }} >
          {mediaPreview && <img src={mediaPreview} alt={mediaAlt} className={mediaClass} />}
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
          <div className={`${copyClass}`}>
            <RichText
              placeholder={__('Slide Name', 'custom-cut')}
              tagName="strong"
              onChange={name => setAttributes({ name })}
              value={name}
            /> <br />
            <RichText
              {...useBlockProps()}
              placeholder={__('Title', 'custom-cut')}
              tagName="h3"
              className="slide-title"
              onChange={title => setAttributes({ title })}
              value={title}
              allowedFormats={["core/bold"]}
            />
            {
              addText &&
              <RichText
                {...useBlockProps()}
                placeholder={__("Add some text to this slide?", "custom-cut")}
                tagName='p'
                className="slide-text"
                onChange={slideCopy => setAttributes({ slideCopy })}
                value={slideCopy}
                allowedFormats={["core/bold"]}
              />
            }
          </div>
        </div>
      </div >
    </>
  );
}