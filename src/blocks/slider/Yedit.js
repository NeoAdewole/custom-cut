import {
  useBlockProps, RichText, InspectorControls, BlockControls,
  MediaReplaceFlow, MediaPlaceholder, selectMedia, selectMediaURL, mediaPreview,
  InnerBlocks
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { showImage = true, sliderId, slides } = attributes
  const blockProps = useBlockProps();

  (sliderId) => {
    setAttributes({
      sliderId: 1
    })
  }

  return (
    <>
      <div {...useBlockProps()}>
        <InspectorControls>
          <Panel>
            {slides.map((slide, index) => {
              <PanelBody title={__(`slide_${index + 1}`, 'custom-cut')}>
                <PanelRow>
                  <SelectControl
                    label={__("Display images", "custom-cut")}
                    value={attributes.showImage}
                    options={[
                      { label: __("Show Images", "custom-cut"), value: true },
                      { label: __("hide Images", "custom-cut"), value: false }
                    ]}
                    onChange={(showImage) => setAttributes(showImage)}
                  />
                </PanelRow>
                <PanelRow>
                  {slides &&
                    <div id={slide.id} className={`slide_${index + 1}`}>
                      <h3>{slide.title}</h3>
                      <img src={slide.image} alt='' />
                    </div>
                  }
                </PanelRow>
              </PanelBody>
            })}
          </Panel>
        </InspectorControls>
      </div>
    </>
  )
}