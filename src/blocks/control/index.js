import { registerBlockType } from '@wordpress/blocks';
import edit from './edit.js';

registerBlockType('custom-cut/control', {
  edit,
});