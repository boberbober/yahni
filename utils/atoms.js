
import { atom, selector, DefaultValue, atomFamily } from 'recoil'


export const topStoriesAtom = atom({
	key: `topStories`,
	default: []
})

export const storiesAtom = atomFamily({
	key: 'stories',
	default: []
})

export const dbConnectedAtom = atom({
	key: `dbConnected`,
	default: false
})

// export const filteredProductsAtom = selector({
// 	key: 'filteredProducts',
// 	get: ({ get }) => {

// 		const scope = get(scopeAtom)

// 		const sortAttr = get(sortAttrAtom)
// 		const sortOrder = get(sortOrderAtom)
// 		const sortFunc = (a, b) => sortOrder === 'min'
// 			? a[sortAttr] - b[sortAttr]
// 			: b[sortAttr] - a[sortAttr]

// 		if (scope === 'bookmarks') {

// 			const bProducts = get(bookmarksProductsAtom)
// 			return [...bProducts].sort(sortFunc)
			
// 		} else {

// 			const fProducts = get(productsAtom)
			
// 			const price = get(formValueAtoms('price'))
// 			const screenSize = get(formValueAtoms('screenSize'))
// 			const refreshRate = get(formValueAtoms('refreshRate'))
// 			const responseTime = get(formValueAtoms('responseTime'))
// 			const pixelDensity = get(formValueAtoms('pixelDensity'))
// 			const resolutionV = get(formValueAtoms('resolutionV'))
// 			const brightness = get(formValueAtoms('brightness'))
// 			const aspectRatioFloat = get(formValueAtoms('aspectRatioFloat'))
// 			const contrast = get(formValueAtoms('contrast'))
// 			const ports = get(formMapAtoms('ports'))
// 			const features = get(formArrAtoms('features'))
// 			const panelTypes = get(formArrAtoms('panelTypes'))

// 			// console.log(fProducts)
// 			// console.log(price)
// 			// for (let p of fProducts) {
// 				// if (!(p.price <= price[1] || p.price >= price[1]))
// 					// console.log(p)
// 				// console.log(p.slug, p.price, (p.price >= price[0] && p.price <= price[1]))
// 			// }

// 			return fProducts.filter(p => (
// 				p.price >= price[0] 
// 					&& p.price <= price[1] 
// 				&& p.screenSize >= screenSize[0] 
// 					&& p.screenSize <= (screenSize[1] + 0.9)
// 				&& p.refreshRate >= refreshRate[0]
// 				&& p.responseTime <= responseTime[0]
// 				&& p.pixelDensity >= pixelDensity[0]
// 				&& p.brightness >= brightness[0]
// 				&& p.resolutionV >= resolutionV[0]
// 				&& p.contrast >= contrast[0]
// 				&& p.aspectRatioFloat >= aspectRatioFloat[0] 
// 					&& p.aspectRatioFloat <= aspectRatioFloat[1]
// 				&& checkPorts(ports, p)
// 				&& checkFeatures(features, p)
// 				&& checkPanelTypes(panelTypes, p)
// 			)).sort(sortFunc)
// 		}
// 	}
// })
