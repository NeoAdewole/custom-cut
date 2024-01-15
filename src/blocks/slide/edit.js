import {
  useBlockProps, InspectorControls, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow
} from '@wordpress/block-editor';
import {
  PanelBody, ToggleControl, TextareaControl, Spinner, ToolbarButton, Tooltip, Icon, TextControl, Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useState } from '@wordpress/element';

export default function ({ attributes, setAttributes, context, isSelected }) {
  const {
    name, title, addText, slideCopy, mediaID, mediaAlt, mediaURL
  } = attributes;

  const blockProps = useBlockProps();

  const [mediaPreview, setMediaPreview] = useState(mediaURL)
  // slide can have images, text (media) etc

  const selectMedia = (media) => {
    console.log(media.sizes);
    let newMediaURL = null
    if (isBlobURL(media.url)) {
      newMediaURL = media.url
    } else {
      newMediaURL = media.sizes ? media.sizes.full.url : media.media_details.sizes.full.source_url
      setAttributes({
        mediaID: media.id,
        mediaAlt: media.alt,
        mediaURL: newMediaURL
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

  const imageClass = `wp-image-${mediaID} img-${context["clearblocks/image-shape"]}`;

  // const [activeSocialLink, setActiveSocialLink] = useState(null);

  setAttributes({
    imageShape: context["custom-cut/slide"]
  })

  return (
    console.log(attributes),
    console.log(addText),
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
      <InspectorControls>
        <PanelBody title={__('Slide Settings', 'custom-cut')}>
          {
            mediaPreview && !isBlobURL(mediaPreview) &&
            <TextareaControl
              label={__('Alt Attribute', 'custom-cut')}
              value={mediaAlt}
              onChange={mediaAlt => setAttributes({ mediaAlt })}
              help={__(
                'Description of your image for screen readers.',
                'clearblocks'
              )}
            />
          }
          <ToggleControl
            label={__('Add Text', 'custom-cut')}
            checked={addText}
            onChange={addText => setAttributes({ addText })}
            help={addText ? __('Add some text to this slide', 'custom-cut') : __('Not displaying slide text', 'custom-cut')}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className="inner-slide">
          {mediaPreview && <img src={mediaPreview} alt={mediaAlt} className={imageClass} />}
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
          <div className='slide-copy'>
            <RichText
              placeholder={__('Slide Name', 'custom-cut')}
              tagName="strong"
              onChange={name => setAttributes({ name })}
              value={name}
            /> <br />
            <RichText
              placeholder={__('Title', 'clearblocks')}
              tagName="span"
              onChange={title => setAttributes({ title })}
              value={title}
            />
            {
              addText &&
              <RichText
                tagName='h2'
                placeholder={__("Add some text to slide?", "custom-cut")}
                onChange={slideCopy => setAttributes({ slideCopy })}
                value={slideCopy}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
}