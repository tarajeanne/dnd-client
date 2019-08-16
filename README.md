DND Character Creator

Live app: https://dnd-creator.tjeannepatel.now.sh/

##API

Data endpoints:
The data endpoints of the DnD API provide a detailed databse of available options in Dungeons and Dragons. They contain most of the significant data found in the core rulebook, but are formatted in objects and arrays that can be navigated effectively by an application. I rewrote descriptions to be shorter and more applicable to small spaces.

GET /api/race provides an array of races and their relevant data. Currently limited to human, elf, dwarf, and dragonborn.

GET /api/class provides an array of classes and their relevant data. Currently limited to bard, barbarian. and cleric.

GET /api/backgrounds provides an array of backgrounds and their relevant data. Currently limited to acolye and charlatan.

GET /api/weapon and GET /api/armor provides an array of all the weapons and armor and their relevant data.

##Summary

The DnD Creator app is designed to help newcomers to Dungeons and Dragons navigate the complicated and laborious character creation process. 

Users can create and save as many characters as they like. 

![image](https://user-images.githubusercontent.com/49135525/63191629-973e9380-c02e-11e9-8e53-9f94b6fbcc83.png)

The app walks them through the creation process step-by-step, and calculates their stats based on their selections.

![image](https://user-images.githubusercontent.com/49135525/63191692-c228e780-c02e-11e9-811b-76d340be9ea1.png)

The ability selection screen allows users to select specific abilities for their characters, and see their statistics update live as they do. Additionally, this screen provides the user with insight as to where some of their options came from.

![image](https://user-images.githubusercontent.com/49135525/63191710-d53bb780-c02e-11e9-959a-0a9af3b207c2.png)


The character sheet screen auto-populates a Dungeons and Dragons character sheet for the user, which they can then print out to use during gameplay.
