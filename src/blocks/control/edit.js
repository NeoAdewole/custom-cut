import { __ } from '@wordpress/i18n';
import './editor.scss';
import { useBlockProps } from '@wordpress/block-editor';
export default function Edit() {
    return (
        <p { ...useBlockProps() }>
            { __(
                'Control Block – hello from the editor!',
                'Control-block-demo'
            ) }
        </p>
    );
}