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
    name, title, addText, slideCopy, mediaID, mediaAlt, mediaURL, mediaStyle: { image, size, position, repeat, url }
  } = attributes;

  const blockProps = useBlockProps();
  // let { backgroundImage, url } = mediaStyle;

  const [mediaPreview, setMediaPreview] = useState(mediaURL)
  const [mediaStyle, setMediaStyle] = useState({ image, size, position, repeat, url })
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
        mediaURL: newMediaURL
      })
      revokeBlobURL(mediaPreview)
    }
    setMediaPreview(newMediaURL)

    if (mediaURL) {
      let newStyle = {
        image: mediaURL ? `url(${mediaURL})` : `url(${media.media_details.sizes.full.source_url})`,
        url: mediaURL,
        size: 'cover',
        position: 'center',
        repeat: 'no-repeat'
      }
      setMediaStyle(newStyle)
    }
  }

  const selectMediaURL = (url) => {
    setAttributes({
      mediaID: null,
      mediaAlt: null,
      mediaURL: url
    });

    setMediaPreview(url);
  }

  const mediaClass = `slide-image wp-image-${mediaID}`;
  const slideStyle = `background: ${mediaStyle.image} ${mediaStyle.size} ${mediaStyle.position} ${mediaStyle.repeat}`

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
            label={__('Title', 'clearblocks')}
            help={__('Give this slide a title', 'custom-cut')}
            value={title}
            onChange={title => setAttributes({ title })}
          />
        </PanelBody>
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
          <div className='slide-copy'>
            <RichText
              placeholder={__('Slide Name', 'custom-cut')}
              tagName="strong"
              onChange={name => setAttributes({ name })}
              value={name}
            /> <br />
            <RichText
              placeholder={__('Title', 'clearblocks')}
              tagName="h3"
              className="slide-title"
              onChange={title => setAttributes({ title })}
              value={title}
            />
            {
              addText &&
              <RichText
                placeholder={__("Add some text to this slide?", "custom-cut")}
                tagName='p'
                className="slide-text"
                onChange={slideCopy => setAttributes({ slideCopy })}
                value={slideCopy}
              />
            }
          </div>
        </div>
      </div >
    </>
  );
}