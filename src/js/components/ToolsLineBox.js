const Box = require('./Box');
const template = require('../../templates/ToolsLine.hbs');
const jsflUtil = require('../../jsfl/util');

class ToolsLineBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		CLICK: 'tools_click',
	};

	constructor(previewPanel) {
	super({}, template);

	this.previewPanel = previewPanel;
	this.container.classList.add('tools-line-container');
	window.jsfl = jsflUtil;
		requestAnimationFrame(()=>{
			this.render();
			this._attachAddButton();
			this._attachStopButton();
			this._attachStartButton();
			this._attachDestroyButton();
		});
	}

	_attachAddButton(){
		this.container.querySelector('.button.add').addEventListener('click', ()=>{

			window.__adobe_cep__.evalScript(jsflUtil.createEmitter(1, 2, this._prepareString(this.previewPanel.emitterState.actionScriptState)), (a)=>{
				console.log(a);
			});

		});
	}

	_attachStopButton() {

		this.container.querySelector('.button.stop').addEventListener('click', ()=>{

			window.__adobe_cep__.evalScript(
				jsflUtil.insertScript(this._prepareString(this.previewPanel.emitterState.emitterTemplate.emitterStop)), (a)=>{
					console.log(a);
				});
		});
	}

	_attachStartButton() {

		this.container.querySelector('.button.start').addEventListener('click', ()=>{

			window.__adobe_cep__.evalScript(
				jsflUtil.insertScript(this._prepareString(this.previewPanel.emitterState.emitterTemplate.emitterStart)), (a)=>{
					console.log(a);
				});
		});
	}

	_attachDestroyButton() {

		this.container.querySelector('.button.destroy').addEventListener('click', ()=>{

			window.__adobe_cep__.evalScript(
				jsflUtil.insertScript(this._prepareString(this.previewPanel.emitterState.emitterTemplate.emitterDestroy)), (a)=>{
					console.log(a);
				});
		});
	}

	_prepareString(str){
		return `"${str.split('\r\n').join('\\r\\n')}"`;
	}
}

module.exports = ToolsLineBox;
