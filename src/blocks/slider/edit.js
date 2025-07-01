import { useBlockProps, InspectorControls, InnerBlocks, store as blockStore } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import './editor.css'
import { ReactComponent as PrevSvg } from '../../../assets/images/previous.svg'
import { ReactComponent as NextSvg } from '../../../assets/images/next.svg'

export default function ({ attributes, setAttributes, clientId }) {
  const { showImage, sliderId, slides, slideCount, start = 0, slideInterval, autoplay } = attributes;

  // figure out how to set initialCount/slideCount variable based on useSelect
  const [current, setCurrent] = useState(start)
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const { count } = useSelect(select => ({
    count: select("core/block-editor").getBlockCount(clientId)
  }));

  useEffect(() => {

  }, [autoplay]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slideCount);
    }, slideInterval || 5000);
    setIsPlaying(autoplay)
    console.log("Autoplay is:", autoplay)
    return () => clearInterval(timer);
  }, [isPlaying, slideCount, slideInterval, autoplay]);

  // ToDo: Add dimension controls to slider
  // ToDo: Add border controls to slider
  // ToDo: Add opacity/alpha controls to slide backgrounds

  setAttributes({ sliderId: clientId })
  setAttributes({ slideCount: count })

  const blockProps = useBlockProps({
    'data-current': current ? current : start,
    'data-slide-interval': slideInterval,
    'data-autoplay': autoplay,
    'data-slide-count': slideCount,
    count: slideCount,
    dataInterval: slideInterval,
    count: slideCount
  });

  return (
    <>
      <div {...blockProps} >
        <div className='carousel'>
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
        <div className='controls'>
          <button className='btn left'>
            <span className='previous'>
              < PrevSvg />
              <span className='hidden'>Prev</span>
            </span>
          </button>
          <button
            className='btn center'
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-pressed={isPlaying}
          >
            <span className='pause'>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button className='btn right'>
            <span className='next'>
              < NextSvg />
              <span className='hidden'>Next</span>
            </span>
          </button>
        </div>
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
          <SelectControl
            label={__('Dimension Control', 'custom-cut')}
            help={__("Manage the responsiveness of the carousel", "custom-cut")}
            options={[
              { label: 'Full Width', value: 'full-width' },
              { label: 'Full Height', value: 'full-height' },
              { label: 'Screen Width', value: 'w-screen' },
              { label: 'Screen Height', value: 'h-screen' },
            ]}
          />
          <ToggleControl
            label={__('Autoplay', 'custom-cut')}
            checked={attributes.autoplay}
            onChange={autoplay => setAttributes({ autoplay })}
            help={attributes.autoplay ? __('Slider will autoplay', 'custom-cut') : __('Slider will not autoplay', 'custom-cut')}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
}