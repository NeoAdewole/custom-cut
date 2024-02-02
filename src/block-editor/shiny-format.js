import './shiny.css';
import { registerFormatType, toggleFormat } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor"
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

registerFormatType("custom-cut/shiny", {
  title: __("Shiny", "custom-cut"),
  tagName: "span",
  className: 'shiny tickles',
  edit({ isActive, onChange, value }) {
    const selectedBlock = useSelect(select => select('core/block-editor').getSelectedBlock());
    return (
      <>
        {selectedBlock?.name === "core/paragraph" &&
          <RichTextToolbarButton
            title={__("Shiny", "custom-cut")}
            icon="superhero"
            isActive={isActive}
            onClick={() => {
              onChange(toggleFormat(value, {
                type: "custom-cut/shiny",
              })
              );
            }}
          />
        }
      </>
    );
  },

});