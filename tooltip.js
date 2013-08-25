//start of tooltip plugin
		(function(){
			var modelObj = {};
			var tooltpNode, tooltpContentNode, tooltpArrowNode;
			var key = 0;
			var styleNode = document.createElement("STYLE");
		    styleNode.innerHTML = ".tool-tip-box{"+
			    "	position:absolute;"+
				"	background: black;"+
				"	color:white;"+
			    "	box-shadow:0 0 1px 1px gray;"+
			    "	}"+
			    "	.tool-tip-top-arrow-up," +
				"	.tool-tip-top-arrow-down," +
				"	.tool-tip-top-arrow-right," +
				"	.tool-tip-top-arrow-left {" +
				"		position: absolute;" +
				"		margin-top: -12px;" +
				"		border-color: black;" +
				"	}" +
				"	.tool-tip-top-arrow-up {" +
				"		width: 0; " +
				"		height: 0; " +
				"		border-left: 7px solid transparent;" +
				"		border-right: 7px solid transparent;" +
				"		" +
				"		border-bottom: 7px solid black;" +
				"	}" +
				"	.tool-tip-box {" +
				"    	padding: 5px;" +
				"    	border-radius: 2px 2px 2px 2px;" +
				"    	opacity: 0.8;" +
				"	}" +
				"	.tool-tip-box.hidden {" +
				"		-webkit-transition: opacity 0.5s ease-out;" +
				"    	opacity: 0;" +
				"	}";
			document.head.appendChild(styleNode);


			document.addEventListener("DOMContentLoaded", function() {
		    	
		    	Array.prototype.forEach.call(document.querySelectorAll("DIV[hint]"), function (node) {
		    		node.toolTip(node.getAttribute("hint"));
		    	});

		    	document.body.addEventListener("mouseover",function(ev){
		    		var timeout = setTimeout(function () {
		    			var key = ev.target.dataset.tooltip;
						if(!key) return;
						var pos = getPosition(ev.target);
						createToolTip(pos, key);
			    		}, 500);
		    		ev.target.addEventListener("mouseout", mouseout);
		    		function mouseout() {
		    			this.removeEventListener("mouseout",mouseout);
		    			clearTimeout(timeout);
		    			tooltpNode && tooltpNode.classList.add("hidden");

		    		}

					
				},false);

		  	}, false);



			function add(text) {
				modelObj["tooltip_"+key] = text;
				this.setAttribute("data-tooltip","tooltip_"+key++);
			}
			HTMLDivElement.prototype.toolTip = add;
			
			function getPosition(node) {
				var x = 0, y = 0, w = node.offsetWidth, h = node.offsetHeight; 
				while(node != document.body) {
					if(getComputedStyle(node,null).getPropertyValue("position") === "static") {
						x += node.offsetLeft;
						y += node.offsetTop;
					}
					node = node.parentNode;
				}
				return [x, y+7, w, h];
			}

			function createToolTip (pos, key) {
				tooltpNode = document.createElement("DIV");
				tooltpNode.classList.add("hidden");
				tooltpNode.classList.add("tool-tip-box");
				tooltpNode.innerHTML = "<div class='tool-tip-top-arrow-up'></div><div class='tool-tip-content'></div>";
				tooltpArrowNode = tooltpNode.querySelector(".tool-tip-top-arrow-up");
				tooltpContentNode = tooltpNode.querySelector(".tool-tip-content");
				document.body.appendChild(tooltpNode);
				var timeOut;
				createToolTip = function (pos, key) {
					clearTimeout(timeOut);
					tooltpNode.style.left = pos[0] + "px";
					tooltpNode.style.top = pos[1] + pos[2]+ "px";
					tooltpContentNode.textContent = modelObj[key];
					tooltpNode.classList.remove("hidden");
					timeOut = setTimeout(function(){
						tooltpNode.classList.add("hidden");
					}, 2000);
				}
				createToolTip(pos, key);
			}
		})()
		// End of tooltip plugin
