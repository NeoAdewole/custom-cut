import { useBlockProps, RichText, InspectorControls, BlockControls, MediaReplaceFlow, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

export default function ({ attributes, setAttributes }) {
  const { showImage = true, shape, addText, slideCopy, mediaURL, mediaAlt, mediaID } = attributes;
  const blockProps = useBlockProps();
  // feature: add slide
  // slider can have images, text (media) etc
  const [mediaPreview, setMediaPreview] = useState(mediaURL)
  const selectMedia = (media) => {
    let newMediaURL = null
    if (isBlobURL(media.url)) {
      newMediaURL = media.url
    } else {
      newMediaURL = media.sizes ? media.sizes.thumbnail.url : media.media_details.sizes[0].source_url
      setAttributes({
        mediaID: media.id,
        mediaAlt: media.alt,
        mediaURL: newMediaURL
      })
      revokeBlobURL(mediaPreview)
    }
    setMediaPreview(newMediaURL)
  }

  const selectMediaUrl = (url) => {
    setAttributes({
      mediaID: null,
      mediaAlt: null,
      mediaURL: url
    });
    setMediaPreview(url);
  }

  return (
    <>
      {mediaPreview && (
        <BlockControls group="inline">
          <MediaReplaceFlow
            name={__('Replace Slide Media', 'custom-cut')}
            mediaID={mediaID}
            mediaURL={mediaURL}
            allowedTypes={['image', 'video']}
            accept={['image/*', 'video/*']}
            onError={error => console.error(error)}
            onSelect={selectMedia}
            onSelectURL={selectMediaUrl}
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
            {__('Remove Media', 'custom-cut')}
          </ToolbarButton>
        </BlockControls>
      )}
      <InspectorControls>
        <PanelBody title={__('Slider Settings', 'custom-cut')}>
          <ToggleControl
            label={__('Show images', 'custom-cut')}
            checked={showImage}
            onChange={setImages => setAttributes({ setImages })}
            help={showImage ? __('Displaying images(hard-coded)', 'custom-cut') : __('Not displaying images', 'custom-cut')}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <InnerBlocks
          orientation="horizontal"
          allowedBlocks={[
            'custom-cut/slide'
          ]}
          template={[
            ['custom-cut/slide',
              {
                name: 'Example Slide',
                title: 'Example slide title',
                slideCopy: ''
              }
            ]
          ]}
        />
      </div>
    </>
  );
}