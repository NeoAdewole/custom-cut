import { useBlockProps, InspectorControls, InnerBlocks, store as blockStore, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import './editor.css'
import { ReactComponent as PrevSvg } from '../../../assets/images/previous.svg'
import { ReactComponent as NextSvg } from '../../../assets/images/next.svg'

const edit = function ({ attributes, setAttributes, clientId }) {
  const { showImage, sliderIndex, sliderId, slideCount, start = 0, slideInterval, autoplay, keyboardNav, swipeNav, indicatorPosition, indicatorStyle } = attributes;

  // figure out how to set initialCount/slideCount variable based on useSelect
  const [current, setCurrent] = useState(start)
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const { count } = useSelect(select => ({
    count: select("core/block-editor").getBlockCount(clientId)
  }));

  // Select all blocks once per relevant change, not on every render.
  const sliderBlocks = useSelect(
    (select) => {
      const blocks = select('core/block-editor').getBlocks();
      return blocks.filter(
        (block) => block.name === 'custom-cut/slider'
      );
    },
    [] // no external dependencies: we recompute only when editor state changes internally
  );

  // Compute this block's index among all slider blocks.
  const computedIndex = sliderBlocks.findIndex(
    (block) => block.clientId === clientId
  ) + 1; // +1 so first is 1, not 0

  useEffect(() => {// Guard 1: if we can't compute an index yet, do nothing.
    if (!computedIndex || computedIndex < 1) return;
    if (sliderIndex !== computedIndex) {// Guard 2: only update when the index actually changes.
      setAttributes({
        sliderIndex: computedIndex,
        sliderId: `slider-${computedIndex}`
      });
    }
  }, [computedIndex, sliderIndex, setAttributes]);

  // Sync slideCount inside a useEffect so it doesn't fire on every render.
  useEffect(() => {
    if (count !== slideCount) {
      setAttributes({ slideCount: count });
    }
  }, [count]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slideCount);
    }, slideInterval || 5000);
    setIsPlaying(autoplay)
    return () => clearInterval(timer);
  }, [isPlaying, slideCount, slideInterval, autoplay]);

  // ToDo: Add dimension controls to slider
  // ToDo: Add border controls to slider
  // ToDo: Add opacity/alpha controls to slide backgrounds

  const blockProps = useBlockProps({
    'data-current': current ? current : start,
    'data-slide-interval': slideInterval,
    'data-autoplay': autoplay,
    'data-slide-count': slideCount
  });

  const randomNumberInRange = (min, max) => {
    // Ensure min and max are treated as integers
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled; // The maximum is inclusive and the minimum is inclusive.
  };

  const randomId = () => {
    // Generate a number between 1 and 100
    const newNumber = randomNumberInRange(1, 100);
    return setRandomNumber(newNumber);
  };

  // console.log("Random ID generated as: ", randomId);
  // console.log("Slider ID", sliderId);
  // console.log("Slide count: ", slideCount);

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
                  name: 'Placeholder Slide',
                  title: 'Placehholder title',
                  slideCopy: 'Empty copy for the slider dem',
                  image: 'https://picsum.photos/768/300?random=' + `${randomId}`
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
            __nextHasNoMarginBottom={true}
          />
          <NumberControl
            label={__('Number of Slides', 'custom-count')}
            isShiftStepEnabled={false}
            onChange={slideCount => setAttributes({ slideCount })}
            shitStep={1}
            value={slideCount}
            __nextHasNoMarginBottom={true}
          />
          <NumberControl
            label={__('Slide Interval', 'custom-cut')}
            help={__('Interval between slide transitions in milliseconds', 'custom-cut')}
            isShiftStepEnabled={true}
            shitStep={1000}
            step={100}
            min={200}
            max={99999}
            onChange={slideInterval => setAttributes({ slideInterval })}
            value={slideInterval}
            __nextHasNoMarginBottom={true}
          />
          <SelectControl
            label={__('Dimension Control', 'custom-cut')}
            help={__('Manage the responsiveness of the carousel', 'custom-cut')}
            options={[
              { label: 'Full Width', value: 'full-width' },
              { label: 'Full Height', value: 'full-height' },
              { label: 'Screen Width', value: 'w-screen' },
              { label: 'Screen Height', value: 'h-screen' },
            ]}
            onChange={dimensionControl => setAttributes({ dimensionControl })}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Autoplay', 'custom-cut')}
            checked={attributes.autoplay}
            onChange={autoplay => setAttributes({ autoplay })}
            help={attributes.autoplay
              ? __('Slider will autoplay', 'custom-cut')
              : __('Slider will not autoplay', 'custom-cut')}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Uniform Slide Height', 'custom-cut')}
            checked={attributes.uniformHeight}
            onChange={uniformHeight => setAttributes({ uniformHeight })}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Keyboard Navigation', 'custom-cut')}
            checked={keyboardNav}
            onChange={keyboardNav => setAttributes({ keyboardNav })}
            help={keyboardNav ? __('Arrow keys navigate slides, Space toggles play/pause', 'custom-cut') : __('Keyboard navigation disabled', 'custom-cut')}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Swipe Navigation', 'custom-cut')}
            checked={swipeNav}
            onChange={swipeNav => setAttributes({ swipeNav })}
            help={swipeNav ? __('Touch swipe gestures enabled', 'custom-cut') : __('Swipe navigation disabled', 'custom-cut')}
            __nextHasNoMarginBottom={true}
          />
          <SelectControl
            label={__('Indicator Position', 'custom-cut')}
            value={indicatorPosition}
            options={[
              { label: 'Bottom', value: 'bottom' },
              { label: 'Top', value: 'top' },
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
            ]}
            onChange={indicatorPosition => setAttributes({ indicatorPosition })}
            __nextHasNoMarginBottom={true}
          />
          <SelectControl
            label={__('Indicator Style', 'custom-cut')}
            value={indicatorStyle}
            options={[
              { label: 'Dots', value: 'dots' },
              { label: 'Numbers', value: 'numbers' },
              { label: 'Bars', value: 'bars' },
            ]}
            onChange={indicatorStyle => setAttributes({ indicatorStyle })}
            __nextHasNoMarginBottom={true}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
}

export default edit;