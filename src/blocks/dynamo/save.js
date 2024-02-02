import {
  useBlockProps, InnerBlocks
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
// slider
export default function ({ attributes }) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );

}