/**
 * Retrieves the translation of text.
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

import { registerBlockType } from '@wordpress/blocks';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink,

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
export default function Edit({ attributes: { info = [], templates = [] }, setAttributes, className ,clientId}) {


	const [tabCounter, setTabCounter] = useState(0);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [rerender, setRerender] = useState(false);
	//  const MY_TEMPLATE = [['core/column',{},[['core/paragraph',{'placeholder':'Inhalt linke Spalte'}]]],['core/column',{},[['core/paragraph',{'placeholder':'Inhalt rechte Spalte'}]]]];




	const handleAddTab = () => {
		setTabCounter(tabCounter => tabCounter + 1);
		let tabId =  `tab${tabCounter}`;
		setAttributes({
			info: [...info, {
				tabId,
				index: info.length,
				title: "",
				description: "",
			}],
			templates: [...templates, ['brand/tab', { tabId, index: templates.length, className: 'brand-tab-screen' }, [
				['core/paragraph', { placeholder: 'Enter side content... ' + tabId }],
			]],]
		});
		setActiveTab(tabCounter)
	};


	
	const setActiveTab = (index) => {
		setActiveTabIndex(index);
	};


	/**
	 * Action to remove a tab
	 * @param {*} tab 
	 */

	const handleRemoveTab = (tab) => {

		/**
		 * TODO: Find previous item by and set to active
		 */
		//setActiveTab(activeTabIndex => tabCounter - 1 )


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
	

		console.log('new templates ....', newTemplates)

	
		 setAttributes({
			info:newTabs,
			templates: newTemplates
		});


	
	

			console.log(wp.data.select( 'core/editor'),'test');
		const currentBlock =  wp.data.select( 'core/block-editor' ).getBlocksByClientId
		console.log(wp.data.select( 'core/block-editor' ).getBlocks());
		const childBlocks = currentBlock.innerBlocks;

	


		var index = wp.data.select('core/editor').getBlocks().map(function(block) { return block.clientId == clientId; }).indexOf(true) + 1;

			console.log(index,'found')



		wp.data.dispatch( 'core/block-editor' ).removeBlocks( clientId );


		// wp.data.dispatch( 'brand/editor' ).resetBlocks( wp.blocks.parse( 'My content' ) );

		// console.log(wp.data.select( 'core/block-editor' ).getBlocks(),'after remove');

		// console.log('should be update',info,templates)



		console.log('after ....')

	

		// setAttributes(({ templates}) =>

		// 	templates.filter(item => item[1].tab !== infoItem.index)
		// );


		// let tempx = templates.filter(item => item[1].tab !== infoItem.index)
		// console.log(tempx);


		// setTabCounter(tabCounter => tabCounter - 1);

		// 	 console.log(infoItem.index,template);
		// //	 setTemplate([])
		// 	 setTemplate({ template: tempx })

		//  console.log(template);

		//  let allTemplates = [...template];
		//  newTemplates = allTemplates.splice(infoItem.index, 1)
		//  setTemplate(allTemplates);


		//example
		//  console.log('before remove')
		// let array = template
		// let newArray = array.splice(infoItem.index, 1)
		// console.log(array, newArray)
		// console.log('after remove')
		// setTemplate(array);

		//   console.log('afterset template remove')
		//  console.log(template,template.slice(template.indexOf((infoItem.index), 1)));
		//  	console.log(template,template.splice(template.indexOf((infoItem.index), 1)));
		//  setTemplate());

	}


	const tabs = (value) => {
		return (
			value.map(infoItem => {
				return (
					<li className='tab' >
						<span onClick={(e) => setActiveTab(infoItem.index)}>
							<RichText
								tagName="span"
								className="info-item-title"
								placeholder={`Tab ${infoItem.tabId} title`}
								value={infoItem.title}


								onChange={title => {
									const newObject = Object.assign({}, infoItem, {
										title: title
									});
									setAttributes({
										info: [...info.filter(
											item => item.index != infoItem.index
										), newObject]
									});

								}}
							/>
						</span>

						<Button
							variant='primary'
							className="remove-item"
							onClick={() => handleRemoveTab(infoItem)}
						>&times;</Button>

					</li>
				)
			})
		)
	}


	const innberBockLayout = (value) => {

			console.log('value tempal',value)
		return (
		
			<div>
					{JSON.stringify(templates)}


				<InnerBlocks
				template={templates}
				
				onChange={title => {
					console.log(title,'change inner block...')
					const newObject = Object.assign({}, infoItem, {
						title: title
					});
					setAttributes({
						info: [...info.filter(
							item => item.index != infoItem.index
						), newObject]
					});

				}}
				__experimentalCaptureToolbars={true}
				templateLock="all" />
			
		
			</div>
		)
	}

	

	return (
		
		<div  { ...useBlockProps() } className="tab-wrap" >
			Total : {tabCounter} , Active Tab: {activeTabIndex} ,,
			--------

			{/* {
				useEffect(() => {
					console.log("count2 changed!",templates);
					setRerender(!rerender);
				  }, [templates])
			
			}
		 */}
		
			<div className={className}>
				<ul className="tabs" >
					{tabs(info)}

					<li onClick={handleAddTab}><span class="dashicons dashicons-plus"></span> Add Tab</li>
				</ul>

				{innberBockLayout(templates)}
				
			</div>
		</div>
	);
}
