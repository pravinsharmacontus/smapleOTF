import React, { useEffect, useMemo, useState } from "react";
import IndexedDb from "../helper/IndexDb";
import { Imgplaceholder } from "../assets/images";
import { getInitials, titleToast } from "../helper";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DefaultValueDeclaration } from "../const/DefaultValueDeclaration";

/**
 * @param  {string} {text=""
 * @param  {string} ImageSrc=""}
 */
const DataImageWithName = (props = {}) => {
	const {
		text = "",
		children = "",
		ImageSrc = "",
		placeholder = "",
		customWidth = "",
		customClass = "",
		enableImage = false,
		handleClick = () => { },
	} = props || {};
	const indexedDb = useMemo(() => new IndexedDb(), []);
	const [Image, setImage] = useState(placeholder ? placeholder : Imgplaceholder);

	/**
	 * @param  {string} ImgSrc
	 * getImage from IndexedDB
	 */
	const getImage = async (ImgSrc = "") => {
		const image = await indexedDb.getItem(ImgSrc);
		setImage(image);
	};

	/**
	 * @param  {string} ImageSrc
	 * (ImageSrc->img src string
	 */
	useEffect(() => {
		if (ImageSrc && enableImage) {
			getImage(ImageSrc);
		}
	}, [ImageSrc]);

	const altPrint = (userName = "") => {
		return userName ? titleToast(userName, DefaultValueDeclaration.altTagLength) : null;
	};

	/**
	 * @param  {string} name;
	 * withOut image name firstletter and lastName firstLetter will show avatarPlace
	 */
	const nameInitialLoad = (name = "") => {
		return (
			<svg className="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<text dominantBaseline="central"
					fill="#3c97ce" fontSize="40pt" textAnchor="middle" x="50" y="50">
					{getInitials(name)}
				</text>
			</svg>
		);
	};
	function isEllipsisActive(element = {}) {
		return element.offsetWidth < element.scrollWidth;
	}
	Array.from(document.querySelectorAll('.ellipsis'))
		.forEach(element => {
			if (isEllipsisActive(element)) {
				element.title = element.innerText;
			}
		});

	return (
		<React.Fragment>
			<div
				onClick={() => handleClick()}
				className={`Img-name ${customWidth ? customWidth : ""}`}
			>
				{enableImage &&
					<>
						{ImageSrc ?
							<LazyLoadImage
								src={Image}
								alt={altPrint(text)}
								onError={({ currentTarget }) => {
									currentTarget.onerror = null; // prevents looping
									currentTarget.src = placeholder ? placeholder : Imgplaceholder;
								}}
							/>
							: nameInitialLoad(text)
						}
					</>
				}
				<span
					className={`text-capitalize normal-break-word ${customClass !== "" ? customClass : ""}`}>
					{titleToast(text)}
				</span>
				{children}
			</div>
		</React.Fragment>
	);
};
export default React.memo(DataImageWithName);
