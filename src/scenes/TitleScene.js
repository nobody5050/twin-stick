import Phaser from 'phaser';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';
import discord from '../assets/socialMediaIcons/discordJoinLogo.svg';
import patreon from '../assets/socialMediaIcons/patreonJoinLogo.svg';
//remove for now
//import client from '../index.js'
import {client, clientJoin , room } from "../components/client.js";

//import Colyseus from "colyseus.js";
//let colyseusClient = new Colyseus.Client("ws://134.209.68.198:2567");

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		// this.load.image('background', 'images/background.jpg');
		this.load.svg('discordJoinImage', discord, { scale: 0.1 })
		this.load.svg('patreonJoinImage', patreon, { scale: 0.5 })

	}

	create() {
		// var bg = this.add.sprite(0,0,'background');
		// bg.setOrigin(0,0);
		var lobbyJoin;
		lobbyJoin = clientJoin(lobbyJoin, this, "onStart", "lobby", window.innerWidth*0.95, window.innerHeight*0.05)


		var serverJoin;

		var text = this.add.text(100,100, 'enter test lobby');
		text.setInteractive({ useHandCursor: true });
		serverJoin = clientJoin(serverJoin, this, text, "battle")
		text.on('pointerdown', () => {
			this.scene.switch('gameScene')
		});
		var simulateGameEnd = this.add.text(100, 150, 'simulate game end')
		simulateGameEnd.on('pointerdown', () => {
			this.scene.switch('gameOverScene')
		})

		// var connect = this.add.text(200,200, 'conncect');
		// connect.setInteractive({useHandCursor: true});
		// serverJoin = clientJoin(serverJoin, this, connect, "battle")
//
		// this.textures.addImage("discordJoinImage", 'src/assets/socialMediaIcons/discordJoinLogo.png')

		/*
		Window needs to be greater than:
			currently 700px tall
			and 1000 px wide, might change in the future
		 */
		let valid = true;
		if (window.innerHeight < 700) {
			console.log("page not tall enough")
			valid = false
		}
		if (window.innerWidth < 700) {
			console.log("page not wide enough")
			valid = false
		}
		if (valid) {
			var discordIcon = this.add.image(30, window.innerHeight - 30, 'discordJoinImage')//.setDisplaySize(20, 30)
			discordIcon.setInteractive({useHandCursor:true})
			discordIcon.on('pointerdown', () => {
				//send them to the discord invite link
			})
			var patreonIcon = this.add.image(50, window.innerHeight - 30, 'patreonJoinImage')//.setDisplaySize(20, 30)
			patreonIcon.setInteractive({useHandCursor:true})
			patreonIcon.on('pointerdown', () => {
				//send them to the patreon page
			})


			var dokmiBoxOutline = this.add.rectangle(window.innerWidth * 0.50, 300, 650, 200, 0xFFFFFF)
			var dokmiBoxFill = this.add.rectangle(window.innerWidth * 0.50, 295, 650, 190, 0x56ac68)
		} else {
			var invalid = this.add.text(window.innerWidth*0.1, window.innerHeight*0.5, "screen size not valid")
		}
	}
}

export default TitleScene;
