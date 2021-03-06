/*
 * @copyright
 */

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer'],
	function(jQuery, Renderer) {
	"use strict";


	/**
	 * ObjectNumber renderer. 
	 * @namespace
	 */
	var ObjectNumberRenderer = {
	};
	
	
	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 * 
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	ObjectNumberRenderer.render = function(oRm, oON){
		var sTooltip,
			sTextDir = oON.getTextDirection(),
			sTextAlign = oON.getTextAlign(),
			bPageRTL = sap.ui.getCore().getConfiguration().getRTL();

		// write the HTML into the render manager
		oRm.write("<div"); // Number begins
		oRm.writeControlData(oON);
		
		// write the tooltip
		sTooltip = oON.getTooltip_AsString();
		if (sTooltip) {
			oRm.writeAttributeEscaped("title", sTooltip);
		}
		
		oRm.addClass("sapMObjectNumber");
		if (oON.getEmphasized()) {
			oRm.addClass("sapMObjectNumberEmph");
		}
		oRm.addClass(oON._sCSSPrefixObjNumberStatus + oON.getState());

		sTextDir && oRm.writeAttribute("dir", sTextDir.toLowerCase());
		if (sTextAlign) {
			sTextAlign = Renderer.getTextAlign(sTextAlign, sTextDir);
			if (sTextAlign) {
				oRm.addStyle("text-align", sTextAlign);
			}
		}

		oRm.writeClasses();
		oRm.writeStyles();
		oRm.write(">");
	
		oRm.write("<span"); // Number text begins
		oRm.addClass("sapMObjectNumberText");
		oRm.writeClasses();
		oRm.write(">");
		oRm.writeEscaped(oON.getNumber());
		oRm.write("</span>"); // Number text ends
	
		oRm.write("<span"); // Number unit begins
		oRm.addClass("sapMObjectNumberUnit");

		//this handles the case where we want the opposite text direction, not that set on the page
		//in this case we want the padding of the object number unit element to be applied on the other side
		if ((sTextDir === sap.ui.core.TextDirection.LTR && bPageRTL) ||
			(sTextDir === sap.ui.core.TextDirection.RTL && !bPageRTL)) {
			oRm.addClass("sapMRTLOpposite");
		}

		oRm.writeClasses();
		oRm.write(">");
		
		var unit = oON.getUnit();
		if (!unit) {
			unit = oON.getNumberUnit();
		}
		oRm.writeEscaped(unit);
		oRm.write("</span>"); // Number unit ends
	
		oRm.write("</div>"); // Number ends
	};
	

	return ObjectNumberRenderer;

}, /* bExport= */ true);
