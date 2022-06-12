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
	InnerBlocks,
	AlignmentControl, 
	BlockControls,
	BlockIcon,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
 export default function save( { attributes ,className } ) {
	const tabs = attributes.tabs;
	
let activeTabIndex = 0;
	// useEffect(() => {
	// 	new MDCTabBar(document.querySelector('.mdc-tab-bar'));
	// 	setActiveTab(0)
	// },[]);
	const tabBar = (tabs) => {
		return (
			tabs.sort((a, b) => a.index - b.index).map(tab => {
				return (


			

							<div className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex={tab.index} 	>
								<span className="mdc-tab__content">
									<RichText.Content
											tagName="span"
											className="mdc-tab__text-label"
										value={tab.title}
									/>
								</span>
								<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active': 'mdc-tab-indicator'}>
									<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
								</span>
								<span className="mdc-tab__ripple"></span>
							</div>

			


				


				)
			})
		)
	}

	
	// const displaytabsList = (value) => {
	// 	console.log(attributes)
	// 	const blockProps = useBlockProps.save();
	// 	return(
	// 		<div { ...blockProps }>

	// 		<div className="tab-wrap" >
	// 					<div className={className}>
	// 						<div className="mdc-tab-bar" role="tablist">
	// 							<div className="mdc-tab-scroller">
	// 								<div className="mdc-tab-scroller__scroll-area">
	// 									<div className="mdc-tab-scroller__scroll-content">
	// 										{tabs(tabs)}
										
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
	// 						<InnerBlocks.Content />

	// 					</div>
	// 				</div>

						
	// 		{
	// 				value.map( tabsItem => {
	// 					return(
						
	// 							<div className="tabs-item">
	// 								<RichText.Content
	// 									tagName="h4"
	// 									className="tabs-item-title"
	// 									value={tabsItem.title}
	// 									style={{ height: 58 }}
	// 								/>
	// 							</div>
					
						
	// 					)
	// 				} )
	// 		}
	// 		</div>
		
	// 	)
	// }

	const blockProps = useBlockProps.save();


	return(
		<div  {...blockProps} className="tab-wrap" >
			<div className={className}>
				<div className="mdc-tab-bar" role="tablist">
					<div className="mdc-tab-scroller">
						<div className="mdc-tab-scroller__scroll-area">
							<div className="mdc-tab-scroller__scroll-content">
								{tabBar(attributes.tabs)}
										
							
							</div>
						</div>
					</div>
				</div>
				<InnerBlocks.Content />
			</div>
		</div>
	
	);
}
