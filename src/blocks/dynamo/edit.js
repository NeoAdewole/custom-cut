import { useBlockProps, InspectorControls, InnerBlocks, blockEditorStore, BlockControls } from '@wordpress/block-editor';
import { SelectControl, ToggleControl, Panel, PanelBody, PanelRow, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n'
import { store as blockStore } from '@wordpress/blocks';
// import { select } from '@wordpress/core-editor';
import { useSelect, select } from '@wordpress/data';
import { useRef, useEffect } from '@wordpress/element';
import './editor.css'


export default function ({ attributes, setAttributes, context, clientId }) {
  const { isDynamo, slides } = attributes
  const blockProps = useBlockProps()

  const slideCount = useSelect(
    (select) => select('core/block-editor').getBlockCount(clientId)
  )
  const previousSlideCount = useRef(slideCount)
  useEffect(() => {
    previousSlideCount.current = slideCount;
  }, [slideCount, clientId])

  const hasChildren = (slideCount > 0) ? true : false
  // console.log(hasChildren)

  return (
    <>
      <div {...blockProps}>
        <div className='slides'>
          <InnerBlocks
            allowedBlocks={[
              'custom-cut/slide'
            ]}
            template={[
              ['custom-cut/slide', {
                slideId: '99', title: 'Child slide in slider', content: "Slide placeholder content",
                slideCopy: 'Slide copy within slider',
                mediaID: 0,
                image: "https://picsum.photos/200/300"
              }]
            ]}
          />
        </div>
        {isDynamo &&
          slides.map((slide, index) => {
            <div className={`slide_${index}`}>
              <img src={`slide.image`} alt='' />
            </div>
          })
        }
      </div>
      <BlockControls>
        <ToolbarButton
          onClick={() => {
            setAttributes({
              mediaID: 0,
              mediaAlt: "",
              mediaURL: ""
            });
          }}
        />
      </BlockControls>
      <InspectorControls>
        <Panel header="Custom Slide Styles">
          <PanelBody title='Dynamism'>
            {__('Is Dynamo?', 'custom-cut')}
            <PanelRow>
              <ToggleControl
                label={__('Dynamo', 'custom-cut')}
                checked={isDynamo}
                onChange={isDynamo => setAttributes({ isDynamo })}
                help={isDynamo ? __('Make this static?', 'custom-cut') : __('Make this dynamic?', 'custom-cut')}
              />
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>
      {
        isDynamo ? <h3>Why is suits popping off?</h3> : <h3>Dynamism off</h3>
      }
    </>
  );
}