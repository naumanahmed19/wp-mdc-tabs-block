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
	InnerBlocks,
	InspectorControls ,

} from '@wordpress/block-editor';
const { useDispatch, useSelect } = wp.data;

const { createBlock } = wp.blocks;

import { MDCTabBar } from '@material/tab-bar';
import { MDCTabScroller } from '@material/tab-scroller';
import { plus } from '@wordpress/icons';

const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map(block => block.name).filter(blockName => blockName !== 'mdc/tabs');
// 
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
	ToggleControl ,
	PanelBody,
	TextControl
} from "@wordpress/components";


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {


	const { className, attributes, setAttributes,clientId ,context } = props;
	const { tabs = [], templates = [], filterStyle,recordId } = attributes;


	const blockProps = useBlockProps();

	const [tabCounter, setTabCounter] = useState(0);
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const [payload,setPayload] = useState({value1:"dummy", value9:"dummy1"})

	const { replaceInnerBlocks } = useDispatch("core/block-editor");
	const { inner_blocks } = useSelect(select => ({
		inner_blocks: select("core/block-editor").getBlocks(clientId)
	}));



	/**
	 * Add a new tab on button click
	 * 
	 */
	const handleAddTab =  () => {
		setTabCounter(tabCounter => tabCounter + 1);
		let tabId = `tab${tabCounter}`;

		let newTabs =  [...tabs, {
			tabId,
			index: tabs.length,
			title: `Tab ${tabs.length} title`,
			description: '',
		}];
		 setAttributes({
			tabs:newTabs,
		});

		let attr = { 'tabScreenIndex': tabs.length, tabId, index: tabs.length, className: 'brand-tab-screen', };
		let blocks = [...inner_blocks, ...[createBlock('brand/tab', attr,)]];

		setActiveTab(tabs.length, blocks,newTabs)

	};


	/**
	 *  Set active tab
	 * 
	 * @param {number} tabIndex 
	 * @param {array} blocks 
	 */
	const setActiveTab = (tabIndex, blocks = [...inner_blocks],newTabs = tabs) => {
		setActiveTabIndex(tabIndex);



		

		//Scroll tab bar
		let tab = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
		tab.scrollIntoView(tabIndex)

		const inner_blocks_new = blocks.map((innerBlock, index) => {
			let block = innerBlock;
			block.attributes.style = { display: 'none' }
			if (tabIndex == index) {
				block.attributes.style = { display: 'block' }
			}
			return block;
		});




		replaceInnerBlocks(clientId, inner_blocks_new, false);

		console.log('updateing.. ',tabIndex)
		setTimeout(()=>{
			console.log(newTabs[tabIndex])
			setAttributes({activeTab : newTabs[tabIndex]})
		},100)

	};


	/**
	 * Action to remove a tab
	 * @param {object} tab 
	 */

	const handleRemoveTab = (tab) => {


		const newTabs = tabs.filter(item => item.index != tab.index).map(i => {
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
			tabs: newTabs,
		});

		/**
		 * By default wordpress does not allow to update InnerBock compoment with new changes
		 * To delete all iteam under a tab we have to find client id of tab and remove it using
		 * dispatch method
		 * 
		 */
		let blocks = inner_blocks;
		blocks.splice(tab.index, 1);

		/**
		 * Set active tab and update blocks
		 * 
		 */
		const previousTabIndex = tab.index == 0 ? 0 : tab.index - 1;
		setActiveTab(previousTabIndex, blocks,newTabs)

	
	}


	const tabBar = (value) => {
		return (
			value.sort((a, b) => a.index - b.index).map(tab => {
				return (
					<div className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex={tab.index} onClick={() => setActiveTab(tab.index)}>
						<span className="mdc-tab__content">
							{/* <span className="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>
								 */}
							<RichText
								tagName="span"
								className="mdc-tab__text-label"
								placeholder={`Tab title`}
								allowedFormats={['core/bold', 'core/italic']}
								value={tab.title}
								onChange={title => {
									const newObject = Object.assign({}, tab, {
										title: title
									});
									setAttributes({
										tabs: [...tabs.filter(
											item => item.index != tab.index
										), newObject]
									});

								}}
							/>

						</span>
						<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
							<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
						</span>
						<span className="mdc-tab__ripplex"></span>
						<Button
							isSmall={true}
							className="components-button block-editor-inserter__toggle has-icon"
							iconSize={24}
							onClick={() => handleRemoveTab(tab)}
						>&times;</Button>
					</div>
				)
			})
		)
	}


	useEffect(() => {
		/**
		 * set active tab and tab mdc tab instance 
		 * 
		 */
		new MDCTabBar(document.querySelector('.mdc-tab-bar'));
	
		setActiveTab(0)
		/**
		 * initialize atleaset one tab
		 *  
		 */
		if (tabs.length == 0) {

	
		

			handleAddTab()

		
		}else{
			setTimeout(()=>{
				setAttributes({activeTab : tabs[0]})
			},100)
		}


	}, []);

	let newTabValue =''
	return (
		<div  {...blockProps} className="tab-wrap">

			<InspectorControls>




				<PanelBody title="Settings" initialOpen={true}>
					<ToggleControl
						label="Tabbar filter style?"
						help="Change thestyle of tabbar"
						checked={filterStyle}
						onChange={() => setAttributes({ filterStyle: !filterStyle })}
					/>
				</PanelBody>
			</InspectorControls>


			<div className={className}>


				<div className={filterStyle ? 'mdc-tab-bar brand-filter':'mdc-tab-bar'} role="tablist">
				
					<div className="mdc-tab-scroller">
						<div className="mdc-tab-scroller__scroll-area">
							<div className="mdc-tab-scroller__scroll-content">

						  {tabBar(tabs) }
							
						
							</div>
						</div>
						<div className="mdc-tab" role="tab" aria-selected="true" onClick={handleAddTab}>
							<span className="mdc-tab__content">
								<span className="mdc-tab__icon material-icons" aria-hidden="true">
									{plus}
								</span>
							</span>
							<span className="mdc-tab-indicator">
								<span className="mdc-tab-indicator__content"></span>
							</span>
							<span className="mdc-tab__ripple"></span>
						</div>
					</div>
					
				</div>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					templateLock="all"
				/>
			</div>
		</div>
	);
}
