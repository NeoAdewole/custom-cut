import { useBlockProps, RichText, InspectorControls, BlockControls, MediaReplaceFlow, InnerBlocks, store as blockStore } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import './editor.css'

export default function ({ attributes, setAttributes, clientId }) {
  const { showImage, sliderId, slides, slideCount } = attributes;
  const blockProps = useBlockProps();

  // figure out how to set initialCount/slideCount variable based on useSelect
  const [initialCount, setSlideCount] = useState(slideCount)
  const countSlides = () => {
    let counter = useSelect(
      (select) => select('core/block-editor').getBlockCount(clientId)
    )
    setSlideCount(counter)
  }

  const childNames = useSelect(
    (select) => select(blockStore).getBlock(clientId).innerBlocks
  )

  // console.log({ slideCount })
  // childNames.map((slide) => {
  //   console.log(slide.attributes.title)
  // })

  return (
    <>
      <div {...blockProps}>
        <div className='slider-tins'>
          <InnerBlocks
            allowedBlocks={[
              'custom-cut/slide'
            ]}
            template={[
              ['custom-cut/slide',
                {
                  name: 'Example Slide',
                  title: 'Example slide title',
                  slideCopy: 'Empty copy for the slider dem',
                  image: 'https://picsum.photos/768/300'
                }
              ]
            ]}
          />
        </div>
      </div>
      {/* {mediaPreview && (
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
      )} */}
      <InspectorControls>
        <PanelBody title={__('Slider Settings', 'custom-cut')}>
          <ToggleControl
            label={__('Show images', 'custom-cut')}
            checked={showImage}
            onChange={showImage => setAttributes({ showImage })}
            help={showImage ? __('Displaying images(hard-coded)', 'custom-cut') : __('Not displaying images', 'custom-cut')}
          />
          <NumberControl
            isShiftStepEnabled={false}
            onChange={slideCount => setAttributes({ slideCount })}
            shitStep={1}
            value={slideCount}
          />

        </PanelBody>

      </InspectorControls>
    </>
  );
}