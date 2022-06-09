/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
 import { 
	useBlockProps, 
	RichText, 
	AlignmentControl, 
	BlockControls,
	BlockIcon,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks
} from '@wordpress/block-editor';

import { registerBlockType } from '@wordpress/blocks';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
} from '@wordpress/components';



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


import {
	Placeholder,
	Button,
} from "@wordpress/components";


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes }) {

	const blockProps = useBlockProps();
	// const onChangeContent = ( newContent ) => {
	// 	setAttributes( { content: newContent } )
	// }
	// const onChangeAlign = ( newAlign ) => {
	// 	setAttributes( { 
	// 		align: newAlign === undefined ? 'none' : newAlign, 
	// 	} )
	// }

	const onChangeAffiliateLink = ( newAffiliateLink ) => {
		setAttributes( { affiliateLink: newAffiliateLink === undefined ? '' : newAffiliateLink } )
	}
	
	const onChangeLinkLabel = ( newLinkLabel ) => {
		setAttributes( { linkLabel: newLinkLabel === undefined ? '' : newLinkLabel } )
	}
	
	// const toggleNofollow = () => {
	// 	setAttributes( { hasLinkNofollow: ! hasLinkNofollow } )
	// }
	const onChangeAlign = ( newAlign ) => {
		setAttributes( { 
			align: newAlign === undefined ? 'none' : newAlign, 
		} )
	}
	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } )
	}


	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } )
	}
	const onChangeTextColor = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } )
	}

	const onAddTab = ( tab ) => {
		
		setAttributes( { textColor: newTextColor } )
	}
	return (
		<>
			<InspectorControls>
				<PanelColorSettings 
					title={ __( 'Color settings', 'my-affiliate-block' ) }
					initialOpen={ false }
					colorSettings={ [
						{
						  value: attributes.textColor,
						  onChange: onChangeTextColor,
						  label: __( 'Text color', 'my-affiliate-block' ),
						},
						{
						  value: attributes.backgroundColor,
						  onChange: onChangeBackgroundColor,
						  label: __( 'Background color', 'my-affiliate-block' ),
						}
					] }
				/>

				<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Affiliate link', 'my-affiliate-block' )}
								value={ attributes.affiliateLink }
								onChange={ onChangeAffiliateLink }
								help={ __( 'Add your affiliate link', 'my-affiliate-block' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Link label', 'my-affiliate-block' )}
								value={ attributes.linkLabel }
								onChange={ onChangeLinkLabel }
								help={ __( 'Add link label', 'my-affiliate-block' )}
							/>
						</fieldset>
					</PanelRow>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>

			<div { ...blockProps }>
				<InnerBlocks />
			
			<RichText 
				
				tagName="p"
				onChange={ onChangeContent }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				value={ attributes.content }
				placeholder={ __( 'Write your text...' ) }
				style={ { textAlign: attributes.align } }
			/>
			</div>
		</>
	);
}
