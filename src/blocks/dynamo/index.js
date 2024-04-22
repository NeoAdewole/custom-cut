import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor'
import edit from './edit.js'
import './index.css'

registerBlockType('custom-cut/dynamo', {
  icon: 'generic',
  edit,
  save: () => <InnerBlocks.Content />
})