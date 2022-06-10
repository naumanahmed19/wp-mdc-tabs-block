/**
 * Retrieves the translation of text.
 * https://github.com/WordPress/gutenberg/issues/15893git remote add origin https://github.com/naumanahmed19/w-block-tabs.git
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from "react";
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
	InnerBlocks,


} from '@wordpress/block-editor';
const { useDispatch, useSelect } = wp.data;
import { registerBlockType } from '@wordpress/blocks';
const { createBlock } = wp.blocks;
import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink,
	PlainText

} from '@wordpress/components';

import { MDCTabBar } from '@material/tab-bar';




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
export default function Edit({ attributes: { info = [], templates = [] }, setAttributes, className, clientId }) {

	const blockProps = useBlockProps();

	const [tabCounter, setTabCounter] = useState(0);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [rerender, setRerender] = useState(false);


	const { replaceInnerBlocks } = useDispatch("core/block-editor");
	const { inner_blocks } = useSelect(select => ({
		inner_blocks: select("core/block-editor").getBlocks(clientId)
	}));



	//  const MY_TEMPLATE = [['core/column',{},[['core/paragraph',{'placeholder':'Inhalt linke Spalte'}]]],['core/column',{},[['core/paragraph',{'placeholder':'Inhalt rechte Spalte'}]]]];


	const toggleNone = (className) => {
		let elements = document.getElementsByClassName(className)
		console.log(elements)
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].style.display === "none") {
				elements[i].style.display = "";
			} else {
				elements[i].style.display = "none";
			}
		}
	}

	const handleAddTab = () => {
		setTabCounter(tabCounter => tabCounter + 1);
		let tabId = `tab${tabCounter}`;
		setAttributes({
			info: [...info, {
				tabId,
				index: info.length,
				title:'Tab title',
				description: '',
			}],
			// templates: [...templates, ['brand/tab', {'tabScreenIndex': templates.length, tabId, index: templates.length, className: 'brand-tab-screen'}, [
			// 	['core/paragraph', { placeholder: 'Add tab content' }],
			// ]],]
		});



		let attr = { 'tabScreenIndex': info.length, tabId, index: info.length, className: 'brand-tab-screen' };


		//let innerBlocks =[ ['core/paragraph', { placeholder: 'Add tab content' }]];


		let blocks = [...inner_blocks, ...[createBlock('brand/tab', attr, [createBlock('core/paragraph')])]];
		console.log(blocks)
		// let newBlock =  ['brand/tab', {'tabScreenIndex': info.length, tabId, index: info.length, className: 'brand-tab-screen'}, [
		// 	['core/paragraph', { placeholder: 'Add tab content' }],
		// ]];

		// let blocks = [...inner_blocks,...newBlock];
		// console.log(blocks)
		setActiveTab(tabCounter, blocks)
	};



	const setActiveTab = (tabIndex, blocks = [...inner_blocks]) => {
		setActiveTabIndex(tabIndex);
		const inner_blocks_new = blocks.map((innerBlock, index) => {
			let block = innerBlock;
			block.attributes.style = { display: 'none' }
			if (tabIndex == index) {
				block.attributes.style = { display: 'block' }
			}
			return block;
		});


		replaceInnerBlocks(clientId, inner_blocks_new, false);
	};


	/**
	 * Action to remove a tab
	 * @param {*} tab 
	 */

	const handleRemoveTab = (tab) => {

		const newTemplates = templates.filter(item => item[1].index != tab.index)
			.map(i => {
				if (i[1].index > tab.index) {
					i[1].index -= 1;
				}
				return i;
			});
		const newTabs = info.filter(item => item.index != tab.index).map(i => {
			if (i.index > tab.index) {
				i.index -= 1;
			}
			return i;
		});

		/**
		 * update all state variables
		 * 
		 */
		setAttributes({
			info: newTabs,
			templates: newTemplates
		});

		/**
		 * By default wordpress does not allow to update InnerBock compoment with new changes
		 * To delete all iteam under a tab we have to find client id of tab and remove it using
		 * dispatch method
		 * 
		 */
		let blocks = [...inner_blocks];
		blocks.splice(tab.index, 1);

		/**
		 * Set active tab and update blocks
		 * 
		 */
		const previousTabIndex = tab.index == 0 ? 0 : tab.index - 1;
		setActiveTab(previousTabIndex, blocks)

	}


	const tabs = (value) => {
		return (
			value.sort((a, b) => a.index - b.index).map(tab => {
				return (


			

							<div className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex={tab.index} 	onClick={() => setActiveTab(tab.index)}>
								<span className="mdc-tab__content">
									{/* <span className="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
								 */}
										<RichText
											tagName="span"
											className="mdc-tab__text-label"
											placeholder={`Tab title`}
											value={tab.title}
											onChange={title => {
												const newObject = Object.assign({}, tab, {
													title: title
												});
												setAttributes({
													info: [...info.filter(
														item => item.index != tab.index
													), newObject]
												});

											}}
										/>
									
								</span>
								
								<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active': 'mdc-tab-indicator'}>
									<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
								</span>
								<span className="mdc-tab__ripplex"></span>
								
								
						{/* <Button
							variant='primary'
							className="remove-item"
							onClick={() => handleRemoveTab(infoItem)}
						>&times;</Button> */}
							</div>

			


				


				)
			})
		)
	}

	useEffect(() => {
		new MDCTabBar(document.querySelector('.mdc-tab-bar'));
		setActiveTab(0)
	},[]);

	return (
		<div  {...blockProps} className="tab-wrap" >
			<div className={className}>
				<div className="mdc-tab-bar" role="tablist">
					<div className="mdc-tab-scroller">
						<div className="mdc-tab-scroller__scroll-area">
							<div className="mdc-tab-scroller__scroll-content">
								{tabs(info)}
							<div className="mdc-tab mdc-tab--active" role="tab" aria-selected="true"  onClick={handleAddTab}>
								<span className="mdc-tab__content">
									<span className="mdc-tab__icon material-icons" aria-hidden="true">add</span>
								</span>
								<span className="mdc-tab-indicator">
									<span className="mdc-tab-indicator__content"></span>
								</span>
								<span className="mdc-tab__ripple"></span>
							</div>
							</div>
						</div>
					</div>
				</div>
				<InnerBlocks templateLock="all" />
			</div>
		</div>
	);
}
