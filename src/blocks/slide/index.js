import { registerBlockType } from '@wordpress/blocks';
import './slide.css';
import edit from './edit.js';
import save from './save.js';
import deprecated from './deprecated.js';

registerBlockType('custom-cut/slide', {
  icon: 'slides',
  edit,
  save,
  deprecated,
});