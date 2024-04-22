import { BorderRadiusControl, useBlockProps, useInnerBlocksProps, RichText, InspectorControls, BlockControls, InnerBlocks, store as blockStore } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, dispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import './editor.css'

export default function ({ attributes, setAttributes, clientId }) {
  const { showImage, sliderId, slides, slideCount, start = 0, slideInterval } = attributes;

  // figure out how to set initialCount/slideCount variable based on useSelect
  const [current, setCurrent] = useState(start)

  const { count } = useSelect(select => ({
    count: select("core/block-editor").getBlockCount(clientId)
  }));

  // ToDo: Add border controls to slider
  // ToDo: Add opacity/alpha controls to slide bacgrounds

  setAttributes({ sliderId: clientId })
  setAttributes({ slideCount: count })

  const blockProps = useBlockProps({
    dataCurrent: current ? current : start,
    dataInterval: slideInterval,
    count: slideCount
  });

  return (
    <>
      {/* {slideCount > 0 && console.log("Slide Count:", slideCount)} */}
      <h3>Current Slide edit: {current && current}</h3>
      <div {...blockProps} >
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
      <InspectorControls>
        <PanelBody title={__('Slider Settings', 'custom-cut')}>
          <ToggleControl
            label={__('Show images', 'custom-cut')}
            checked={showImage}
            onChange={showImage => setAttributes({ showImage })}
            help={showImage ? __('Displaying images(hard-coded)', 'custom-cut') : __('Not displaying images', 'custom-cut')}
          />
          <NumberControl
            label={__('Number of Slides', 'custom-count')}
            isShiftStepEnabled={false}
            onChange={slideCount => setAttributes({ slideCount })}
            shitStep={1}
            value={slideCount}
          />
          <NumberControl
            label={__('Slide Interval', 'custom-cut')}
            help="Interval between slide transitions in milliseconds"
            isShiftStepEnabled={true}
            shitStep={1000}
            step={100}
            min={200}
            max={99999}
            onChange={slideInterval => setAttributes({ slideInterval })}
            value={slideInterval}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
}